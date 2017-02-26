import { IConfigReader } from './IConfigReader';
import { ConfigParams } from './ConfigParams';
import { IReconfigurable } from './IReconfigurable';
export declare class MemoryConfigReader implements IConfigReader, IReconfigurable {
    protected _config: ConfigParams;
    constructor(config?: ConfigParams);
    configure(config: ConfigParams): void;
    readConfig(correlationId: string, callback: (err: any, config: ConfigParams) => void): void;
    readConfigSection(correlationId: string, section: string, callback: (err: any, config: ConfigParams) => void): void;
}
