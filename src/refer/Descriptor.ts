import { ConfigException } from '../errors/ConfigException';

/**
 * Component descriptor used to find a component by its descriptive elements:
 * <ul>
 * <li> logical group: package or other logical group of components like 'pip-services-storage-blocks'
 * <li> component type: identifies component interface like 'controller', 'services' or 'cache'
 * <li> component kind: identifies component implementation like 'memory', 'file' or 'mongodb', ...
 * <li> component name: identifies component internal content, ...
 * <li> implementation version: '1.0', '1.5' or '10.4'
 * </ul>
 */
export class Descriptor {
	private _group: string;
	private _type: string;
	private _kind: string;
	private _name: string;
	private _version: string;
	
	/**
	 * Creates instance of a component locator
	 * @param group - logical group: 'pip-services-runtime', 'pip-services-logging' 
	 * @param type - logical type: 'cache', 'services' or 'controllers'
	 * @param kind - implementation: 'memory', 'file' or 'memcached' 
	 * @param name - internal content
	 * @param version - implementation version: '1.0'. '1.5' or '10.4'
	 */
	public constructor(group: string, type: string, kind: string, name: string, version: string) {
		if ("*" == group) group = null;
		if ("*" == type) type = null;
		if ("*" == kind) kind = null;
		if ("*" == name) name = null;
		if ("*" == version) version = null;
		
		this._group = group;
		this._type = type;
		this._kind = kind;
		this._name = name;
		this._version = version;
	}

	/**
	 * Gets a component group
	 * @return a component group
	 */
	public getGroup(): string { 
		return this._group; 
	}
	
	/**
	 * Gets a component type
	 * @return a component type
	 */
	public getType(): string { 
		return this._type; 
	}
	
	/**
	 * Gets a component kind
	 * @return a component kind
	 */
	public getKind(): string { 
		return this._kind; 
	}

	/**
	 * Gets a component name
	 * @return a component name
	 */
	public getName(): string { 
		return this._name; 
	}
	
	/**
	 * Gets an implementation version
	 * @return an implementation version
	 */
	public getVersion(): string { 
		return this._version; 
	}

	private matchField(field1: string, field2: string): boolean {
		return field1 == null 
			|| field2 == null
			|| field1 == field2;
	}

	/**
	 * Matches this descriptor to another descriptor
	 * All '*' or null descriptor elements match to any other value.
	 * Specific values must match exactly.
	 * 
	 * @param descriptor - another descriptor to match this one.
	 * @return <b>true</b> if descriptors match or <b>false</b> otherwise. 
	 */
	public match(descriptor: Descriptor): boolean {
		return this.matchField(this._group, descriptor.getGroup())
			&& this.matchField(this._type, descriptor.getType())
			&& this.matchField(this._kind, descriptor.getKind())
			&& this.matchField(this._name, descriptor.getName())
			&& this.matchField(this._version, descriptor.getVersion());
	}
	
	private exactMatchField(field1: string, field2: string): boolean {
		if (field1 == null && field2 == null)
			return true;
		if (field1 == null || field2 == null)
			return false;
		return field1 == field2;
	}
	
	public exactMatch(descriptor: Descriptor): boolean {
		return this.exactMatchField(this._group, descriptor.getGroup())
			&& this.exactMatchField(this._type, descriptor.getType())
			&& this.exactMatchField(this._kind, descriptor.getKind())
			&& this.exactMatchField(this._name, descriptor.getName())
			&& this.exactMatchField(this._version, descriptor.getVersion());
	}
	
	public isComplete(): boolean {
		return this._group != null && this._type != null && this._kind != null
			&& this._name != null && this._version != null;
	}
	
	public equals(value: any): boolean {
		if (value instanceof Descriptor)
			return this.match(<Descriptor>value);
		return false;
	}
	
	public toString(): string {
		return (this._group || "*")
			+ ":" + (this._type || "*")
			+ ":" + (this._kind || "*")
			+ ":" + (this._name || "*")
			+ ":" + (this._version || "*");
	}
	
	public static fromString(value: String): Descriptor {
		if (value == null || value.length == 0) 
			return null;
				
		let tokens = value.split(":");
		if (tokens.length != 5) {
			throw new ConfigException(
				null, "BAD_DESCRIPTOR", "Descriptor " + value + " is in wrong format"
			).withDetails("descriptor", value);
		}
			
		return new Descriptor(tokens[0].trim(), tokens[1].trim(), tokens[2].trim(), tokens[3].trim(), tokens[4].trim());		
	}
}
