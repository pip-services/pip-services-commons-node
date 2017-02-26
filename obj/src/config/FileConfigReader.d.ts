import { ConfigParams } from './ConfigParams';
import { CachedConfigReader } from './CachedConfigReader';
import { IConfigurable } from './IConfigurable';
export declare abstract class FileConfigReader extends CachedConfigReader implements IConfigurable {
    private _path;
    constructor(path?: string);
    getPath(): string;
    setPath(path: string): void;
    configure(config: ConfigParams): void;
}
