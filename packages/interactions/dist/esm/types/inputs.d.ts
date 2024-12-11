import { InteractionsMessage, InteractionsOnCompleteCallback } from './Interactions';
export interface InteractionsSendInput {
    botName: string;
    message: string | InteractionsMessage;
}
export interface InteractionsOnCompleteInput {
    botName: string;
    callback: InteractionsOnCompleteCallback;
}
