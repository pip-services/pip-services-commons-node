import { ConfigParams } from './ConfigParams';
import { ConfigReader } from './ConfigReader'

export abstract class FileConfigReader extends ConfigReader {
    private _path: string;

    public constructor(path: string = null) {
        super();
        this._path = path;
    }

    public getPath(): string {
        return this._path;
    }

    public setPath(path: string) {
        this._path = path;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._path = config.getAsStringWithDefault("path", this._path);
    }    

}