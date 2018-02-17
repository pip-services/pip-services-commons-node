import { ILock } from './ILock';
import { ConfigParams } from '../config/ConfigParams';
import { IReconfigurable } from '../config/IReconfigurable';
import { ConflictException } from '../errors/ConflictException';

export class MemoryLock implements ILock, IReconfigurable {
    private _locks: { [key: string]: number } = {};
    private _retryTimeout: number = 100;

    public configure(config: ConfigParams): void {
        this._retryTimeout = config.getAsIntegerWithDefault("options.retry_timeout", this._retryTimeout);
    }

    public tryAcquireLock(correlationId: string, key: string, ttl: number,
        callback: (err: any, result: boolean) => void): void {
        let expireTime = this._locks[key];
        let now = new Date().getTime();

        if (expireTime == null || expireTime < now) {
            this._locks[key] = now + ttl;
            callback(null, true);
        } else {
            callback(null, false);
        }
    }

    public acquireLock(correlationId: string, key: string, ttl: number, timeout: number,
        callback: (err: any) => void): void {
        let retryTime = new Date().getTime() + timeout;

        // Try to get lock first
        this.tryAcquireLock(correlationId, key, ttl, (err, result) => {
            if (err || result) {
                callback(err);
                return;
            }

            // Start retrying
            let interval = setInterval(() => {
                // When timeout expires return false
                let now = new Date().getTime();
                if (now > retryTime) {
                    clearInterval(interval);
                    let err = new ConflictException(
                        correlationId,
                        "LOCK_TIMEOUT",
                        "Acquiring lock " + key + " failed on timeout"
                    ).withDetails("key", key);
                    callback(err);
                    return;
                }

                this.tryAcquireLock(correlationId, key, ttl, (err, result) => {
                    if (err || result) {
                        clearInterval(interval);
                        callback(err);
                    }
                });
            }, this._retryTimeout);
        });
    }

    public releaseLock(correlationId: string, key: string,
        callback?: (err: any) => void): void {
        delete this._locks[key];
        if (callback) callback(null);
    }
}