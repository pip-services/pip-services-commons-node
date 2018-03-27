import { IReconfigurable } from '../config/IReconfigurable';
import { ILogger } from './ILogger';
import { LogLevel } from './LogLevel';
import { ConfigParams } from '../config/ConfigParams';
import { IReferenceable } from '../refer/IReferenceable';
import { IReferences } from '../refer/IReferences';
export declare abstract class Logger implements ILogger, IReconfigurable, IReferenceable {
    protected _level: LogLevel;
    protected _source: string;
    protected constructor();
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getLevel(): LogLevel;
    setLevel(value: LogLevel): void;
    getSource(): string;
    setSource(value: string): void;
    protected abstract write(level: LogLevel, correlationId: string, error: Error, message: string): void;
    protected formatAndWrite(level: LogLevel, correlationId: string, error: Error, message: string, ...args: any[]): void;
    log(level: LogLevel, correlationId: string, error: Error, message: string, ...args: any[]): void;
    fatal(correlationId: string, error: Error, message: string, ...args: any[]): void;
    error(correlationId: string, error: Error, message: string, ...args: any[]): void;
    warn(correlationId: string, message: string, ...args: any[]): void;
    info(correlationId: string, message: string, ...args: any[]): void;
    debug(correlationId: string, message: string, ...args: any[]): void;
    trace(correlationId: string, message: string, ...args: any[]): void;
    protected composeError(error: Error): string;
}
