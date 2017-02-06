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
    resolveInDiscovery(correlationId: string, connection: ConnectionParams, callback: (err: any, result: ConnectionParams) => void): void;
    resolve(correlationId: string, callback: (err: any, result: ConnectionParams) => void): void;
    resolveAllInDiscovery(correlationId: string, connection: ConnectionParams, callback: (err: any, result: ConnectionParams[]) => void): void;
    resolveAll(correlationId: string, callback: (err: any, result: ConnectionParams[]) => void): void;
}
