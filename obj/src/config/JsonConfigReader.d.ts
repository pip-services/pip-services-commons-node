import { ConfigParams } from './ConfigParams';
import { FileConfigReader } from './FileConfigReader';
export declare class JsonConfigReader extends FileConfigReader {
    constructor(path?: string);
    readObject(correlationId: string, parameters: ConfigParams): any;
    readConfig(correlationId: string, parameters: ConfigParams, callback: (err: any, config: ConfigParams) => void): void;
    static readObject(correlationId: string, path: string, parameters: ConfigParams): void;
    static readConfig(correlationId: string, path: string, parameters: ConfigParams): ConfigParams;
}
