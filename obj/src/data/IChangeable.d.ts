/**
 * Interface for data objects that can track their changes including logical deletion
 */
export interface IChangeable {
    /**
     * The last time when the object was changed (created, or updated)
     */
    change_time: Date;
}
