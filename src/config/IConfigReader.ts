import { ConfigParams } from './ConfigParams';

/**
 * Interface that can be implemented for creating various ConfigReaders. 
 * Contains abstract method readConfig that will contain the logic of reading 
 * and parsing ConfigParams in classes that implement this interface.
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
     * @param callback          filter lambda function
     */
    readConfig(correlationId: string, parameters: ConfigParams, 
        callback: (err: any, config: ConfigParams) => void): void;
}