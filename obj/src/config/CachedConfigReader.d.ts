import { IConfigReader } from './IConfigReader';
import { IReconfigurable } from './IReconfigurable';
import { ConfigParams } from './ConfigParams';
export declare abstract class CachedConfigReader implements IConfigReader, IReconfigurable {
    private _lastRead;
    private _timeout;
    private _config;
    constructor();
    getTimeout(): number;
    setTimeout(timeout: number): void;
    configure(config: ConfigParams): void;
    protected abstract performReadConfig(correlationId: string, callback: (err: any, config: ConfigParams) => void): void;
    readConfig(correlationId: string, callback: (err: any, config: ConfigParams) => void): void;
    readConfigSection(correlationId: string, section: string, callback: (err: any, config: ConfigParams) => void): void;
}
