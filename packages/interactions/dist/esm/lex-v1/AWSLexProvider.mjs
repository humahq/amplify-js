import { DialogState, LexRuntimeServiceClient, PostTextCommand, PostContentCommand } from '@aws-sdk/client-lex-runtime-service';
import { getAmplifyUserAgentObject } from '@aws-amplify/core/internals/utils';
import { ConsoleLogger, fetchAuthSession } from '@aws-amplify/core';
import { convert } from '../utils/utils.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const logger = new ConsoleLogger('AWSLexProvider');
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
            case DialogState.READY_FOR_FULFILLMENT:
            case DialogState.FULFILLED:
                callback(undefined, data);
                break;
            case DialogState.FAILED:
                callback(new Error('Bot conversation failed'));
                break;
        }
    }
    async sendMessage(botConfig, message) {
        // check if credentials are present
        let session;
        try {
            session = await fetchAuthSession();
        }
        catch (error) {
            return Promise.reject(new Error('No credentials'));
        }
        const { name, region, alias } = botConfig;
        const client = new LexRuntimeServiceClient({
            region,
            credentials: session.credentials,
            customUserAgent: getAmplifyUserAgentObject(),
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
                const postTextCommand = new PostTextCommand(params);
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
                const inputStream = content instanceof Uint8Array ? content : await convert(content);
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
                const postContentCommand = new PostContentCommand(params);
                const data = await client.send(postContentCommand);
                const audioArray = data.audioStream
                    ? await convert(data.audioStream)
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
const lexProvider = new AWSLexProvider();

export { lexProvider };
//# sourceMappingURL=AWSLexProvider.mjs.map
