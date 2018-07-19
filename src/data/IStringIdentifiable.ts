import { IIdentifiable } from './IIdentifiable';

/**
 * Interface for data objects that are identifiable by a string. 
 * This is the recommended way to identify objects by string GUIDs.
 * 
 * @see IIdentifiable
 * @see IdGenerator
 */
export interface IStringIdentifiable extends IIdentifiable<string> {
	/** The object's unique string id. */
	id: string;
}
