let fs = require('fs');

import { ConfigParams } from './ConfigParams';
import { IConfigurable } from './IConfigurable';
import { FileConfigReader } from './FileConfigReader';
import { ConfigException } from '../errors/ConfigException'
import { FileException } from '../errors/FileException'
import { JsonConverter } from '../convert/JsonConverter'

/**
 * Provides functions for reading configuration parameters that are stored in 
 * JSON format from a file located at 'path'.
 * 
 * @see FileConfigReader
 */
export class JsonConfigReader extends FileConfigReader {

    /**
     * 
     * @param path path to file containing configuration in JSON format.
     */
    public constructor(path: string = null) {
        super(path);
    }

    public readObject(correlationId: string, parameters: ConfigParams): any {
        if (super.getPath() == null)
            throw new ConfigException(correlationId, "NO_PATH", "Missing config file path");

        try {
            // Todo: make this async?
            let data: string = fs.readFileSync(super.getPath(), "utf8");
            data = this.parameterize(data, parameters);
            return JsonConverter.toNullableMap(data);
        } catch (e) {
            throw new FileException(
                correlationId,
                "READ_FAILED",
                "Failed reading configuration " + super.getPath() + ": " + e
            )
            .withDetails("path", super.getPath())
            .withCause(e);
        }
    }

    public readConfig(correlationId: string, parameters: ConfigParams,
        callback: (err: any, config: ConfigParams) => void): void {
        try {
            let value: any = this.readObject(correlationId, parameters);
            let config = ConfigParams.fromValue(value);
            callback(null, config);
        } catch (ex) {
            callback(ex, null);
        }
    }

    public static readObject(correlationId: string, path: string, parameters: ConfigParams): void {
        return new JsonConfigReader(path).readObject(correlationId, parameters);
    }

    public static readConfig(correlationId: string, path: string, parameters: ConfigParams): ConfigParams {
        let value: any = new JsonConfigReader(path).readObject(correlationId, parameters);
        let config = ConfigParams.fromValue(value);
        return config;
    }
}