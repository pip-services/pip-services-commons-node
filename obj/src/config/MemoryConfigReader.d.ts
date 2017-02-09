import { IConfigReader } from './IConfigReader';
import { ConfigParams } from './ConfigParams';
import { IReconfigurable } from './IReconfigurable';
import { IDescriptable } from '../refer/IDescriptable';
import { Descriptor } from '../refer/Descriptor';
export declare class MemoryConfigReader implements IConfigReader, IDescriptable, IReconfigurable {
    protected _config: ConfigParams;
    private _name;
    constructor(name?: string, config?: ConfigParams);
    getName(): string;
    setName(name: string): void;
    getDescriptor(): Descriptor;
    configure(config: ConfigParams): void;
    readConfig(correlationId: string): ConfigParams;
    readConfigSection(correlationId: string, section: string): ConfigParams;
}
