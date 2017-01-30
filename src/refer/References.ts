import { Reference } from './Reference';
import { IReferences } from './IReferences';
import { ReferenceQuery } from './ReferenceQuery';
import { ReferenceException } from './ReferenceException';

/**
 * Basic implementation of IReferences that stores component as a flat list
 */
export class References implements IReferences {	
	protected _references: Reference[] = [];
	
	public constructor(components: any[] = null) {
		if (components != null) {
			for (let index = 0; index < components.length; index++)
				this.put(components[index]);
		}
	}
	
	public put(component: any, locator: any = null): void {
		if (component == null)
			throw new Error("Reference cannot be null");

        if (locator != null)
			this._references.push(new Reference(component, locator));
        else if (component instanceof Reference)
            this._references.push(component);
        else
            this._references.push(new Reference(null, null, component));
	}
	
	public putAll(...components: any[]): void {
		for (let index = 0; index < components.length; index++)
			this.put(components[index]);
	}

	public remove(locator: any): any {
		if (locator == null) return null;

        for (let index = this._references.length - 1; index >= 0; index--) {
            let reference = this._references[index];
            if (reference.locate(locator)) {
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
            if (reference.locate(locator)) {
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
                if (reference.locate(query.startLocator))
                    break;
                index += query.ascending ? 1 : -1;
            }
        }

        // Search all references
        while (index >= 0 && index < this._references.length) {
            let reference = this._references[index];
            if (reference.locate(query.locator)) {
                let component = reference.getComponent();
                components.push(component);
            }
            index += query.ascending ? 1 : -1;
        }

        if (components.length == 0 && required)
            throw new ReferenceException(null, query.locator);

        return components;
    }

	
	public static fromList(...components: any[]): References {
		let result = new References();
		for (let index = 0; index < components.length; index++)
			result.put(components[index]);
		return result;
	}
}