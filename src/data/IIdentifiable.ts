/**
 * Interface for data objects that can be identified by an id.
 */
export interface IIdentifiable<K> {
	/** The unique object identifier of type K. */
	id: K;
}
