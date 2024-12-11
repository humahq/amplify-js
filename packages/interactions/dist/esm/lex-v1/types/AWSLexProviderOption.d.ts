import { OnCompleteInput, SendInput } from './inputs';
import { SendOutput } from './outputs';
export interface AWSLexProviderOption {
    name: string;
    alias: string;
    region: string;
}
export interface IInteractions {
    send(input: SendInput): Promise<SendOutput>;
    onComplete(input: OnCompleteInput): void;
}
