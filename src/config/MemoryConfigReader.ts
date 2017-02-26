import { IConfigReader } from './IConfigReader';
import { ConfigParams } from './ConfigParams';
import { NameResolver } from './NameResolver';
import { IReconfigurable } from './IReconfigurable';

export class MemoryConfigReader implements IConfigReader, IReconfigurable {
    protected _config: ConfigParams = new ConfigParams();

    public constructor(config: ConfigParams = null) {
        this._config = config;
    }

    public configure(config: ConfigParams): void {
        this._config = config;
    }

    public readConfig(correlationId: string, callback: (err: any, config: ConfigParams) => void): void {
        let config = new ConfigParams(this._config);
        callback(null, config);
    }

    public readConfigSection(correlationId: string, section: string, callback: (err: any, config: ConfigParams) => void): void {
        let config = this._config == null ? null : this._config.getSection(section);
        callback(null, config);
    }
}