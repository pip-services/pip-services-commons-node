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

    private resolveInDiscovery(correlationId: string, connection: ConnectionParams, callback: (err: any, result: ConnectionParams) => void): void {

        if (!connection.getUseDiscovery()) {
            callback(null, null);
            return;
        }

        let key: string = connection.getDiscoveryKey();
        if (this._references == null) return;

        let discoveries: any[] = this._references.getOptional<any>(new Descriptor("*", "discovery", "*", "*", "*"))
        if (discoveries.length == 0)
            throw new ConfigException(correlationId, "CANNOT_RESOLVE", "Discovery wasn't found to make resolution");

        let firstResult: ConnectionParams = null;

        async.any(
            discoveries,
            (discovery, cb) => {
                let discoveryTyped: IDiscovery = discovery;
                discoveryTyped.resolveOne(correlationId, key, (err, result) => {
                    if (err || result == null) {
                        cb(err, false);
                    } else {
                        firstResult = result;
                        cb(err, true);
                    }

                });
            },
            (err) => {
                if (callback) callback(err, firstResult);
            }
        );
    }

    public resolve(correlationId: string, callback: (err: any, result: ConnectionParams) => void): void {

        if (this._connections.length == 0) {
            if (callback) callback(null, null);
            return;
        }

        let connections: ConnectionParams[] = [];

        for (let index = 0; index < this._connections.length; index++) {
            if (!this._connections[index].getUseDiscovery()) {
                if (callback) callback(null, this._connections[index]);
                return;
            } else {
                connections.push(this._connections[index]);
            }
        }

        if (connections.length == 0) return null;

        let firstResult: ConnectionParams = null;
        async.any(
            connections,
            (connection, cb) => {
                this.resolveInDiscovery(correlationId, connection, (err, result) => {
                    if (err || result == null) {
                        cb(err, false);
                    } else {
                        firstResult = new ConnectionParams(ConfigParams.mergeConfigs(connection, result));
                        cb(err, true);
                    }
                });
            },
            (err) => {
                if (callback) callback(err, firstResult);
            }
        );
    }


    private resolveAllInDiscovery(correlationId: string, connection: ConnectionParams, callback: (err: any, result: ConnectionParams[]) => void): void {
        let result: ConnectionParams[] = [];
        let key: string = connection.getDiscoveryKey();

        if (!connection.getUseDiscovery()) {
            callback(null, null);
            return;
        }

        if (this._references == null) return;

        let discoveries: any[] = this._references.getOptional<any>(new Descriptor("*", "discovery", "*", "*", "*"))
        if (discoveries.length == 0) 
            throw new ConfigException(correlationId, "CANNOT_RESOLVE", "Discovery wasn't found to make resolution");

        async.each(
            discoveries,
            (discovery, cb) => {
                let discoveryTyped: IDiscovery = discovery;
                discoveryTyped.resolveAll(correlationId, key, (err, result) => {
                    if (err || result == null) {
                        cb(err);
                    } else {
                        result.push(...result);
                        cb(null);
                    }

                });
            },
            (err) => {
                if (callback) callback(err, result);
            }
        );
    }

    public resolveAll(correlationId: string, callback: (err: any, result: ConnectionParams[]) => void): void {
        let resolved: ConnectionParams[] = [];
        let toResolve: ConnectionParams[] = [];

        for (let index = 0; index < this._connections.length; index++) {
            if (this._connections[index].getUseDiscovery())
                toResolve.push(this._connections[index]);
            else
                resolved.push(this._connections[index]);
        }

        if (toResolve.length <= 0) {
            if (callback) callback(null, resolved);
            return;
        }

        async.each(
            toResolve,
            (connection, cb) => {
                this.resolveAllInDiscovery(correlationId, connection, (err, result) => {
                    if (err) {
                        cb(err);
                    } else {
                        for (let index = 0; index < result.length; index++) {
                            let localResolvedConnection: ConnectionParams = new ConnectionParams(ConfigParams.mergeConfigs(connection, result[index]));
                            resolved.push(localResolvedConnection);
                        }
                        cb(null);
                    }
                });
            },
            (err) => {
                if (callback) callback(err, resolved);
            }
        );
    }

    private registerInDiscovery(correlationId: string, connection: ConnectionParams, callback: (err: any, result: boolean) => void) {
        if (!connection.getUseDiscovery()) {
            callback(null, false);
            return;
        }

        var key = connection.getDiscoveryKey();
        if (this._references == null) {
            callback(null, false);
            return;
        }

        var discoveries = this._references.getOptional<IDiscovery>(new Descriptor("*", "discovery", "*", "*", "*"));
        if (discoveries == null) {
            callback(null, false);
            return;
        }

        async.each(
            discoveries,
            (discovery, cb) => {
                discovery.register(correlationId, key, connection, (err, result) => {
                    cb(err);
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
            callback(err);
        });
    }

}