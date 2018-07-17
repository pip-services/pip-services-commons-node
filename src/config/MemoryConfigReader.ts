let _ = require('lodash');

import { IConfigReader } from './IConfigReader';
import { ConfigParams } from './ConfigParams';
import { IReconfigurable } from './IReconfigurable';

/**
 * Provides methods for reading configuration parameters that are stored in memory (as ConfigParams objects).
 */
export class MemoryConfigReader implements IConfigReader, IReconfigurable {
    protected _config: ConfigParams = new ConfigParams();

    /**
     * @param config    (optional) ConfigParams to use in this MemoryConfigReader. 
     *                  If 'config' is omitted in the constructor, then it must be set 
     *                  using {@link #configure} prior to using the new object.
     * 
     * @see #configure
     */
    public constructor(config: ConfigParams = null) {
        this._config = config;
    }

    /**
     * Sets the ConfigParams that are to be used by this MemoryConfigReader.
     * 
     * @param config    ConfigParams to save in memory.
     */
    public configure(config: ConfigParams): void {
        this._config = config;
    }

    /**
     * Reads the ConfigParams stored in this object and returns them as a parameterized 
     * {@link ConfigParams} object. Reader's ConfigParams must be set.
     * 
     * @param correlationId     unique id to correlate across all request flows.
     * @param parameters        used to parameterize the reader.
     * @param callback          resulting value or exception will be returned in the callback.
     * 
     * @see #readObject(correlationId: string, parameters: ConfigParams)
     */
    public readConfig(correlationId: string, parameters: ConfigParams,
        callback: (err: any, config: ConfigParams) => void): void {
        if (parameters != null) {
            let config = new ConfigParams(this._config).toString();
            let template = _.template(config);
            config = template(parameters);
            callback(null, ConfigParams.fromString(config));
        } else {
            let config = new ConfigParams(this._config);;
            callback(null, config);
        }
    }

}