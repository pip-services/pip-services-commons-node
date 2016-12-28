import { ConfigParams } from './ConfigParams';
export interface IConfigReader {
    readConfig(correlationId: string): ConfigParams;
    readConfigSection(correlationId: string, section: string): ConfigParams;
}
