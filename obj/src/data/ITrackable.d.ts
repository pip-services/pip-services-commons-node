/**
 * Interface for data objects that can track their changes including logical deletion
 */
export interface ITrackable {
    /**
     * UTC time when the object was created
     */
    createTime: Date;
    /**
     * The last time when the object was changed (created, updated or deleted)
     */
    lastChangeTime: Date;
    /**
     * The logical deletion flag
     */
    deleted: boolean;
}
