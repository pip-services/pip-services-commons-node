let fs = require('fs');
let yaml = require('js-yaml');

import { ConfigParams } from './ConfigParams';
import { IConfigurable } from './IConfigurable';
import { FileConfigReader } from './FileConfigReader';
import { ConfigException } from '../errors/ConfigException'
import { FileException } from '../errors/FileException'
import { JsonConverter } from '../convert/JsonConverter'

 /**
 * Provides methods for reading configuration parameters from a YAML file.
 * 
 * @see FileConfigReader
 */
export class YamlConfigReader extends FileConfigReader {

    /** 
     * @param path (optional) path to the target file containing configuration parameters in YAML format. 
     *              If 'path' is omitted in the constructor, then it must be set otherwise 
     *              (for example, using "setPath()") before using the new object.
     * 
     * @see FileConfigReader
     * @see FileConfigReader#setPath
     */
    public constructor(path: string = null) {
        super(path);
    }

    /**
     * Reads the YAML data from the file and returns it as a parameterized {@link NullableMap} object. 
     * Reader's path must be set.
     * 
     * @param correlationId     unique id to correlate across all request flows.
     * @param parameters        used to parameterize the reader.
     * @returns                 NullableMap with data from the YAML file.
     * 
     * @see ConfigReader#parameterize
     * @see NullableMap
     */
    public readObject(correlationId: string, parameters: ConfigParams): any {
        if (super.getPath() == null)
            throw new ConfigException(correlationId, "NO_PATH", "Missing config file path");

        try {
            // Todo: make this async?
            let content = fs.readFileSync(super.getPath(), 'utf8');
            content = this.parameterize(content, parameters);
            let data = yaml.safeLoad(content);
            return data;
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
    
    /**
     * Reads the YAML data from the file and returns it as a parameterized {@link ConfigParams} object. 
     * Reader's path must be set.
     * 
     * @param correlationId     unique id to correlate across all request flows.
     * @param parameters        used to parameterize the reader.
     * @param callback          resulting value or exception will be returned in the callback.
     * 
     * @see #readObject(correlationId: string, parameters: ConfigParams)
     */
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

    /**
     * Static implementation of YamlConfigReader's non-static {@link #readObject}.
     * 
     * @param correlationId     unique id to correlate across all request flows.
     * @param path              location of the target YAML file.
     * @param parameters        used to parameterize the reader.
     * 
     * @see #readObject(correlationId: string, parameters: ConfigParams)
     */
    public static readObject(correlationId: string, path: string, parameters: ConfigParams): void {
        return new YamlConfigReader(path).readObject(correlationId, parameters);
    }

    /**
     * Static implementation of YamlConfigReader's non-static {@link #readConfig}.
     * 
     * @param correlationId     unique id to correlate across all request flows.
     * @param path              location of the target YAML file.
     * @param parameters        used to parameterize the reader.
     * 
     * @see #readConfig(correlationId: string, parameters: ConfigParams, callback: (err: any, config: ConfigParams) => void)
     */
    public static readConfig(correlationId: string, path: string, parameters: ConfigParams): ConfigParams {
        let value: any = new YamlConfigReader(path).readObject(correlationId, parameters);
        let config = ConfigParams.fromValue(value);
        return config;
    }
}