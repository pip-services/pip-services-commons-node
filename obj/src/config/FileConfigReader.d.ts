import { ConfigParams } from './ConfigParams';
import { ConfigReader } from './ConfigReader';
export declare abstract class FileConfigReader extends ConfigReader {
    private _path;
    constructor(path?: string);
    getPath(): string;
    setPath(path: string): void;
    configure(config: ConfigParams): void;
}
