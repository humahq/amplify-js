'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
exports.lexProvider = void 0;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const client_lex_runtime_v2_1 = require("@aws-sdk/client-lex-runtime-v2");
const utils_1 = require("@aws-amplify/core/internals/utils");
const core_1 = require("@aws-amplify/core");
const uuid_1 = require("uuid");
const utils_2 = require("../utils");
const logger = new core_1.ConsoleLogger('AWSLexV2Provider');
class AWSLexV2Provider {
    constructor() {
        this._botsCompleteCallback = {};
        this.defaultSessionId = (0, uuid_1.v4)();
    }
    /**
     * Send a message to a bot
     * @async
     * @param {AWSLexV2ProviderOption} botConfig - Bot configuration for sending the message
     * @param {string | InteractionsMessage} message - message to send to the bot
     * @return {Promise<InteractionsResponse>} A promise resolves to the response from the bot
     */
    async sendMessage(botConfig, message) {
        // check if credentials are present
        let session;
        try {
            session = await (0, core_1.fetchAuthSession)();
        }
        catch (error) {
            return Promise.reject(new Error('No credentials'));
        }
        const { region, aliasId, localeId, botId } = botConfig;
        const client = new client_lex_runtime_v2_1.LexRuntimeV2Client({
            region,
            credentials: session.credentials,
            customUserAgent: (0, utils_1.getAmplifyUserAgentObject)(),
        });
        let response;
        // common base params for all requests
        const reqBaseParams = {
            botAliasId: aliasId,
            botId,
            localeId,
            sessionId: session.identityId ?? this.defaultSessionId,
        };
        if (typeof message === 'string') {
            response = await this._handleRecognizeTextCommand(botConfig, message, reqBaseParams, client);
        }
        else {
            response = await this._handleRecognizeUtteranceCommand(botConfig, message, reqBaseParams, client);
        }
        return response;
    }
    /**
     * Attach a onComplete callback function to a bot.
     * The callback is called once the bot's intent is fulfilled
     * @param {AWSLexV2ProviderOption} botConfig - Bot configuration to attach the onComplete callback
     * @param {InteractionsOnCompleteCallback} callback - called when Intent Fulfilled
     */
    onComplete({ name }, callback) {
        this._botsCompleteCallback[name] = callback;
    }
    /**
     * call onComplete callback for a bot if configured
     */
    _reportBotStatus(data, { name }) {
        const sessionState = data?.sessionState;
        // Check if state is fulfilled to resolve onFullfilment promise
        logger.debug('postContent state', sessionState?.intent?.state);
        const callback = this._botsCompleteCallback[name];
        if (!callback) {
            return;
        }
        switch (sessionState?.intent?.state) {
            case client_lex_runtime_v2_1.IntentState.READY_FOR_FULFILLMENT:
            case client_lex_runtime_v2_1.IntentState.FULFILLED:
                callback(undefined, data);
                break;
            case client_lex_runtime_v2_1.IntentState.FAILED:
                callback(new Error('Bot conversation failed'));
                break;
        }
    }
    /**
     * Format UtteranceCommandOutput's response
     * decompress attributes
     * update audioStream format
     */
    async _formatUtteranceCommandOutput(data) {
        return {
            ...data,
            messages: await (0, utils_2.unGzipBase64AsJson)(data.messages),
            sessionState: await (0, utils_2.unGzipBase64AsJson)(data.sessionState),
            interpretations: await (0, utils_2.unGzipBase64AsJson)(data.interpretations),
            requestAttributes: await (0, utils_2.unGzipBase64AsJson)(data.requestAttributes),
            inputTranscript: await (0, utils_2.unGzipBase64AsJson)(data.inputTranscript),
            audioStream: data.audioStream
                ? await (0, utils_2.convert)(data.audioStream)
                : undefined,
        };
    }
    /**
     * handle client's `RecognizeTextCommand`
     * used for sending simple text message
     */
    async _handleRecognizeTextCommand(botConfig, data, baseParams, client) {
        logger.debug('postText to lex2', data);
        const params = {
            ...baseParams,
            text: data,
        };
        try {
            const recognizeTextCommand = new client_lex_runtime_v2_1.RecognizeTextCommand(params);
            const resultData = await client.send(recognizeTextCommand);
            this._reportBotStatus(resultData, botConfig);
            return resultData;
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    /**
     * handle client's `RecognizeUtteranceCommand`
     * used for obj text or obj voice message
     */
    async _handleRecognizeUtteranceCommand(botConfig, data, baseParams, client) {
        const { content, options: { messageType }, } = data;
        logger.debug('postContent to lex2', data);
        let params;
        // prepare params
        if (messageType === 'voice') {
            if (typeof content !== 'object') {
                return Promise.reject(new Error('invalid content type'));
            }
            const inputStream = content instanceof Uint8Array ? content : await (0, utils_2.convert)(content);
            params = {
                ...baseParams,
                requestContentType: 'audio/x-l16; sample-rate=16000; channel-count=1',
                inputStream,
            };
        }
        else {
            // text input
            if (typeof content !== 'string')
                return Promise.reject(new Error('invalid content type'));
            params = {
                ...baseParams,
                requestContentType: 'text/plain; charset=utf-8',
                inputStream: content,
            };
        }
        // make API call to lex
        try {
            const recognizeUtteranceCommand = new client_lex_runtime_v2_1.RecognizeUtteranceCommand(params);
            const resultData = await client.send(recognizeUtteranceCommand);
            const response = await this._formatUtteranceCommandOutput(resultData);
            this._reportBotStatus(response, botConfig);
            return response;
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
}
exports.lexProvider = new AWSLexV2Provider();
//# sourceMappingURL=AWSLexV2Provider.js.map
