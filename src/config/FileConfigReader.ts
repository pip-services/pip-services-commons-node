import { ConfigParams } from './ConfigParams';
import { ConfigReader } from './ConfigReader'

/**
 * Abstract class that can be implemented for creating various FileConfigReaders, which
 * read configuration parameters from the file located at '_path'. 
 * 
 * This class is abstract because it inherits the abstract function 
 * {@link ConfigReader#readConfig}
 * 
 * @see ConfigReader#readConfig
 */
export abstract class FileConfigReader extends ConfigReader {
    private _path: string;

    /**
     * @param path path to the file containing configuration parameters.
     */
    public constructor(path: string = null) {
        super();
        this._path = path;
    }

    /**
     * @returns path to the file containing configuration parameters.
     */
    public getPath(): string {
        return this._path;
    }

    /**
     * @param path path to the file containing configuration parameters.
     */
    public setPath(path: string) {
        this._path = path;
    }

    /**
     * @param config    configures this class in accordance with ConfigReader's 
     *                  configure function and sets this class's '_path' field
     *                  in accordance with the configuration parameter named "path".
     * @see ConfigReader#configure
     */
    public configure(config: ConfigParams): void {
        super.configure(config);
        this._path = config.getAsStringWithDefault("path", this._path);
    }    

}