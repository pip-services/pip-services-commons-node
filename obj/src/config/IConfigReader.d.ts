import { ConfigParams } from './ConfigParams';
export interface IConfigReader {
    readConfig(correlationId: string, parameters: ConfigParams, callback: (err: any, config: ConfigParams) => void): void;
}
