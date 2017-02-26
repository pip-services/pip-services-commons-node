import { ConfigParams } from './ConfigParams';
import { FileConfigReader } from './FileConfigReader';
export declare class JsonConfigReader extends FileConfigReader {
    constructor(path?: string);
    readObject(correlationId: string): any;
    protected performReadConfig(correlationId: string): ConfigParams;
    static readObject(correlationId: string, path: string): void;
    static readConfig(correlationId: string, path: string): ConfigParams;
}
