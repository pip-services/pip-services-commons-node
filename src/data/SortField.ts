/**
 * Class that defines a field by which values can be sorted. A sort field contains a
 * string field 'name' and a boolean field 'ascending'.
 */
export class SortField {	
	private name: string;
	private ascending: boolean;

	/**
	 * @param name 			the name of the field to sort by.
	 * @param ascending 	boolean value indicating whether the values should
	 * 						be sorted in ascending (true) or descending (false) order 
	 */
	public constructor(name: string = null, ascending: boolean = true) {
		this.name = name;
		this.ascending = ascending;
	}
}
