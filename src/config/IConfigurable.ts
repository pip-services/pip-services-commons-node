import { ConfigParams } from './ConfigParams';

export interface IConfigurable {
    configure(config: ConfigParams): void;
}