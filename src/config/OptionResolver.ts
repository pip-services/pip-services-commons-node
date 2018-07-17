import { ConfigParams } from './ConfigParams';

/**
 * Contains the static method {@link #resolve}, which can be used for resolving 
 * the options of a ConfigParams configuration.
 */
export class OptionResolver {

    /**
     * Static method for resolving the options of a ConfigParams object. The configuration's options are 
     * searched for in the section named "options" in the {@link ConfigParams} object. If no options are found
     * and 'configAsDefault' is set to true, then 'config' will be returned.
     * 
     * @param config            ConfigParams, whose options are to be resolved.
     * @param configAsDefault   (optional) Defines whether 'config' should be returned if no options are found. 
     *                          Default to false if omitted.
     * @returns                 resolved options or 'config' (if none were found and 'configAsDefault' 
     *                          was set to true).
     */
    static resolve(config: ConfigParams, configAsDefault: boolean = false): ConfigParams {
        var options = config.getSection("options");

        if (Object.keys(options).length == 0 && configAsDefault) 
            options = config;

        return options;
    }
}