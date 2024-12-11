'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
exports.lexProvider = void 0;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const client_lex_runtime_service_1 = require("@aws-sdk/client-lex-runtime-service");
const utils_1 = require("@aws-amplify/core/internals/utils");
const core_1 = require("@aws-amplify/core");
const utils_2 = require("../utils");
const logger = new core_1.ConsoleLogger('AWSLexProvider');
class AWSLexProvider {
    constructor() {
        this._botsCompleteCallback = {};
    }
    /**
     * @deprecated
     * This is used internally by 'sendMessage' to call onComplete callback
     * for a bot if configured
     */
    reportBotStatus(data, { name }) {
        const callback = this._botsCompleteCallback[name];
        if (!callback) {
            return;
        }
        // Check if state is fulfilled to resolve onFullfilment promise
        logger.debug('postContent state', data.dialogState);
        switch (data.dialogState) {
            case client_lex_runtime_service_1.DialogState.READY_FOR_FULFILLMENT:
            case client_lex_runtime_service_1.DialogState.FULFILLED:
                callback(undefined, data);
                break;
            case client_lex_runtime_service_1.DialogState.FAILED:
                callback(new Error('Bot conversation failed'));
                break;
        }
    }
    async sendMessage(botConfig, message) {
        // check if credentials are present
        let session;
        try {
            session = await (0, core_1.fetchAuthSession)();
        }
        catch (error) {
            return Promise.reject(new Error('No credentials'));
        }
        const { name, region, alias } = botConfig;
        const client = new client_lex_runtime_service_1.LexRuntimeServiceClient({
            region,
            credentials: session.credentials,
            customUserAgent: (0, utils_1.getAmplifyUserAgentObject)(),
        });
        let params;
        if (typeof message === 'string') {
            params = {
                botAlias: alias,
                botName: name,
                inputText: message,
                userId: session.identityId,
            };
            logger.debug('postText to lex', message);
            try {
                const postTextCommand = new client_lex_runtime_service_1.PostTextCommand(params);
                const data = await client.send(postTextCommand);
                this.reportBotStatus(data, botConfig);
                return data;
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        else {
            const { content, options: { messageType }, } = message;
            if (messageType === 'voice') {
                if (typeof content !== 'object') {
                    return Promise.reject(new Error('invalid content type'));
                }
                const inputStream = content instanceof Uint8Array ? content : await (0, utils_2.convert)(content);
                params = {
                    botAlias: alias,
                    botName: name,
                    contentType: 'audio/x-l16; sample-rate=16000; channel-count=1',
                    userId: session.identityId,
                    accept: 'audio/mpeg',
                    inputStream,
                };
            }
            else {
                if (typeof content !== 'string')
                    return Promise.reject(new Error('invalid content type'));
                params = {
                    botAlias: alias,
                    botName: name,
                    contentType: 'text/plain; charset=utf-8',
                    inputStream: content,
                    userId: session.identityId,
                    accept: 'audio/mpeg',
                };
            }
            logger.debug('postContent to lex', message);
            try {
                const postContentCommand = new client_lex_runtime_service_1.PostContentCommand(params);
                const data = await client.send(postContentCommand);
                const audioArray = data.audioStream
                    ? await (0, utils_2.convert)(data.audioStream)
                    : undefined;
                const response = { ...data, ...{ audioStream: audioArray } };
                this.reportBotStatus(response, botConfig);
                return response;
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
    }
    onComplete({ name }, callback) {
        this._botsCompleteCallback[name] = callback;
    }
}
exports.lexProvider = new AWSLexProvider();
//# sourceMappingURL=AWSLexProvider.js.map
