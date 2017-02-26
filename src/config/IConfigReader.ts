import { ConfigParams } from './ConfigParams';

export interface IConfigReader {
    readConfig(correlationId: string, callback: (err: any, config: ConfigParams) => void): void;
    readConfigSection(correlationId: string, section: string, callback: (err: any, config: ConfigParams) => void): void;
}