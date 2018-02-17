import { ConfigParams } from '../config/ConfigParams';
import { IConfigurable } from '../config/IConfigurable';
import { IReferences } from '../refer/IReferences';
import { IReferenceable } from '../refer/IReferenceable';
import { IOpenable } from '../run/IOpenable';
import { ConnectionResolver } from '../connect/ConnectionResolver';
import { InvalidStateException } from '../errors/InvalidStateException';
import { ConfigException } from '../errors/ConfigException';

import { ICache } from './ICache';

export class MemcachedCache implements ICache, IConfigurable, IReferenceable, IOpenable {
    private _connectionResolver: ConnectionResolver = new ConnectionResolver();
    
    private _maxKeySize: number = 250;
    private _maxExpiration: number = 2592000;
    private _maxValue: number = 1048576;
    private _poolSize: number = 5;
    private _reconnect: number = 10000;
    private _timeout: number = 5000;
    private _retries: number = 5;
    private _failures: number = 5;
    private _retry: number = 30000;
    private _remove: boolean = false;
    private _idle: number = 5000;

    private _client: any = null;

    public constructor() {}

    public configure(config: ConfigParams): void {
        this._connectionResolver.configure(config);

        this._maxKeySize = config.getAsIntegerWithDefault('options.max_key_size', this._maxKeySize);
        this._maxExpiration = config.getAsLongWithDefault('options.max_expiration', this._maxExpiration);
        this._maxValue = config.getAsLongWithDefault('options.max_value', this._maxValue);
        this._poolSize = config.getAsIntegerWithDefault('options.pool_size', this._poolSize);
        this._reconnect = config.getAsIntegerWithDefault('options.reconnect', this._reconnect);
        this._timeout = config.getAsIntegerWithDefault('options.timeout', this._timeout);
        this._retries = config.getAsIntegerWithDefault('options.retries', this._retries);
        this._failures = config.getAsIntegerWithDefault('options.failures', this._failures);
        this._retry = config.getAsIntegerWithDefault('options.retry', this._retry);
        this._remove = config.getAsBooleanWithDefault('options.remove', this._remove);
        this._idle = config.getAsIntegerWithDefault('options.idle', this._idle);
    }

    public setReferences(references: IReferences): void {
        this._connectionResolver.setReferences(references);
    }

    public isOpened(): boolean {
        return this._client;
    }

    public open(correlationId: string, callback: (err: any) => void): void {
        this._connectionResolver.resolveAll(correlationId, (err, connections) => {
            if (err == null && connections.length == 0)
                err = new ConfigException(correlationId, 'NO_CONNECTION', 'Connection is not configured');

            if (err != null) {
                 callback(err);
                 return;
            } 

            let servers: string[] = [];
            for (let connection of connections) {
                let host = connection.getHost();
                let port = connection.getPort() || 11211;
                servers.push(host + ':' + port);
            }

            let options = {
                maxKeySize: this._maxKeySize,
                _maxExpiration: this._maxExpiration,
                _maxValue: this._maxValue,
                _poolSize: this._poolSize,
                _reconnect: this._reconnect,
                _timeout: this._timeout,
                _retries: this._retries,
                _failures: this._failures,
                _retry: this._retry,
                _remove: this._remove,
                _idle: this._idle
            };

            let Memcached = require('memcached');
            this._client = new Memcached(servers, options);

            if (callback) callback(null);
        });
    }

    public close(correlationId: string, callback: (err: any) => void): void {
        this._client = null;
        if (callback) callback(null);
    }

    private checkOpened(correlationId: string, callback: any): boolean {
        if (!this.isOpened()) {
            let err = new InvalidStateException(correlationId, 'NOT_OPENED', 'Connection is not opened');
            callback(err, null);
            return false;
        }
        
        return true;
    }
    
    public retrieve(correlationId: string, key: string,
        callback: (err: any, value: any) => void): void {
        if (!this.checkOpened(correlationId, callback)) return;

        this._client.get(key, callback);
    }

    public store(correlationId: string, key: string, value: any, timeout: number,
        callback: (err: any) => void): void {
        if (!this.checkOpened(correlationId, callback)) return;

        let timeoutInSec = timeout / 1000;
        this._client.set(key, value, timeoutInSec, callback);
    }

    public remove(correlationId: string, key: string,
        callback: (err: any) => void) {
        if (!this.checkOpened(correlationId, callback)) return;

        this._client.del(key, callback);
    }
    
}