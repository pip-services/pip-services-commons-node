import { ConfigParams } from './ConfigParams';

export class NameResolver {
    static resolve(config: ConfigParams, configAsDefault: boolean = true): ConfigParams {
        let options: ConfigParams = config.getSection("options");
        if(options.getCount() == 0) {
            options = config;
        }
        return options;
    }
}