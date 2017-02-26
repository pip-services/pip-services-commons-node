import { IReferences } from './IReferences';
import { ReferenceQuery } from './ReferenceQuery';

export class ReferencesDecorator implements IReferences {

	public constructor(baseReferences: IReferences, parentReferences: IReferences) {
        this.baseReferences = baseReferences != null ? baseReferences : parentReferences;
        this.parentReferences = parentReferences != null ? parentReferences : baseReferences;
    }

	public baseReferences: IReferences;
	public parentReferences: IReferences;

	public putX(locator: any, component: any): any {
		this.baseReferences.putX(locator, component);
	}
	
	public remove(locator: any): any {
		return this.baseReferences.remove(locator);
	}

	public removeAll(locator: any): any[] {
		return this.baseReferences.removeAll(locator);
	}

    public getAll(): any[] {
		return this.baseReferences.getAll();
	}
		
    public getOneOptional<T>(locator: any): T {
    	try {
	        let components = this.find<T>(new ReferenceQuery(locator), false);
            return components.length > 0 ? components[0] : null;
    	} catch (ex) {
    		return null;
    	}
    }

    public getOneRequired<T>(locator: any): T {
        let components = this.find<T>(new ReferenceQuery(locator), true);
        return components.length > 0 ? components[0] : null;
    }

    public getOptional<T>(locator: any): T[] {
    	try {
    		return this.find<T>(new ReferenceQuery(locator), false);
    	} catch (ex) {
            return [];
    	}
    }

    public getRequired<T>(locator: any): T[] {
        return this.find<T>(new ReferenceQuery(locator), true);
    }

	public find<T>(query: ReferenceQuery, required: boolean): T[] {
		return this.baseReferences.find<T>(query, required);
    }

}
