let async = require('async');

import { ConnectionParams } from './ConnectionParams';
import { IDiscovery } from './IDiscovery';
import { ConfigParams } from '../config/ConfigParams';
import { IReferences } from '../refer/IReferences';
import { ConfigException } from '../errors/ConfigException';
import { Descriptor } from '../refer/Descriptor';

export class ConnectionResolver {
    private readonly _connections: ConnectionParams[] = [];
    private _references: IReferences = null;

    public constructor(config: ConfigParams = null, references: IReferences = null) {
        if (config != null) this.configure(config);
        if (references != null) this.setReferences(references);
    }

    public setReferences(references: IReferences): void {
        this._references = references;
    }

    public configure(config: ConfigParams, configAsDefault: boolean = true): void {
        let connections: ConnectionParams[] = ConnectionParams.manyFromConfig(config, configAsDefault);
        this._connections.push(...connections);
    }

    public getAll(): ConnectionParams[] {
        return this._connections;
    }

    public add(connection: ConnectionParams): void {
        this._connections.push(connection);
    }

    private resolveInDiscovery(correlationId: string, connection: ConnectionParams, 
        callback: (err: any, result: ConnectionParams) => void): void {
        
        if (!connection.useDiscovery()) {
            callback(null, null);
            return;
        }

        let key: string = connection.getDiscoveryKey();
        if (this._references == null) {
            callback(null, null);
            return;
        }

        let discoveries: any[] = this._references.getOptional<any>(new Descriptor("*", "discovery", "*", "*", "*"))
        if (discoveries.length == 0) {
            let err = new ConfigException(correlationId, "CANNOT_RESOLVE", "Discovery wasn't found to make resolution");
            callback(err, null);
            return;
        }

        let firstResult: ConnectionParams = null;

        async.any(
            discoveries,
            (discovery, callback) => {
                let discoveryTyped: IDiscovery = discovery;
                discoveryTyped.resolveOne(correlationId, key, (err, result) => {
                    if (err || result == null) {
                        callback(err, false);
                    } else {
                        firstResult = result;
                        callback(err, true);
                    }
                });
            },
            (err) => {
                callback(err, firstResult);
            }
        );
    }

    public resolve(correlationId: string, 
        callback: (err: any, result: ConnectionParams) => void): void {

        if (this._connections.length == 0) {
            callback(null, null);
            return;
        }

        let connections: ConnectionParams[] = [];

        for (let index = 0; index < this._connections.length; index++) {
            if (!this._connections[index].useDiscovery()) {
                callback(null, this._connections[index]);
                return;
            } else {
                connections.push(this._connections[index]);
            }
        }

        if (connections.length == 0) {
            callback(null, null);
            return;
        }

        let firstResult: ConnectionParams = null;
        async.any(
            connections,
            (connection, callback) => {
                this.resolveInDiscovery(correlationId, connection, (err, result) => {
                    if (err || result == null) {
                        callback(err, false);
                    } else {
                        firstResult = new ConnectionParams(ConfigParams.mergeConfigs(connection, result));
                        callback(err, true);
                    }
                });
            },
            (err) => {
                callback(err, firstResult);
            }
        );
    }


    private resolveAllInDiscovery(correlationId: string, connection: ConnectionParams, 
        callback: (err: any, result: ConnectionParams[]) => void): void {
        
        let result: ConnectionParams[] = [];
        let key: string = connection.getDiscoveryKey();

        if (!connection.useDiscovery()) {
            callback(null, []);
            return;
        }

        if (this._references == null) {
            callback(null, []);
            return;
        }

        let discoveries: any[] = this._references.getOptional<any>(new Descriptor("*", "discovery", "*", "*", "*"))
        if (discoveries.length == 0) {
            let err = new ConfigException(correlationId, "CANNOT_RESOLVE", "Discovery wasn't found to make resolution");
            callback(err, null);
            return;
        }

        async.each(
            discoveries,
            (discovery, callback) => {
                let discoveryTyped: IDiscovery = discovery;
                discoveryTyped.resolveAll(correlationId, key, (err, result) => {
                    if (err || result == null) {
                        callback(err);
                    } else {
                        result.push(...result);
                        callback(null);
                    }

                });
            },
            (err) => {
                callback(err, result);
            }
        );
    }

    public resolveAll(correlationId: string, callback: (err: any, result: ConnectionParams[]) => void): void {
        let resolved: ConnectionParams[] = [];
        let toResolve: ConnectionParams[] = [];

        for (let index = 0; index < this._connections.length; index++) {
            if (this._connections[index].useDiscovery())
                toResolve.push(this._connections[index]);
            else
                resolved.push(this._connections[index]);
        }

        if (toResolve.length <= 0) {
            callback(null, resolved);
            return;
        }

        async.each(
            toResolve,
            (connection, callback) => {
                this.resolveAllInDiscovery(correlationId, connection, (err, result) => {
                    if (err) {
                        callback(err);
                    } else {
                        for (let index = 0; index < result.length; index++) {
                            let localResolvedConnection: ConnectionParams = new ConnectionParams(ConfigParams.mergeConfigs(connection, result[index]));
                            resolved.push(localResolvedConnection);
                        }
                        callback(null);
                    }
                });
            },
            (err) => {
                callback(err, resolved);
            }
        );
    }

    private registerInDiscovery(correlationId: string, connection: ConnectionParams, callback: (err: any, result: boolean) => void) {
        if (!connection.useDiscovery()) {
            if (callback) callback(null, false);
            return;
        }

        var key = connection.getDiscoveryKey();
        if (this._references == null) {
            if (callback) callback(null, false);
            return;
        }

        var discoveries = this._references.getOptional<IDiscovery>(new Descriptor("*", "discovery", "*", "*", "*"));
        if (discoveries == null) {
            if (callback) callback(null, false);
            return;
        }

        async.each(
            discoveries,
            (discovery, callback) => {
                discovery.register(correlationId, key, connection, (err, result) => {
                    callback(err);
                });
            },
            (err) => {
                if (callback) callback(err, err == null);
            }
        );
    }

    public register(correlationId: string, connection: ConnectionParams, callback: (err: any) => void): void {
        var result = this.registerInDiscovery(correlationId, connection, (err) => {
            if (result)
                this._connections.push(connection);
            if (callback) callback(err);
        });
    }

}