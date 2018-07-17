import { ConfigParams } from './ConfigParams';

/**
 * Interface that can be implemented by classes that need to read ConfigParams from a certain
 * source. Contains the abstract method {@link #readConfig}, which, upon implementation, should contain 
 * the logic necessary for reading and parsing ConfigParams.
 * 
 * @see ConfigReader
 */
export interface IConfigReader {
    
    /**
     * Abstract method that will contain the logic of reading and parsing ConfigParams 
     * in classes that implement this abstract class.
     * 
     * @param correlationId     links exceptions that could be raised to business transactions.
     * @param parameters        ConfigParams to read.
     * @param callback          resulting value or exception will be returned in the callback.
     */
    readConfig(correlationId: string, parameters: ConfigParams, 
        callback: (err: any, config: ConfigParams) => void): void;
}