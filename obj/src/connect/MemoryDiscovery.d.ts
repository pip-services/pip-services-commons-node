import { ConfigParams } from '../config/ConfigParams';
import { IReconfigurable } from '../config/IReconfigurable';
import { ConnectionParams } from './ConnectionParams';
import { IDiscovery } from './IDiscovery';
import { IDescriptable } from '../refer/IDescriptable';
import { Descriptor } from '../refer/Descriptor';
export declare class MemoryDiscovery implements IDiscovery, IReconfigurable, IDescriptable {
    private readonly _items;
    private _name;
    constructor(name?: string, config?: ConfigParams);
    getName(): string;
    getDescriptor(): Descriptor;
    configure(config: ConfigParams): void;
    readConnections(connections: ConfigParams): void;
    register(correlationId: string, key: string, connection: ConnectionParams, callback: (err: any, result: any) => void): void;
    resolveOne(correlationId: string, key: string, callback: (err: any, result: ConnectionParams) => void): void;
    resolveAll(correlationId: string, key: string, callback: (err: any, result: ConnectionParams[]) => void): void;
}
