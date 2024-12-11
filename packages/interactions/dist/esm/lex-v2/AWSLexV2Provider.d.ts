import { RecognizeTextCommandOutput, RecognizeUtteranceCommandOutput } from '@aws-sdk/client-lex-runtime-v2';
import { InteractionsMessage, InteractionsOnCompleteCallback, InteractionsResponse } from '../types/Interactions';
import { AWSLexV2ProviderOption } from './types';
interface RecognizeUtteranceCommandOutputFormatted extends Omit<RecognizeUtteranceCommandOutput, 'messages' | 'interpretations' | 'sessionState' | 'requestAttributes' | 'audioStream'> {
    messages?: RecognizeTextCommandOutput['messages'];
    sessionState?: RecognizeTextCommandOutput['sessionState'];
    interpretations?: RecognizeTextCommandOutput['interpretations'];
    requestAttributes?: RecognizeTextCommandOutput['requestAttributes'];
    audioStream?: Uint8Array;
}
type AWSLexV2ProviderSendResponse = RecognizeTextCommandOutput | RecognizeUtteranceCommandOutputFormatted;
declare class AWSLexV2Provider {
    private readonly _botsCompleteCallback;
    private defaultSessionId;
    /**
     * Send a message to a bot
     * @async
     * @param {AWSLexV2ProviderOption} botConfig - Bot configuration for sending the message
     * @param {string | InteractionsMessage} message - message to send to the bot
     * @return {Promise<InteractionsResponse>} A promise resolves to the response from the bot
     */
    sendMessage(botConfig: AWSLexV2ProviderOption, message: string | InteractionsMessage): Promise<InteractionsResponse>;
    /**
     * Attach a onComplete callback function to a bot.
     * The callback is called once the bot's intent is fulfilled
     * @param {AWSLexV2ProviderOption} botConfig - Bot configuration to attach the onComplete callback
     * @param {InteractionsOnCompleteCallback} callback - called when Intent Fulfilled
     */
    onComplete({ name }: AWSLexV2ProviderOption, callback: InteractionsOnCompleteCallback): void;
    /**
     * call onComplete callback for a bot if configured
     */
    _reportBotStatus(data: AWSLexV2ProviderSendResponse, { name }: AWSLexV2ProviderOption): void;
    /**
     * Format UtteranceCommandOutput's response
     * decompress attributes
     * update audioStream format
     */
    private _formatUtteranceCommandOutput;
    /**
     * handle client's `RecognizeTextCommand`
     * used for sending simple text message
     */
    private _handleRecognizeTextCommand;
    /**
     * handle client's `RecognizeUtteranceCommand`
     * used for obj text or obj voice message
     */
    private _handleRecognizeUtteranceCommand;
}
export declare const lexProvider: AWSLexV2Provider;
export {};
