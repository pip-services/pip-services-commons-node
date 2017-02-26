import { ConfigParams } from './ConfigParams';
import { CachedConfigReader } from './CachedConfigReader';
import { IConfigurable } from './IConfigurable'

export abstract class FileConfigReader extends CachedConfigReader implements IConfigurable {
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
        this._path = config.getAsString("path");
    }    
}