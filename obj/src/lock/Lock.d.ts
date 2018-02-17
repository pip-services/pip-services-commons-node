import { ILock } from './ILock';
import { ConfigParams } from '../config/ConfigParams';
import { IReconfigurable } from '../config/IReconfigurable';
export declare abstract class Lock implements ILock, IReconfigurable {
    private _retryTimeout;
    configure(config: ConfigParams): void;
    abstract tryAcquireLock(correlationId: string, key: string, ttl: number, callback: (err: any, result: boolean) => void): void;
    abstract releaseLock(correlationId: string, key: string, callback?: (err: any) => void): void;
    acquireLock(correlationId: string, key: string, ttl: number, timeout: number, callback: (err: any) => void): void;
}
