import { StringConverter } from '../convert/StringConverter';
import { ConfigParams } from '../config/ConfigParams';
import { IReconfigurable } from '../config/IReconfigurable';
import { IReferenceable } from './IReferenceable';
import { IReferences } from './IReferences';
import { ReferenceException } from './ReferenceException';
import { Descriptor } from './Descriptor';

export class DependencyResolver implements IReferenceable, IReconfigurable {
	private _dependencies: any = {};
	private _references: IReferences;
	
	public constructor(config?: ConfigParams, references?: IReferences) {
		if (config != null)
			this.configure(config);
		if (references != null)
			this.setReferences(references);
	}

	public configure(config: ConfigParams): void {
		let dependencies = config.getSection("dependencies");
        let names = dependencies.getKeys();
		for (let index = 0; index < names.length; index++) {
            let name = names[index];
			let locator = dependencies.get(name);
			if (locator == null) continue;
			
			try {
				let descriptor = Descriptor.fromString(locator);
				if (descriptor != null)
					this._dependencies[name] = descriptor;
				else
					this._dependencies[name] = locator;
			} catch (ex) {
				this._dependencies[name] = locator;
			}
		}
	}

	public setReferences(references: IReferences): void {
		this._references = references;
	}

	public put(name: string, locator: any): void {
		this._dependencies[name] = locator;
	}

	private locate(name: string): any {
		if (name == null)
			throw new Error("Dependency name cannot be null");
		if (this._references == null)
			throw new Error("References shall be set");
		
		return this._dependencies[name];
	}
	
	/**
	 * Gets a list of component references that match provided locator
	 * @param name a dependency name
	 * @return a list with found component references
	 */
	public getOptional<T>(name: string): T[] {
		let locator = this.locate(name);		
		return locator != null ? this._references.getOptional<T>(locator) : null;
	}

	/**
	 * Gets a list of component references that match provided locator.
	 * If no references found an exception is thrown
	 * @param name a dependency name
	 * @return a list with found component references
	 * @throws ReferenceException when no single component reference is found 
	 */
	public getRequired<T>(name: string): T[] {
		let locator = this.locate(name);
		if (locator == null)
			throw new ReferenceException(null, name);
		
		return this._references.getRequired<T>(locator);
	}

	/**
	 * Gets a component references that matches provided locator.
	 * The search is performed from latest added references.
	 * @param name a dependency name
	 * @return a found component reference or <code>null</code> if nothing was found
	 */
	public getOneOptional<T>(name: string): T {
		let locator = this.locate(name);
		return locator != null ? this._references.getOneOptional<T>(locator) : null;
	}

	/**
	 * Gets a component references that matches provided locator.
	 * The search is performed from latest added references.
	 * @param name a dependency name
	 * @return a found component reference
	 * @throws ReferenceException when requested component wasn't found
	 */
	public getOneRequired<T>(name: string): T {
		let locator = this.locate(name);
		if (locator == null)
			throw new ReferenceException(null, name);
		
		return this._references.getOneRequired<T>(locator);
	}

	/**
	 * Find all references by specified query criteria
	 * @param name a dependency name
	 * @param required force to raise exception is no reference is found
	 * @return list of found references
	 * @throws ReferenceException when requested component wasn't found
	 */
	public find<T>(name: string, required: boolean): T[] {
		if (name == null)
			throw new Error("Name cannot be null");
		
		let locator = this.locate(name);
		if (locator == null) {
			if (required)
				throw new ReferenceException(null, name);
			return null;
		}
		
		return this._references.find<T>(locator, required);
	}
	
	public static fromTuples(...tuples: any[]): DependencyResolver {
		let result = new DependencyResolver();
    	if (tuples == null || tuples.length == 0)
    		return result;
    	
        for (let index = 0; index < tuples.length; index += 2) {
            if (index + 1 >= tuples.length) break;

            let name = StringConverter.toString(tuples[index]);
            let locator = tuples[index + 1];

            result.put(name, locator);
        }
        
        return result;
	}
}
