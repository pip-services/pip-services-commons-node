let _ = require('lodash');
let mustache = require('mustache');

import { ConfigParams } from './ConfigParams';
import { IConfigurable } from './IConfigurable'

export abstract class ConfigReader implements IConfigurable {
    private _parameters: ConfigParams = new ConfigParams();

    public constructor() {}

    public configure(config: ConfigParams): void {
        let parameters = config.getSection("parameters")
        if (parameters.length() > 0)
            this._parameters = parameters;
    }    

    public abstract readConfig(correlationId: string, parameters: ConfigParams,
        callback: (err: any, config: ConfigParams) => void): void;

    protected parameterize(config: string, parameters: ConfigParams): string {
        parameters = this._parameters.override(parameters);

        // Convert template to lodash
        //config = config.replace(/{{/g, "<%=").replace(/}}/g, "%>");
        //let template = _.template(config);
        //return template(parameters);

        return mustache.render(config, parameters);
    }

}