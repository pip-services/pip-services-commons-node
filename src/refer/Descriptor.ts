/**
 * Component descriptor used to find a component by its descriptive elements:
 * <ul>
 * <li> logical group: package or other logical group of components like 'pip-services-storage-blocks'
 * <li> component type: identifies component interface like 'controller', 'services' or 'cache'
 * <li> component id: identifies component internal content or implementation like 'memory', 'file' or 'mongodb', ...
 * <li> implementation version: '1.0', '1.5' or '10.4'
 * </ul>
 */
export class Descriptor {
	private _group: string;
	private _type: string;
	private _id: string;
	private _version: string;
	
	/**
	 * Creates instance of a component locator
	 * @param group - logical group: 'pip-services-runtime', 'pip-services-logging' 
	 * @param type - external type: 'cache', 'services' or 'controllers'
	 * @param id - internal content/implementation: 'memory', 'file' or 'memcached' 
	 * @param version - implementation version: '1.0'. '1.5' or '10.4'
	 */
	public constructor(group: string, type: string, id: string, version: string) {
		if ("*" == group) group = null;
		if ("*" == type) type = null;
		if ("*" == id) id = null;
		if ("*" == version) version = null;
		
		this._group = group;
		this._type = type;
		this._id = id;
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
	 * Gets a component id
	 * @return a component id
	 */
	public getId(): string { 
		return this._id; 
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
			&& this.matchField(this._id, descriptor.getId())
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
			&& this.exactMatchField(this._id, descriptor.getId())
			&& this.exactMatchField(this._version, descriptor.getVersion());
	}
	
	public isComplete(): boolean {
		return this._group != null && this._type != null
			&& this._id != null && this._version != null;
	}
	
	public equals(value: any): boolean {
		if (value instanceof Descriptor)
			return this.match(<Descriptor>value);
		return false;
	}
	
	public toString(): string {
		let output = "";
		output += this._group != null ? this._group : "*";
	    output += ":" + (this._type != null ? this._type : "*");
		output += ":" + (this._id != null ? this._id : "*");
		output += ":" + (this._version != null ? this._version : "*");
		return output.toString();
	}
	
	public static fromString(value: string): Descriptor {
		if (value == null || value.length == 0) 
			return null;
				
		let tokens = value.split(":");
		if (tokens.length != 4) {
            throw Error("!!!");
			// throw new ConfigException(
			// 	null, "BAD_DESCRIPTOR", "Descriptor " + value + " is in wrong format"
			// ).withDetails("descriptor", value);
		}
			
		return new Descriptor(tokens[0].trim(), tokens[1].trim(), tokens[2].trim(), tokens[3].trim());		
	}
}
