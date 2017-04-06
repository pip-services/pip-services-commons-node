import { ConfigParams } from './ConfigParams';

export class OptionResolver {
    static resolve(config: ConfigParams, configAsDefault: boolean = false): ConfigParams {
        var options = config.getSection("options");

        if (Object.keys(options).length == 0 && configAsDefault) 
            options = config;

        return options;
    }
}