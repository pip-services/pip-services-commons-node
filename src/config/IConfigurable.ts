import { ConfigParams } from './ConfigParams';

/**
 * Configurable interface that contains the {@link #configure} method. If an object 
 * needs to be configurable, it can implement this interface and parse the 
 * ConfigParams that 'configure' receives as a parameter. 
 * 
 * @see ConfigParams
 */
export interface IConfigurable {

    /**
     * Abstract method for configuring objects using ConfigParams. Once a component 
     * is configured, it will be switched to the 'Configured' state.
     * 
     * @param config    ConfigParams to use for object configuration.
     */
    configure(config: ConfigParams): void;
}