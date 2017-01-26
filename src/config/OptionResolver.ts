import { ConfigParams } from './ConfigParams';

export class OptionResolver {
    static resolve(config: ConfigParams, configAsDefault: boolean = true): ConfigParams {
        var options = config.getSection("options");

        if (Object.keys(options).length == 0) {
            options = config;
        }

        return options;
    }
}