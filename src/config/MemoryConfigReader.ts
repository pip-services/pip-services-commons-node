import { IConfigReader } from './IConfigReader';
import { ConfigParams } from './ConfigParams';
import { NameResolver } from './NameResolver';
import { IReconfigurable } from './IReconfigurable';
import { IDescriptable } from '../refer/IDescriptable';
import { Descriptor } from '../refer/Descriptor';

export class MemoryConfigReader implements IConfigReader, IDescriptable, IReconfigurable {
    protected _config: ConfigParams = new ConfigParams();
    private _name: string = null;

    public constructor(name: string = null, config: ConfigParams = null) {
        this._config = config;
        this._name = name;
    }

    public getName(): string {
        return this._name;
    }

    public setName(name: string): void {
        this._name = name;
    }

    public  getDescriptor(): Descriptor {
        return new Descriptor("pip-services-commons", "config-reader", "memory", this._name || "default", "1.0");
    }

    public configure(config: ConfigParams): void {
        this._name = NameResolver.resolve(config, this._name);
        this._config = config;
    }

    public readConfig(correlationId: string): ConfigParams {
        return new ConfigParams(this._config);
    }

    public readConfigSection(correlationId: string, section: string): ConfigParams {
        return this._config == null ? null : this._config.getSection(section);
    }
}