import { LogLevel } from './LogLevel';
import { ErrorDescription } from '../errors/ErrorDescription';
export declare class LogMessage {
    constructor(level: LogLevel, source: string, correlationId: string, error: ErrorDescription, message: string);
    time: Date;
    source: string;
    level: LogLevel;
    correlation_id: string;
    error: ErrorDescription;
    message: string;
}
