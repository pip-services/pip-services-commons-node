import { IReconfigurable } from '../config/IReconfigurable';
import { ConfigParams } from '../config/ConfigParams';
import { LogLevel } from './LogLevel';
import { Logger } from './Logger';
import { LogMessage } from './LogMessage';
export declare abstract class CachedLogger extends Logger implements IReconfigurable {
    private static readonly _defaultInterval;
    protected _cache: LogMessage[];
    protected _updated: boolean;
    protected _lastDumpTime: number;
    protected _interval: number;
    protected write(level: LogLevel, correlationId: string, ex: Error, message: string): void;
    protected abstract save(messages: LogMessage[]): void;
    configure(config: ConfigParams): void;
    clear(): void;
    dump(): void;
    protected update(): void;
}
