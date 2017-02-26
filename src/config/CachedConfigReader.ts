import { IConfigReader } from './IConfigReader';
import { IReconfigurable } from './IReconfigurable';
import { ConfigParams } from './ConfigParams';
import { NameResolver } from './NameResolver';

export abstract class CachedConfigReader implements IConfigReader, IReconfigurable {
    private _lastRead: number = 0;
    private _timeout: number = 60000;
    private _config: ConfigParams = null;

    public constructor() {}

    public getTimeout(): number {
        return this._timeout;
    }

    public setTimeout(timeout: number) {
        this._timeout = timeout;
    }

    public configure(config: ConfigParams): void {
        this._timeout = config.getAsLongWithDefault("timeout", this._timeout);
    }

    protected abstract performReadConfig(correlationId: string, callback: (err: any, config: ConfigParams) => void): void;

    public readConfig(correlationId: string, callback: (err: any, config: ConfigParams) => void): void {
        let timestamp: number = new Date().getTime();

        if (this._config != null && timestamp < this._lastRead + this._timeout) {
            callback(null, this._config);
            return;
        }

        this.performReadConfig(correlationId, (err, config) => {
            if (err) callback(err, null);
            else {
                this._config = config;
                this._lastRead = timestamp;
                callback(null, config);
            }
        });
    }

    public readConfigSection(correlationId: string, section: string, callback: (err: any, config: ConfigParams) => void): void {
        this.readConfig(correlationId, (err, config) => {
            if (err) callback(err, null);
            else {
                config = config != null ? config.getSection(section) : null;
                callback(null, config);
            }
        });
    }
}