import { ConfigParams } from './ConfigParams';

/**
 * Interface that allows implementing classes to be configured using ConfigParams.
 * @see ConfigParams
 */
export interface IConfigurable {
    configure(config: ConfigParams): void;
}