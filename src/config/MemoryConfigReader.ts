let _ = require('lodash');

import { IConfigReader } from './IConfigReader';
import { ConfigParams } from './ConfigParams';
import { IReconfigurable } from './IReconfigurable';

/**
 * Provides functions for reading configuration parameters that are stored in memory.
 */
export class MemoryConfigReader implements IConfigReader, IReconfigurable {
    protected _config: ConfigParams = new ConfigParams();

    public constructor(config: ConfigParams = null) {
        this._config = config;
    }

    public configure(config: ConfigParams): void {
        this._config = config;
    }

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