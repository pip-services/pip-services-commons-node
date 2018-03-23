import { ErrorDescription } from '../errors/ErrorDescription';
export declare class LogMessage {
    time: Date;
    source: string;
    level: string;
    correlation_id: string;
    error: ErrorDescription;
    message: string;
}
