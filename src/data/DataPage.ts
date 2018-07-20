/**
 * Class that is used by standard design patterns, which work with data paging.
 * A data page contains a list of items that are of type T (the data), as well as 
 * their total amount (the total).
 */
export class DataPage<T> {
    /** The total amount of items in the data page. */
    public total: number;
    /** The list of items that are contained in this data page. */
    public data: T[];

    /**
     * Creates a new DataPage object with 'total' items of type T in its 'data' field.
     * If 'data' and/or 'total' are omitted, they can be set using:
     *     
     *     thisDataPage.data = ...;
     *     thisDataPage.total = ...;
     * 
     * @param data      the list of items of type T to include in this data page.
     * @param total     the total amount of items in this data page's data.
     */
    public constructor(data: T[] = null, total: number = null) {
		this.total = total;
		this.data = data;
    }
}
