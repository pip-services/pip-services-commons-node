import { IChangeable } from './IChangeable';
/**
 * Interface for data objects that can track their changes including logical deletion
 */
export interface ITrackable extends IChangeable {
    /**
     * UTC time when the object was created
     */
    create_time: Date;
    /**
     * The last time when the object was changed (created, updated or deleted)
     */
    change_time: Date;
    /**
     * The logical deletion flag
     */
    deleted: boolean;
}
