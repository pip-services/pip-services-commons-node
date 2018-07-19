/**
 * Interface for data objects that can track their changes.
 */
export interface IChangeable {
	/** The UTC time at which the object was last changed (created or updated). */
	change_time: Date;
}
