import { ConfigParams } from './ConfigParams';
import { IConfigurable } from './IConfigurable';
export declare abstract class ConfigReader implements IConfigurable {
    private _parameters;
    constructor();
    configure(config: ConfigParams): void;
    abstract readConfig(correlationId: string, parameters: ConfigParams, callback: (err: any, config: ConfigParams) => void): void;
    protected parameterize(config: string, parameters: ConfigParams): string;
}
