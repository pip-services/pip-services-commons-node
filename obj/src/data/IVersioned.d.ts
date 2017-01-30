/**
 * Interface for versioned data object with optimistic concurrency resolution.
 * The version can be any string with only requirement to be higher comparing the the previous version.
 * When generated automatically it represents a timestamp string.
 */
export interface IVersioned {
    /**
     * The object version
     */
    version: string;
}
