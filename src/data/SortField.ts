export class SortField {	
	public constructor(name: string = null, ascending: boolean = true) {
		this.name = name;
		this.ascending = ascending;
	}

	private name: string;
	private ascending: boolean;
}
