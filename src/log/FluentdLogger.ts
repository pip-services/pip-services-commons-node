import { ConfigParams } from '../config/ConfigParams';
import { IConfigurable } from '../config/IConfigurable';
import { IReferences } from '../refer/IReferences';
import { IReferenceable } from '../refer/IReferenceable';
import { IOpenable } from '../run/IOpenable';
import { ConnectionResolver } from '../connect/ConnectionResolver';
import { InvalidStateException } from '../errors/InvalidStateException';
import { ConfigException } from '../errors/ConfigException';

import { CachedLogger } from './CachedLogger';
import { LogMessage } from './LogMessage';
import { LogLevelConverter } from './LogLevelConverter';

export class FluentdLogger extends CachedLogger implements IReferenceable, IOpenable {
    private _connectionResolver: ConnectionResolver = new ConnectionResolver();
    
    private _reconnect: number = 10000;
    private _timeout: number = 3000;

    private _client: any = null;

    public constructor() {
        super();
    }

    public configure(config: ConfigParams): void {
        super.configure(config);

        this._connectionResolver.configure(config);

        this._reconnect = config.getAsIntegerWithDefault('options.reconnect', this._reconnect);
        this._timeout = config.getAsIntegerWithDefault('options.timeout', this._timeout);
    }

    public setReferences(references: IReferences): void {
        this._connectionResolver.setReferences(references);
    }

    public isOpened(): boolean {
        return this._client;
    }

    public open(correlationId: string, callback: (err: any) => void): void {
        this._connectionResolver.resolve(correlationId, (err, connection) => {
            if (connection == null)
                err = new ConfigException(correlationId, 'NO_CONNECTION', 'Connection is not configured');

            if (err != null) {
                 callback(err);
                 return;
            } 

            let host = connection.getHost();
            let port = connection.getPort() || 24224;

            let options = {
                host: host,
                port: port,
                timeout: this._timeout / 1000,
                reconnectInterval: this._reconnect
            };

            this._client = require('fluent-logger');
            this._client.configure(null, options);

            if (callback) callback(null);
        });
    }

    public close(correlationId: string, callback: (err: any) => void): void {
        this._client = null;
        if (callback) callback(null);
    }

    protected save(messages: LogMessage[]): void {
        if (!this.isOpened()) return;

        for (let message of messages) {
            let level = LogLevelConverter.toString(message.level).toLowerCase();
            let record = {
                level: message.level,
                source: message.source,
                correlation_id: message.correlation_id,
                error: message.error,
                message: message.message
            };
            this._client.emit(level, record);
        }
    }
}