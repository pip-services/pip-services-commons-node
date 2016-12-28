import { IConfigReader } from './IConfigReader';
import { IReconfigurable } from './IReconfigurable';
import { ConfigParams } from './ConfigParams';
export declare abstract class CachedConfigReader implements IConfigReader, IReconfigurable {
    private _lastRead;
    private _name;
    private _timeout;
    private _config;
    constructor(name?: string);
    getName(): string;
    setName(name: string): void;
    getTimeout(): number;
    setTimeout(timeout: number): void;
    configure(config: ConfigParams): void;
    protected abstract performReadConfig(correlationId: string): ConfigParams;
    readConfig(correlationId: string): ConfigParams;
    readConfigSection(correlationId: string, section: string): ConfigParams;
}
