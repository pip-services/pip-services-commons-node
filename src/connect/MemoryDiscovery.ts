let async = require('async');

import { ConfigParams } from '../config/ConfigParams';
import { IReconfigurable } from '../config/IReconfigurable';
import { ConnectionParams } from './ConnectionParams';
import { IDiscovery } from './IDiscovery';

class DiscoveryItem {
    public key: string;
    public connection: ConnectionParams;
}

export class MemoryDiscovery implements IDiscovery, IReconfigurable {
    private readonly _items: DiscoveryItem[] = [];

    public constructor(config: ConfigParams = null) {
        if (config != null)
            this.configure(config);
    }

    public configure(config: ConfigParams): void {
        this.readConnections(config);
    }

    public readConnections(connections: ConfigParams) {
        this._items.splice(0, this._items.length);
        for (let key in connections.getKeyNames()) {
            let item: DiscoveryItem = new DiscoveryItem();
            item.key = key;
            item.connection = ConnectionParams.fromString(connections.getAsNullableString(key));
            this._items.push(item);
        }
    }

    public register(correlationId: string, key: string, connection: ConnectionParams, callback: (err: any, result: any) => void): void {
        let item: DiscoveryItem = new DiscoveryItem();
        item.key = key;
        item.connection = connection;
        this._items.push(item);
        if (callback) callback(null, null);
    }

    public resolveOne(correlationId: string, key: string, callback: (err: any, result: ConnectionParams) => void): void {
        let connection: ConnectionParams = null;
        for (let index = 0; index < this._items.length; index++) {
            let item = this._items[index];
            if (item.key == key && item.connection != null) {
                connection = item.connection;
                break;
            }
        }
        callback(null, connection);
    }

    public resolveAll(correlationId: string, key: string, callback: (err: any, result: ConnectionParams[]) => void): void {
        let connections: ConnectionParams[] = [];
        for (let index = 0; index < this._items.length; index++) {
            let item = this._items[index];
            if (item.key == key && item.connection != null)
                connections.push(item.connection);
        }
        callback(null, connections);
    }
}