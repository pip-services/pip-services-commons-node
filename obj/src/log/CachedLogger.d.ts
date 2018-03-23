import { IReconfigurable } from '../config/IReconfigurable';
import { ConfigParams } from '../config/ConfigParams';
import { LogLevel } from './LogLevel';
import { Logger } from './Logger';
import { LogMessage } from './LogMessage';
export declare abstract class CachedLogger extends Logger implements IReconfigurable {
    private _cache;
    private _updated;
    private _lastDumpTime;
    private _interval;
    private _maxCacheSize;
    protected write(level: LogLevel, correlationId: string, ex: Error, message: string): void;
    protected abstract save(messages: LogMessage[], callback: (err: any) => void): void;
    configure(config: ConfigParams): void;
    clear(): void;
    dump(): void;
    protected update(): void;
}
