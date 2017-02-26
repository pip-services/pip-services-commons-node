import { Reference } from './Reference';
import { IReferences } from './IReferences';
import { ReferenceQuery } from './ReferenceQuery';
import { ReferenceException } from './ReferenceException';

/**
 * Basic implementation of IReferences that stores component as a flat list
 */
export class References implements IReferences {	
	protected _references: Reference[] = [];
	
	public constructor(tuples: any[] = null) {
		if (tuples != null) {
	        for (let index = 0; index < tuples.length; index += 2) {
	            if (index + 1 >= tuples.length) break;
	
	            this.putX(tuples[index], tuples[index + 1]);
	        }
		}
	}
	
	public putX(locator: any, component: any): void {
		if (component == null)
			throw new Error("Reference cannot be null");

        this._references.push(new Reference(locator, component));
	}
	
	public remove(locator: any): any {
		if (locator == null) return null;

        for (let index = this._references.length - 1; index >= 0; index--) {
            let reference = this._references[index];
            if (reference.match(locator)) {
                this._references.splice(index, 1);
                return reference.getComponent();
            }
        }
		
		return null;
	}

	public removeAll(locator: any): any[] {
        let components: any[] = [];
		
		if (locator == null) return components;

        for (let index = this._references.length - 1; index >= 0; index--) {
            let reference = this._references[index];
            if (reference.match(locator)) {
                this._references.splice(index, 1);
                components.push(reference.getComponent());
            }
        }
		
		return components;
	}

	public getAll(): any[] {
        let components: any[] = [];
		
        for (let index = 0; index < this._references.length; index++) {
            let reference = this._references[index];
            components.push(reference.getComponent());
        }
		
		return components;
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
        if (query == null)
            throw new Error("Query cannot be null");

        let components: T[] = [];

        let index = query.ascending ? 0 : this._references.length - 1;

        // Locate the start
        if (query.startLocator != null) {
            while (index >= 0 && index < this._references.length) {
                let reference = this._references[index];
                if (reference.match(query.startLocator))
                    break;
                index += query.ascending ? 1 : -1;
            }
        }

        // Search all references
        while (index >= 0 && index < this._references.length) {
            let reference = this._references[index];
            if (reference.match(query.locator)) {
                let component = reference.getComponent();
                components.push(component);
            }
            index += query.ascending ? 1 : -1;
        }

        if (components.length == 0 && required)
            throw new ReferenceException(null, query.locator);

        return components;
    }

	
	public static fromTuples(...tuples: any[]): References {
		return new References(tuples);
	}
}