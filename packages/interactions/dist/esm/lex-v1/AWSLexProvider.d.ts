import { PostContentCommandOutput, PostTextCommandOutput } from '@aws-sdk/client-lex-runtime-service';
import { InteractionsMessage, InteractionsOnCompleteCallback, InteractionsResponse } from '../types/Interactions';
import { AWSLexProviderOption } from './types';
interface PostContentCommandOutputFormatted extends Omit<PostContentCommandOutput, 'audioStream'> {
    audioStream?: Uint8Array;
}
type AWSLexProviderSendResponse = PostTextCommandOutput | PostContentCommandOutputFormatted;
declare class AWSLexProvider {
    private readonly _botsCompleteCallback;
    /**
     * @deprecated
     * This is used internally by 'sendMessage' to call onComplete callback
     * for a bot if configured
     */
    reportBotStatus(data: AWSLexProviderSendResponse, { name }: AWSLexProviderOption): void;
    sendMessage(botConfig: AWSLexProviderOption, message: string | InteractionsMessage): Promise<InteractionsResponse>;
    onComplete({ name }: AWSLexProviderOption, callback: InteractionsOnCompleteCallback): void;
}
export declare const lexProvider: AWSLexProvider;
export {};
