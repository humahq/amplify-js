'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
exports.AWSWebSocketProvider = void 0;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const rxjs_1 = require("rxjs");
const graphql_1 = require("graphql");
const core_1 = require("@aws-amplify/core");
const utils_1 = require("@aws-amplify/core/internals/utils");
const PubSub_1 = require("../../types/PubSub");
const constants_1 = require("../constants");
const ConnectionStateMonitor_1 = require("../../utils/ConnectionStateMonitor");
const ReconnectionMonitor_1 = require("../../utils/ReconnectionMonitor");
const appsyncUrl_1 = require("./appsyncUrl");
const authHeaders_1 = require("./authHeaders");
const dispatchApiEvent = (payload) => {
    core_1.Hub.dispatch('api', payload, 'PubSub', constants_1.AMPLIFY_SYMBOL);
};
class AWSWebSocketProvider {
    constructor(args) {
        this.subscriptionObserverMap = new Map();
        this.socketStatus = constants_1.SOCKET_STATUS.CLOSED;
        this.keepAliveTimeout = constants_1.DEFAULT_KEEP_ALIVE_TIMEOUT;
        this.promiseArray = [];
        this.connectionStateMonitor = new ConnectionStateMonitor_1.ConnectionStateMonitor();
        this.reconnectionMonitor = new ReconnectionMonitor_1.ReconnectionMonitor();
        /**
         * Open WebSocket connection & perform handshake
         * Ref: https://docs.aws.amazon.com/appsync/latest/devguide/real-time-websocket-client.html#appsynclong-real-time-websocket-client-implementation-guide-for-graphql-subscriptions
         *
         * @param subprotocol -
         */
        this._establishConnection = async (awsRealTimeUrl, subprotocol) => {
            this.logger.debug(`Establishing WebSocket connection to ${awsRealTimeUrl}`);
            try {
                await this._openConnection(awsRealTimeUrl, subprotocol);
                await this._initiateHandshake();
            }
            catch (err) {
                const { errorType, errorCode } = err;
                if (constants_1.NON_RETRYABLE_CODES.includes(errorCode) ||
                    // Event API does not currently return `errorCode`. This may change in the future.
                    // For now fall back to also checking known non-retryable error types
                    constants_1.NON_RETRYABLE_ERROR_TYPES.includes(errorType)) {
                    throw new utils_1.NonRetryableError(errorType);
                }
                else if (errorType) {
                    throw new Error(errorType);
                }
                else {
                    throw err;
                }
            }
        };
        this.logger = new core_1.ConsoleLogger(args.providerName);
        this.wsProtocolName = args.wsProtocolName;
        this.wsConnectUri = args.connectUri;
        this.connectionStateMonitorSubscription =
            this._startConnectionStateMonitoring();
    }
    /**
     * Mark the socket closed and release all active listeners
     */
    close() {
        // Mark the socket closed both in status and the connection monitor
        this.socketStatus = constants_1.SOCKET_STATUS.CLOSED;
        this.connectionStateMonitor.record(ConnectionStateMonitor_1.CONNECTION_CHANGE.CONNECTION_FAILED);
        // Turn off the subscription monitor Hub publishing
        this.connectionStateMonitorSubscription.unsubscribe();
        // Complete all reconnect observers
        this.reconnectionMonitor.close();
        return new Promise((resolve, reject) => {
            if (this.awsRealTimeSocket) {
                this.awsRealTimeSocket.onclose = (_) => {
                    this.subscriptionObserverMap = new Map();
                    this.awsRealTimeSocket = undefined;
                    resolve();
                };
                this.awsRealTimeSocket.onerror = (err) => {
                    reject(err);
                };
                this.awsRealTimeSocket.close();
            }
            else {
                resolve();
            }
        });
    }
    subscribe(options, customUserAgentDetails) {
        return new rxjs_1.Observable(observer => {
            if (!options?.appSyncGraphqlEndpoint) {
                // 	observer.error({
                // 		errors: [
                // 			{
                // 				...new GraphQLError(
                // 					`Subscribe only available for AWS AppSync endpoint`,
                // 				),
                // 			},
                // 		],
                // 	});
                // 	observer.complete();
                return;
            }
            let subscriptionStartInProgress = false;
            const subscriptionId = (0, utils_1.amplifyUuid)();
            const startSubscription = () => {
                if (!subscriptionStartInProgress) {
                    subscriptionStartInProgress = true;
                    this._startSubscriptionWithAWSAppSyncRealTime({
                        options,
                        observer,
                        subscriptionId,
                        customUserAgentDetails,
                    })
                        .catch(err => {
                        this.logger.debug(`${PubSub_1.CONTROL_MSG.REALTIME_SUBSCRIPTION_INIT_ERROR}: ${err}`);
                        this.connectionStateMonitor.record(ConnectionStateMonitor_1.CONNECTION_CHANGE.CLOSED);
                    })
                        .finally(() => {
                        subscriptionStartInProgress = false;
                    });
                }
            };
            // Add an observable to the reconnection list to manage reconnection for this subscription
            const reconnectSubscription = new rxjs_1.Observable(reconnectSubscriptionObserver => {
                this.reconnectionMonitor.addObserver(reconnectSubscriptionObserver);
            }).subscribe(() => {
                startSubscription();
            });
            startSubscription();
            return async () => {
                await this._cleanupSubscription(subscriptionId, reconnectSubscription);
            };
        });
    }
    async connect(options) {
        if (this.socketStatus === constants_1.SOCKET_STATUS.READY) {
            return;
        }
        await this._connectWebSocket(options);
    }
    async publish(options, customUserAgentDetails) {
        if (this.socketStatus !== constants_1.SOCKET_STATUS.READY) {
            throw new Error('Subscription has not been initialized');
        }
        return this._publishMessage(options, customUserAgentDetails);
    }
    async _connectWebSocket(options) {
        const { apiKey, appSyncGraphqlEndpoint, authenticationType, region } = options;
        const { additionalCustomHeaders } = await (0, appsyncUrl_1.additionalHeadersFromOptions)(options);
        this.connectionStateMonitor.record(ConnectionStateMonitor_1.CONNECTION_CHANGE.OPENING_CONNECTION);
        await this._initializeWebSocketConnection({
            apiKey,
            appSyncGraphqlEndpoint,
            authenticationType,
            region,
            additionalCustomHeaders,
        });
    }
    async _publishMessage(options, customUserAgentDetails) {
        const subscriptionId = (0, utils_1.amplifyUuid)();
        const { additionalCustomHeaders, libraryConfigHeaders } = await (0, appsyncUrl_1.additionalHeadersFromOptions)(options);
        const serializedSubscriptionMessage = await this._prepareSubscriptionPayload({
            options,
            subscriptionId,
            customUserAgentDetails,
            additionalCustomHeaders,
            libraryConfigHeaders,
            publish: true,
        });
        return new Promise((resolve, reject) => {
            if (this.awsRealTimeSocket) {
                const publishListener = (event) => {
                    const data = JSON.parse(event.data);
                    if (data.id === subscriptionId && data.type === 'publish_success') {
                        this.awsRealTimeSocket &&
                            this.awsRealTimeSocket.removeEventListener('message', publishListener);
                        resolve();
                    }
                    if (data.erroredEvents && data.erroredEvents.length > 0) ;
                };
                this.awsRealTimeSocket.addEventListener('message', publishListener);
                this.awsRealTimeSocket.addEventListener('close', () => {
                    reject(new Error('WebSocket is closed'));
                });
                //
                // this.awsRealTimeSocket.addEventListener('error', publishListener);
                this.awsRealTimeSocket.send(serializedSubscriptionMessage);
            }
        });
    }
    async _cleanupSubscription(subscriptionId, reconnectSubscription) {
        // Cleanup reconnection subscription
        reconnectSubscription?.unsubscribe();
        // Cleanup after unsubscribing or observer.complete was called after _startSubscriptionWithAWSAppSyncRealTime
        try {
            // Waiting that subscription has been connected before trying to unsubscribe
            await this._waitForSubscriptionToBeConnected(subscriptionId);
            const { subscriptionState } = this.subscriptionObserverMap.get(subscriptionId) || {};
            if (!subscriptionState) {
                // subscription already unsubscribed
                return;
            }
            if (subscriptionState === constants_1.SUBSCRIPTION_STATUS.CONNECTED) {
                this._sendUnsubscriptionMessage(subscriptionId);
            }
            else {
                throw new Error('Subscription never connected');
            }
        }
        catch (err) {
            this.logger.debug(`Error while unsubscribing ${err}`);
        }
        finally {
            this._removeSubscriptionObserver(subscriptionId);
        }
    }
    // Monitor the connection state and pass changes along to Hub
    _startConnectionStateMonitoring() {
        return this.connectionStateMonitor.connectionStateObservable.subscribe(connectionState => {
            dispatchApiEvent({
                event: constants_1.CONNECTION_STATE_CHANGE,
                data: {
                    provider: this,
                    connectionState,
                },
                message: `Connection state is ${connectionState}`,
            });
            this.connectionState = connectionState;
            // Trigger START_RECONNECT when the connection is disrupted
            if (connectionState === PubSub_1.ConnectionState.ConnectionDisrupted) {
                this.reconnectionMonitor.record(ReconnectionMonitor_1.ReconnectEvent.START_RECONNECT);
            }
            // Trigger HALT_RECONNECT to halt reconnection attempts when the state is anything other than
            // ConnectionDisrupted or Connecting
            if ([
                PubSub_1.ConnectionState.Connected,
                PubSub_1.ConnectionState.ConnectedPendingDisconnect,
                PubSub_1.ConnectionState.ConnectedPendingKeepAlive,
                PubSub_1.ConnectionState.ConnectedPendingNetwork,
                PubSub_1.ConnectionState.ConnectionDisruptedPendingNetwork,
                PubSub_1.ConnectionState.Disconnected,
            ].includes(connectionState)) {
                this.reconnectionMonitor.record(ReconnectionMonitor_1.ReconnectEvent.HALT_RECONNECT);
            }
        });
    }
    async _startSubscriptionWithAWSAppSyncRealTime({ options, observer, subscriptionId, customUserAgentDetails, }) {
        const { query, variables } = options;
        const { additionalCustomHeaders, libraryConfigHeaders } = await (0, appsyncUrl_1.additionalHeadersFromOptions)(options);
        this.subscriptionObserverMap.set(subscriptionId, {
            observer,
            query: query ?? '',
            variables: variables ?? {},
            subscriptionState: constants_1.SUBSCRIPTION_STATUS.PENDING,
            startAckTimeoutId: undefined,
        });
        const serializedSubscriptionMessage = await this._prepareSubscriptionPayload({
            options,
            subscriptionId,
            customUserAgentDetails,
            additionalCustomHeaders,
            libraryConfigHeaders,
        });
        try {
            await this._connectWebSocket(options);
        }
        catch (err) {
            this._logStartSubscriptionError(subscriptionId, observer, err);
            return;
        }
        // Potential race condition can occur when unsubscribe is called during _initializeWebSocketConnection.
        // E.g.unsubscribe gets invoked prior to finishing WebSocket handshake or START_ACK.
        // Both subscriptionFailedCallback and subscriptionReadyCallback are used to synchronized this.
        const { subscriptionFailedCallback, subscriptionReadyCallback } = this.subscriptionObserverMap.get(subscriptionId) ?? {};
        // This must be done before sending the message in order to be listening immediately
        this.subscriptionObserverMap.set(subscriptionId, {
            observer,
            subscriptionState: constants_1.SUBSCRIPTION_STATUS.PENDING,
            query: query ?? '',
            variables: variables ?? {},
            subscriptionReadyCallback,
            subscriptionFailedCallback,
            startAckTimeoutId: setTimeout(() => {
                this._timeoutStartSubscriptionAck(subscriptionId);
            }, constants_1.START_ACK_TIMEOUT),
        });
        if (this.awsRealTimeSocket) {
            this.awsRealTimeSocket.send(serializedSubscriptionMessage);
        }
    }
    // Log logic for start subscription failures
    _logStartSubscriptionError(subscriptionId, observer, err) {
        this.logger.debug({ err });
        const message = String(err.message ?? '');
        // Resolving to give the state observer time to propogate the update
        this.connectionStateMonitor.record(ConnectionStateMonitor_1.CONNECTION_CHANGE.CLOSED);
        // Capture the error only when the network didn't cause disruption
        if (this.connectionState !== PubSub_1.ConnectionState.ConnectionDisruptedPendingNetwork) {
            // When the error is non-retriable, error out the observable
            if ((0, utils_1.isNonRetryableError)(err)) {
                observer.error({
                    errors: [
                        {
                            ...new graphql_1.GraphQLError(`${PubSub_1.CONTROL_MSG.CONNECTION_FAILED}: ${message}`),
                        },
                    ],
                });
            }
            else {
                this.logger.debug(`${PubSub_1.CONTROL_MSG.CONNECTION_FAILED}: ${message}`);
            }
            const { subscriptionFailedCallback } = this.subscriptionObserverMap.get(subscriptionId) || {};
            // Notify concurrent unsubscription
            if (typeof subscriptionFailedCallback === 'function') {
                subscriptionFailedCallback();
            }
        }
    }
    // Waiting that subscription has been connected before trying to unsubscribe
    async _waitForSubscriptionToBeConnected(subscriptionId) {
        const subscriptionObserver = this.subscriptionObserverMap.get(subscriptionId);
        if (subscriptionObserver) {
            const { subscriptionState } = subscriptionObserver;
            // This in case unsubscribe is invoked before sending start subscription message
            if (subscriptionState === constants_1.SUBSCRIPTION_STATUS.PENDING) {
                return new Promise((resolve, reject) => {
                    const { observer, subscriptionState: observedSubscriptionState, variables, query, } = subscriptionObserver;
                    this.subscriptionObserverMap.set(subscriptionId, {
                        observer,
                        subscriptionState: observedSubscriptionState,
                        variables,
                        query,
                        subscriptionReadyCallback: resolve,
                        subscriptionFailedCallback: reject,
                    });
                });
            }
        }
    }
    _sendUnsubscriptionMessage(subscriptionId) {
        try {
            if (this.awsRealTimeSocket &&
                this.awsRealTimeSocket.readyState === WebSocket.OPEN &&
                this.socketStatus === constants_1.SOCKET_STATUS.READY) {
                // Preparing unsubscribe message to stop receiving messages for that subscription
                const unsubscribeMessage = this._unsubscribeMessage(subscriptionId);
                const stringToAWSRealTime = JSON.stringify(unsubscribeMessage);
                this.awsRealTimeSocket.send(stringToAWSRealTime);
            }
        }
        catch (err) {
            // If GQL_STOP is not sent because of disconnection issue, then there is nothing the client can do
            this.logger.debug({ err });
        }
    }
    _removeSubscriptionObserver(subscriptionId) {
        this.subscriptionObserverMap.delete(subscriptionId);
        // Verifying 1000ms after removing subscription in case there are new subscription unmount/mount
        setTimeout(this._closeSocketIfRequired.bind(this), 1000);
    }
    _closeSocketIfRequired() {
        if (this.subscriptionObserverMap.size > 0) {
            // Active subscriptions on the WebSocket
            return;
        }
        if (!this.awsRealTimeSocket) {
            this.socketStatus = constants_1.SOCKET_STATUS.CLOSED;
            return;
        }
        this.connectionStateMonitor.record(ConnectionStateMonitor_1.CONNECTION_CHANGE.CLOSING_CONNECTION);
        if (this.awsRealTimeSocket.bufferedAmount > 0) {
            // Still data on the WebSocket
            setTimeout(this._closeSocketIfRequired.bind(this), 1000);
        }
        else {
            this.logger.debug('closing WebSocket...');
            if (this.keepAliveTimeoutId) {
                clearTimeout(this.keepAliveTimeoutId);
            }
            if (this.keepAliveAlertTimeoutId) {
                clearTimeout(this.keepAliveAlertTimeoutId);
            }
            const tempSocket = this.awsRealTimeSocket;
            // Cleaning callbacks to avoid race condition, socket still exists
            tempSocket.onclose = null;
            tempSocket.onerror = null;
            tempSocket.close(1000);
            this.awsRealTimeSocket = undefined;
            this.socketStatus = constants_1.SOCKET_STATUS.CLOSED;
            this.connectionStateMonitor.record(ConnectionStateMonitor_1.CONNECTION_CHANGE.CLOSED);
        }
    }
    _handleIncomingSubscriptionMessage(message) {
        if (typeof message.data !== 'string') {
            return;
        }
        const [isData, data] = this._handleSubscriptionData(message);
        if (isData)
            return;
        const { type, id, payload } = data;
        const { observer = null, query = '', variables = {}, startAckTimeoutId, subscriptionReadyCallback, subscriptionFailedCallback, } = this.subscriptionObserverMap.get(id) || {};
        if (type === constants_1.MESSAGE_TYPES.GQL_START_ACK ||
            type === constants_1.MESSAGE_TYPES.EVENT_SUBSCRIBE_ACK) {
            this.logger.debug(`subscription ready for ${JSON.stringify({ query, variables })}`);
            if (typeof subscriptionReadyCallback === 'function') {
                subscriptionReadyCallback();
            }
            if (startAckTimeoutId)
                clearTimeout(startAckTimeoutId);
            dispatchApiEvent({
                event: PubSub_1.CONTROL_MSG.SUBSCRIPTION_ACK,
                data: { query, variables },
                message: 'Connection established for subscription',
            });
            const subscriptionState = constants_1.SUBSCRIPTION_STATUS.CONNECTED;
            if (observer) {
                this.subscriptionObserverMap.set(id, {
                    observer,
                    query,
                    variables,
                    startAckTimeoutId: undefined,
                    subscriptionState,
                    subscriptionReadyCallback,
                    subscriptionFailedCallback,
                });
            }
            this.connectionStateMonitor.record(ConnectionStateMonitor_1.CONNECTION_CHANGE.CONNECTION_ESTABLISHED);
            return;
        }
        if (type === constants_1.MESSAGE_TYPES.GQL_CONNECTION_KEEP_ALIVE) {
            if (this.keepAliveTimeoutId)
                clearTimeout(this.keepAliveTimeoutId);
            if (this.keepAliveAlertTimeoutId)
                clearTimeout(this.keepAliveAlertTimeoutId);
            this.keepAliveTimeoutId = setTimeout(() => {
                this._errorDisconnect(PubSub_1.CONTROL_MSG.TIMEOUT_DISCONNECT);
            }, this.keepAliveTimeout);
            this.keepAliveAlertTimeoutId = setTimeout(() => {
                this.connectionStateMonitor.record(ConnectionStateMonitor_1.CONNECTION_CHANGE.KEEP_ALIVE_MISSED);
            }, constants_1.DEFAULT_KEEP_ALIVE_ALERT_TIMEOUT);
            this.connectionStateMonitor.record(ConnectionStateMonitor_1.CONNECTION_CHANGE.KEEP_ALIVE);
            return;
        }
        if (type === constants_1.MESSAGE_TYPES.GQL_ERROR) {
            const subscriptionState = constants_1.SUBSCRIPTION_STATUS.FAILED;
            if (observer) {
                this.subscriptionObserverMap.set(id, {
                    observer,
                    query,
                    variables,
                    startAckTimeoutId,
                    subscriptionReadyCallback,
                    subscriptionFailedCallback,
                    subscriptionState,
                });
                this.logger.debug(`${PubSub_1.CONTROL_MSG.CONNECTION_FAILED}: ${JSON.stringify(payload ?? data)}`);
                observer.error({
                    errors: [
                        {
                            ...new graphql_1.GraphQLError(`${PubSub_1.CONTROL_MSG.CONNECTION_FAILED}: ${JSON.stringify(payload ?? data)}`),
                        },
                    ],
                });
                if (startAckTimeoutId)
                    clearTimeout(startAckTimeoutId);
                if (typeof subscriptionFailedCallback === 'function') {
                    subscriptionFailedCallback();
                }
            }
        }
    }
    _errorDisconnect(msg) {
        this.logger.debug(`Disconnect error: ${msg}`);
        if (this.awsRealTimeSocket) {
            this.connectionStateMonitor.record(ConnectionStateMonitor_1.CONNECTION_CHANGE.CLOSED);
            this.awsRealTimeSocket.close();
        }
        this.socketStatus = constants_1.SOCKET_STATUS.CLOSED;
    }
    _timeoutStartSubscriptionAck(subscriptionId) {
        const subscriptionObserver = this.subscriptionObserverMap.get(subscriptionId);
        if (subscriptionObserver) {
            const { observer, query, variables } = subscriptionObserver;
            if (!observer) {
                return;
            }
            this.subscriptionObserverMap.set(subscriptionId, {
                observer,
                query,
                variables,
                subscriptionState: constants_1.SUBSCRIPTION_STATUS.FAILED,
            });
            this.connectionStateMonitor.record(ConnectionStateMonitor_1.CONNECTION_CHANGE.CLOSED);
            this.logger.debug('timeoutStartSubscription', JSON.stringify({ query, variables }));
        }
    }
    _initializeWebSocketConnection({ appSyncGraphqlEndpoint, authenticationType, apiKey, region, additionalCustomHeaders, }) {
        if (this.socketStatus === constants_1.SOCKET_STATUS.READY) {
            return;
        }
        // TODO(Eslint): refactor to now use async function as the promise executor
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
            this.promiseArray.push({ res: resolve, rej: reject });
            if (this.socketStatus === constants_1.SOCKET_STATUS.CLOSED) {
                try {
                    this.socketStatus = constants_1.SOCKET_STATUS.CONNECTING;
                    // Empty payload on connect
                    const payloadString = '{}';
                    const authHeader = await (0, authHeaders_1.awsRealTimeHeaderBasedAuth)({
                        authenticationType,
                        payload: payloadString,
                        canonicalUri: this.wsConnectUri,
                        apiKey,
                        appSyncGraphqlEndpoint,
                        region,
                        additionalCustomHeaders,
                    });
                    const headerString = authHeader ? JSON.stringify(authHeader) : '';
                    // base64url-encoded string
                    const encodedHeader = utils_1.base64Encoder.convert(headerString, {
                        urlSafe: true,
                        skipPadding: true,
                    });
                    const authTokenSubprotocol = `header-${encodedHeader}`;
                    const queryParams = (0, appsyncUrl_1.queryParamsFromCustomHeaders)(additionalCustomHeaders);
                    const awsRealTimeUrl = (0, appsyncUrl_1.realtimeUrlWithQueryString)(appSyncGraphqlEndpoint, queryParams);
                    await this._establishRetryableConnection(awsRealTimeUrl, authTokenSubprotocol);
                    this.promiseArray.forEach(({ res }) => {
                        this.logger.debug('Notifying connection successful');
                        res();
                    });
                    this.socketStatus = constants_1.SOCKET_STATUS.READY;
                    this.promiseArray = [];
                }
                catch (err) {
                    this.logger.debug('Connection exited with', err);
                    this.promiseArray.forEach(({ rej }) => {
                        rej(err);
                    });
                    this.promiseArray = [];
                    if (this.awsRealTimeSocket &&
                        this.awsRealTimeSocket.readyState === WebSocket.OPEN) {
                        this.awsRealTimeSocket.close(3001);
                    }
                    this.awsRealTimeSocket = undefined;
                    this.socketStatus = constants_1.SOCKET_STATUS.CLOSED;
                }
            }
        });
    }
    async _establishRetryableConnection(awsRealTimeUrl, subprotocol) {
        this.logger.debug(`Establishing retryable connection`);
        await (0, utils_1.jitteredExponentialRetry)(this._establishConnection.bind(this), [awsRealTimeUrl, subprotocol], constants_1.MAX_DELAY_MS);
    }
    async _openConnection(awsRealTimeUrl, subprotocol) {
        return new Promise((resolve, reject) => {
            const newSocket = this._getNewWebSocket(awsRealTimeUrl, [
                this.wsProtocolName,
                subprotocol,
            ]);
            newSocket.onerror = () => {
                this.logger.debug(`WebSocket connection error`);
            };
            newSocket.onclose = () => {
                reject(new Error('Connection handshake error'));
            };
            newSocket.onopen = () => {
                this.awsRealTimeSocket = newSocket;
                resolve();
            };
        });
    }
    _getNewWebSocket(url, protocol) {
        return new WebSocket(url, protocol);
    }
    async _initiateHandshake() {
        return new Promise((resolve, reject) => {
            if (!this.awsRealTimeSocket) {
                reject(new Error('awsRealTimeSocket undefined'));
                return;
            }
            let ackOk = false;
            this.awsRealTimeSocket.onerror = error => {
                this.logger.debug(`WebSocket error ${JSON.stringify(error)}`);
            };
            this.awsRealTimeSocket.onclose = event => {
                this.logger.debug(`WebSocket closed ${event.reason}`);
                reject(new Error(JSON.stringify(event)));
            };
            this.awsRealTimeSocket.onmessage = (message) => {
                if (typeof message.data !== 'string') {
                    return;
                }
                this.logger.debug(`subscription message from AWS AppSyncRealTime: ${message.data} `);
                const data = JSON.parse(message.data);
                const { type } = data;
                const connectionTimeoutMs = this._extractConnectionTimeout(data);
                if (type === constants_1.MESSAGE_TYPES.GQL_CONNECTION_ACK) {
                    ackOk = true;
                    this._registerWebsocketHandlers(connectionTimeoutMs);
                    resolve('Connected to AWS AppSyncRealTime');
                    return;
                }
                if (type === constants_1.MESSAGE_TYPES.GQL_CONNECTION_ERROR) {
                    const { errorType, errorCode } = this._extractErrorCodeAndType(data);
                    // TODO(Eslint): refactor to reject an Error object instead of a plain object
                    // eslint-disable-next-line prefer-promise-reject-errors
                    reject({ errorType, errorCode });
                }
            };
            const gqlInit = {
                type: constants_1.MESSAGE_TYPES.GQL_CONNECTION_INIT,
            };
            this.awsRealTimeSocket.send(JSON.stringify(gqlInit));
            const checkAckOk = (targetAckOk) => {
                if (!targetAckOk) {
                    this.connectionStateMonitor.record(ConnectionStateMonitor_1.CONNECTION_CHANGE.CONNECTION_FAILED);
                    reject(new Error(`Connection timeout: ack from AWSAppSyncRealTime was not received after ${constants_1.CONNECTION_INIT_TIMEOUT} ms`));
                }
            };
            setTimeout(() => {
                checkAckOk(ackOk);
            }, constants_1.CONNECTION_INIT_TIMEOUT);
        });
    }
    _registerWebsocketHandlers(connectionTimeoutMs) {
        if (!this.awsRealTimeSocket) {
            return;
        }
        this.keepAliveTimeout = connectionTimeoutMs;
        this.awsRealTimeSocket.onmessage =
            this._handleIncomingSubscriptionMessage.bind(this);
        this.awsRealTimeSocket.onerror = err => {
            this.logger.debug(err);
            this._errorDisconnect(PubSub_1.CONTROL_MSG.CONNECTION_CLOSED);
        };
        this.awsRealTimeSocket.onclose = event => {
            this.logger.debug(`WebSocket closed ${event.reason}`);
            this._errorDisconnect(PubSub_1.CONTROL_MSG.CONNECTION_CLOSED);
        };
    }
}
exports.AWSWebSocketProvider = AWSWebSocketProvider;
//# sourceMappingURL=index.js.map
