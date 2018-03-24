import { Reference } from './Reference';
import { IReferences } from './IReferences';
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
	
	            this.put(tuples[index], tuples[index + 1]);
	        }
		}
	}
	
	public put(locator: any, component: any): void {
		if (component == null)
			throw new Error("Component cannot be null");

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

	public getAllLocators(): any[] {
        let locators: any[] = [];
		
        for (let index = 0; index < this._references.length; index++) {
            let reference = this._references[index];
            locators.push(reference.getLocator());
        }
		
		return locators;
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
	        let components = this.find<T>(locator, false);
            return components.length > 0 ? components[0] : null;
    	} catch (ex) {
    		return null;
    	}
    }

    public getOneRequired<T>(locator: any): T {
        let components = this.find<T>(locator, true);
        return components.length > 0 ? components[0] : null;
    }

    public getOptional<T>(locator: any): T[] {
    	try {
    		return this.find<T>(locator, false);
    	} catch (ex) {
            return [];
    	}
    }

    public getRequired<T>(locator: any): T[] {
        return this.find<T>(locator, true);
    }

	public find<T>(locator: any, required: boolean): T[] {
		if (locator == null)
			throw new Error("Locator cannot be null");

        let components: T[] = [];

        // Search all references
        for (let index = this._references.length - 1; index >= 0; index--) {
            let reference = this._references[index];
            if (reference.match(locator)) {
                let component = reference.getComponent();
                components.push(component);
            }
        }

        if (components.length == 0 && required)
            throw new ReferenceException(null, locator);

        return components;
    }

	public static fromTuples(...tuples: any[]): References {
		return new References(tuples);
	}
}