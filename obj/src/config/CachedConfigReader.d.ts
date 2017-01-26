import { IConfigReader } from './IConfigReader';
import { IReconfigurable } from './IReconfigurable';
import { ConfigParams } from './ConfigParams';
export declare abstract class CachedConfigReader implements IConfigReader, IReconfigurable {
    private _lastRead;
    private _name;
    private _timeout;
    private _config;
    constructor(name?: string);
    name: string;
    timeout: number;
    configure(config: ConfigParams): void;
    protected abstract performReadConfig(correlationId: string): ConfigParams;
    readConfig(correlationId: string): ConfigParams;
    readConfigSection(correlationId: string, section: string): ConfigParams;
}
