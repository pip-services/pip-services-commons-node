export class ReferenceQuery {	
    public constructor(locator: any, startLocator: any = null, ascending: boolean = false) {
        this.locator = locator;
        this.startLocator = startLocator;
        this.ascending = ascending;
    }

	public locator: any;
	public startLocator: any;
	public ascending: boolean;
}
