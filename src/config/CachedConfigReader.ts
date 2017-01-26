import { IConfigReader } from './IConfigReader';
import { IReconfigurable } from './IReconfigurable';
import { ConfigParams } from './ConfigParams';
import { NameResolver } from './NameResolver';

export abstract class CachedConfigReader implements IConfigReader, IReconfigurable {

    private _lastRead: number = 0;
    private _name: string = null;
    private _timeout: number = 60000;
    private _config: ConfigParams = null;

    public constructor(name: string = null) {
        this._name = name;
    }

    public getName(): string {
        return this._name;
    }

    public setName(name: string) {
        this._name = name;
    }

    public getTimeout(): number {
        return this._timeout;
    }

    public setTimeout(timeout: number) {
        this._timeout = timeout;
    }

    public configure(config: ConfigParams): void {
        this._name = NameResolver.resolve(config, this._name);
        this._timeout = config.getAsLongWithDefault("timeout", this._timeout);
    }

    protected abstract performReadConfig(correlationId: string): ConfigParams;

    public readConfig(correlationId: string): ConfigParams {

        let timestamp: number = new Date().getTime();

        if(this._config != null && timestamp < this._lastRead + this._timeout) {
            return this._config;
        }

        this._config = this.performReadConfig(correlationId);
        this._lastRead = timestamp;

        return this._config;
    }

    public readConfigSection(correlationId: string, section: string): ConfigParams {
        let config: ConfigParams = this.readConfig(correlationId);
        return config != null ? config.getSection(section) : null;
    }
}