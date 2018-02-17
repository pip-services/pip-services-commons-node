import { ConfigParams } from '../config/ConfigParams';
import { IConfigurable } from '../config/IConfigurable';
import { IReferences } from '../refer/IReferences';
import { IReferenceable } from '../refer/IReferenceable';
import { IOpenable } from '../run/IOpenable';
import { Lock } from './Lock';
export declare class MemcachedLock extends Lock implements IConfigurable, IReferenceable, IOpenable {
    private _connectionResolver;
    private _maxKeySize;
    private _maxExpiration;
    private _maxValue;
    private _poolSize;
    private _reconnect;
    private _timeout;
    private _retries;
    private _failures;
    private _retry;
    private _remove;
    private _idle;
    private _client;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    isOpened(): boolean;
    open(correlationId: string, callback: (err: any) => void): void;
    close(correlationId: string, callback: (err: any) => void): void;
    private checkOpened(correlationId, callback);
    tryAcquireLock(correlationId: string, key: string, ttl: number, callback: (err: any, result: boolean) => void): void;
    releaseLock(correlationId: string, key: string, callback?: (err: any) => void): void;
}
