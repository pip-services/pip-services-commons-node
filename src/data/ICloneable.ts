/**
 * Interface for data objects that are cloneable.
 */
export interface ICloneable {
	/** Abstract method that will contain logic for cloning objects of this type. */
	clone(): any;
}
