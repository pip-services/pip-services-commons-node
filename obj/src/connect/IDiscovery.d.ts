import { ConnectionParams } from './ConnectionParams';
export interface IDiscovery {
    register(correlationId: string, key: string, connection: ConnectionParams, callback: (err: any, result: any) => void): void;
    resolveOne(correlationId: string, key: string, callback: (err: any, result: ConnectionParams) => void): void;
    resolveAll(correlationId: string, key: string, callback: (err: any, result: ConnectionParams[]) => void): void;
}
