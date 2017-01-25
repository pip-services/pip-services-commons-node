import { ILogger } from './ILogger';
import { LogLevel } from './LogLevel';
import { IDescriptable } from '../refer/IDescriptable';
import { Descriptor } from '../refer/Descriptor';
export declare class NullLogger implements ILogger, IDescriptable {
    private readonly _descriptor;
    constructor();
    getDescriptor(): Descriptor;
    getLevel(): LogLevel;
    setLevel(value: LogLevel): void;
    log(level: LogLevel, correlationId: string, error: Error, message: string, ...args: any[]): void;
    fatal(correlationId: string, error: Error, message: string, ...args: any[]): void;
    error(correlationId: string, error: Error, message: string, ...args: any[]): void;
    warn(correlationId: string, message: string, ...args: any[]): void;
    info(correlationId: string, message: string, ...args: any[]): void;
    debug(correlationId: string, message: string, ...args: any[]): void;
    trace(correlationId: string, message: string, ...args: any[]): void;
}