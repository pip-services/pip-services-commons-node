import { LogLevel } from './LogLevel';
export declare class LogLevelConverter {
    static toLogLevel(value: any): LogLevel;
    static toString(level: LogLevel): string;
    static toInteger(level: LogLevel): number;
}
