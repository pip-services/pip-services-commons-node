let _ = require('lodash');
let handlebars = require('handlebars');

import { ConfigParams } from './ConfigParams';
import { IConfigurable } from './IConfigurable'

/**
 * Abstract class that can be implemented for creating various ConfigReaders. 
 * ConfigReader implements {@link IConfigurable} and can be configured using
 * {@link ConfigParams}. The ConfigParams in the section named "parameters"
 * is saved to "_parameters" upon configuration.
 * 
 * @see IConfigReader
 * @see IConfigurable
 * @see ConfigParams
 */
export abstract class ConfigReader implements IConfigurable {
    private _parameters: ConfigParams = new ConfigParams();

    public constructor() {}

    /**
     * 
     * @param config    ConfigParams containing a section named "parameters", which will be saved to the "_parameters" field of this class.
     */
    public configure(config: ConfigParams): void {
        let parameters = config.getSection("parameters")
        if (parameters.length() > 0)
            this._parameters = parameters;
    }    

    /**
     * Abstract method that will contain the logic of reading and parsing ConfigParams 
     * in classes that implement this abstract class.
     * 
     * @param correlationId     links exceptions that could be raised to business transactions.
     * @param parameters        ConfigParams to read.
     * @param callback          filter lambda function
     */
    public abstract readConfig(correlationId: string, parameters: ConfigParams,
        callback: (err: any, config: ConfigParams) => void): void;

    /**
     * Protected method for overridding the '_parameters' field of this class.
     * 
     * @param config        string to be used for handlebars template compilation.
     * @param parameters    ConfigParams that will be used to overridding the 
     *                      '_parameters' field of this class.
     */
    protected parameterize(config: string, parameters: ConfigParams): string {
        parameters = this._parameters.override(parameters);

        // Convert template to lodash
        //config = config.replace(/{{/g, "<%=").replace(/}}/g, "%>");
        //let template = _.template(config);
        //return template(parameters);

        // return mustache.render(config, parameters);
        
        let template = handlebars.compile(config);
        return template(parameters);
    }

}