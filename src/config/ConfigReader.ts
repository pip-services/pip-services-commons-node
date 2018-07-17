let _ = require('lodash');
let handlebars = require('handlebars');

import { ConfigParams } from './ConfigParams';
import { IConfigurable } from './IConfigurable'

/**
 * Combination of the {@link IConfigReader} and {@link IConfigurable} interfaces. Allows for object 
 * configuration using {@link ConfigParams} via the 'configure' function, and contains the abstract 
 * function 'readConfig', which, upon implementation, should contain the logic necessary for reading 
 * and parsing ConfigParams. Also contains the 'parameterize' function.
 * 
 * @see IConfigReader
 * @see IConfigurable
 * @see ConfigParams
 */
export abstract class ConfigReader implements IConfigurable {
    private _parameters: ConfigParams = new ConfigParams();

    public constructor() {}

    /**
     * Configure this object using ConfigParams.
     * 
     * @param config    ConfigParams that contain a section named "parameters", 
     *                  which will be saved to the "_parameters" field of this class.
     * 
     * @see IConfigurable
     * @see ConfigParams
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
     * @param callback          value or exception that is returned.
     */
    public abstract readConfig(correlationId: string, parameters: ConfigParams,
        callback: (err: any, config: ConfigParams) => void): void;

    /**
     * Protected method for parameterizing this object by overridding the '_parameters' field.
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