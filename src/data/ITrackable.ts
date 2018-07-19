import { IChangeable } from './IChangeable';

/**
 * Interface for data objects that can track their changes, including logical deletion.
 * 
 * @see IChangeable
 */
export interface ITrackable extends IChangeable {
	/** The UTC time at which the object was created. */
	create_time: Date;
	
	/** The UTC time at which the object was last changed (created, updated, or deleted). */
	change_time: Date;

	/** The logical deletion flag. */
	deleted: boolean;
}
