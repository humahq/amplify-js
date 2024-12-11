import { Observable, map, filter } from 'rxjs';
import { ConnectionState } from '../types/PubSub.mjs';
import { ReachabilityMonitor } from './ReachabilityMonitor/index.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const CONNECTION_CHANGE = {
    KEEP_ALIVE_MISSED: { keepAliveState: 'unhealthy' },
    KEEP_ALIVE: { keepAliveState: 'healthy' },
    CONNECTION_ESTABLISHED: { connectionState: 'connected' },
    CONNECTION_FAILED: {
        intendedConnectionState: 'disconnected',
        connectionState: 'disconnected',
    },
    CLOSING_CONNECTION: { intendedConnectionState: 'disconnected' },
    OPENING_CONNECTION: {
        intendedConnectionState: 'connected',
        connectionState: 'connecting',
    },
    CLOSED: { connectionState: 'disconnected' },
    ONLINE: { networkState: 'connected' },
    OFFLINE: { networkState: 'disconnected' },
};
class ConnectionStateMonitor {
    constructor() {
        this._networkMonitoringSubscription = undefined;
        this._linkedConnectionState = {
            networkState: 'connected',
            connectionState: 'disconnected',
            intendedConnectionState: 'disconnected',
            keepAliveState: 'healthy',
        };
        // Attempt to update the state with the current actual network state
        this._initialNetworkStateSubscription = ReachabilityMonitor().subscribe(({ online }) => {
            this.record(online ? CONNECTION_CHANGE.ONLINE : CONNECTION_CHANGE.OFFLINE);
            this._initialNetworkStateSubscription?.unsubscribe();
        });
        this._linkedConnectionStateObservable =
            new Observable(connectionStateObserver => {
                connectionStateObserver.next(this._linkedConnectionState);
                this._linkedConnectionStateObserver = connectionStateObserver;
            });
    }
    /**
     * Turn network state monitoring on if it isn't on already
     */
    enableNetworkMonitoring() {
        // If no initial network state was discovered, stop trying
        this._initialNetworkStateSubscription?.unsubscribe();
        // Maintain the network state based on the reachability monitor
        if (this._networkMonitoringSubscription === undefined) {
            this._networkMonitoringSubscription = ReachabilityMonitor().subscribe(({ online }) => {
                this.record(online ? CONNECTION_CHANGE.ONLINE : CONNECTION_CHANGE.OFFLINE);
            });
        }
    }
    /**
     * Turn network state monitoring off if it isn't off already
     */
    disableNetworkMonitoring() {
        this._networkMonitoringSubscription?.unsubscribe();
        this._networkMonitoringSubscription = undefined;
    }
    /**
     * Get the observable that allows us to monitor the connection state
     *
     * @returns {Observable<ConnectionState>} - The observable that emits ConnectionState updates
     */
    get connectionStateObservable() {
        let previous;
        // The linked state aggregates state changes to any of the network, connection,
        // intendedConnection and keepAliveHealth. Some states will change these independent
        // states without changing the overall connection state.
        // After translating from linked states to ConnectionState, then remove any duplicates
        return this._linkedConnectionStateObservable
            .pipe(map(value => {
            return this.connectionStatesTranslator(value);
        }))
            .pipe(filter(current => {
            const toInclude = current !== previous;
            previous = current;
            return toInclude;
        }));
    }
    /*
     * Updates local connection state and emits the full state to the observer.
     */
    record(statusUpdates) {
        // Maintain the network monitor
        if (statusUpdates.intendedConnectionState === 'connected') {
            this.enableNetworkMonitoring();
        }
        else if (statusUpdates.intendedConnectionState === 'disconnected') {
            this.disableNetworkMonitoring();
        }
        // Maintain the socket state
        const newSocketStatus = {
            ...this._linkedConnectionState,
            ...statusUpdates,
        };
        this._linkedConnectionState = { ...newSocketStatus };
        this._linkedConnectionStateObserver?.next(this._linkedConnectionState);
    }
    /*
     * Translate the ConnectionState structure into a specific ConnectionState string literal union
     */
    connectionStatesTranslator({ connectionState, networkState, intendedConnectionState, keepAliveState, }) {
        if (connectionState === 'connected' && networkState === 'disconnected')
            return ConnectionState.ConnectedPendingNetwork;
        if (connectionState === 'connected' &&
            intendedConnectionState === 'disconnected')
            return ConnectionState.ConnectedPendingDisconnect;
        if (connectionState === 'disconnected' &&
            intendedConnectionState === 'connected' &&
            networkState === 'disconnected')
            return ConnectionState.ConnectionDisruptedPendingNetwork;
        if (connectionState === 'disconnected' &&
            intendedConnectionState === 'connected')
            return ConnectionState.ConnectionDisrupted;
        if (connectionState === 'connected' && keepAliveState === 'unhealthy')
            return ConnectionState.ConnectedPendingKeepAlive;
        // All remaining states directly correspond to the connection state
        if (connectionState === 'connecting')
            return ConnectionState.Connecting;
        if (connectionState === 'disconnected')
            return ConnectionState.Disconnected;
        return ConnectionState.Connected;
    }
}

export { CONNECTION_CHANGE, ConnectionStateMonitor };
//# sourceMappingURL=ConnectionStateMonitor.mjs.map