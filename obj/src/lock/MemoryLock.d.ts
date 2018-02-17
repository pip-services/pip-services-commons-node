import { ILock } from './ILock';
import { ConfigParams } from '../config/ConfigParams';
import { IReconfigurable } from '../config/IReconfigurable';
export declare class MemoryLock implements ILock, IReconfigurable {
    private _locks;
    private _retryTimeout;
    configure(config: ConfigParams): void;
    tryAcquireLock(correlationId: string, key: string, ttl: number, callback: (err: any, result: boolean) => void): void;
    acquireLock(correlationId: string, key: string, ttl: number, timeout: number, callback: (err: any) => void): void;
    releaseLock(correlationId: string, key: string, callback?: (err: any) => void): void;
}
