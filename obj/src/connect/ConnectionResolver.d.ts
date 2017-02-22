import { ConnectionParams } from './ConnectionParams';
import { ConfigParams } from '../config/ConfigParams';
import { IReferences } from '../refer/IReferences';
export declare class ConnectionResolver {
    private readonly _connections;
    private _references;
    constructor(config?: ConfigParams, references?: IReferences);
    setReferences(references: IReferences): void;
    configure(config: ConfigParams, configAsDefault?: boolean): void;
    getAll(): ConnectionParams[];
    add(connection: ConnectionParams): void;
    private resolveInDiscovery(correlationId, connection, callback);
    resolve(correlationId: string, callback: (err: any, result: ConnectionParams) => void): void;
    private resolveAllInDiscovery(correlationId, connection, callback);
    resolveAll(correlationId: string, callback: (err: any, result: ConnectionParams[]) => void): void;
    private registerInDiscovery(correlationId, connection, callback);
    register(correlationId: string, connection: ConnectionParams, callback: (err: any) => void): void;
}
