import { LogLevel } from './LogLevel';
import { ErrorDescription } from '../errors/ErrorDescription';
export declare class LogMessage {
    private _time;
    private _source;
    private _level;
    private _correlationId;
    private _error;
    private _message;
    constructor(level: LogLevel, source: string, correlationId: string, error: ErrorDescription, message: string);
    getTime(): Date;
    setTime(value: Date): void;
    getSource(): string;
    setSource(value: string): void;
    getLevel(): LogLevel;
    setLevel(value: LogLevel): void;
    getCorrelationId(): string;
    setCorrelationId(value: string): void;
    getError(): ErrorDescription;
    setError(value: ErrorDescription): void;
    getMessage(): string;
    setMessage(value: string): void;
}
