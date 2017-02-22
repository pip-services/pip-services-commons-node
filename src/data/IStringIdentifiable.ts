import { IIdentifiable } from './IIdentifiable';

/**
 * Interface for data objects identifiable by a string. 
 * This is the recommended way to identify objects by string GUIDs  
 */
export interface IStringIdentifiable extends IIdentifiable<string> {
}
