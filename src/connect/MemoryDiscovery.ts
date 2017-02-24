let async = require('async');

import { ConfigParams } from '../config/ConfigParams';
import { IReconfigurable } from '../config/IReconfigurable';
import { NameResolver } from '../config/NameResolver';
import { ConnectionParams } from './ConnectionParams';
import { IDiscovery } from './IDiscovery';
import { IDescriptable } from '../refer/IDescriptable';
import { Descriptor } from '../refer/Descriptor';
import { StringValueMap } from '../data/StringValueMap';

class DiscoveryItem {
    public key: string;
    public connection: ConnectionParams;
}

export class MemoryDiscovery implements IDiscovery, IReconfigurable, IDescriptable {
    private readonly _items: DiscoveryItem[] = [];
    private _name: string;

    public constructor(name: string = null, config: ConfigParams = null) {
        name = name;
        if (config != null)
            this.configure(config);
    }

    public getName(): string {
        return this._name;
    }

    public getDescriptor(): Descriptor {
        return new Descriptor("pip-services-commons", "discovery", "memory", name || "default", "1.0");
    }

    public configure(config: ConfigParams): void {
        this._name = NameResolver.resolve(config, name);
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
        for (let index: 0; index < this._items.length; index++) {
            if (this._items[index].key == key && this._items[index].connection != null) {
                connection = this._items[index].connection;
                break;
            }
        }
        callback(null, connection);
    }

    public resolveAll(correlationId: string, key: string, callback: (err: any, result: ConnectionParams[]) => void): void {
        let connections: ConnectionParams[] = [];
        for (let index: 0; index < this._items.length; index++) {
            if (this._items[index].key == key && this._items[index].connection != null)
                connections.push(this._items[index].connection);
        }
        callback(null, connections);
    }
}