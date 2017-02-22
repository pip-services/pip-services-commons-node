import { ConfigException } from '../errors/ConfigException';

export class TypeDescriptor {
	private _name: string;
	private _library: string;
		
	public constructor(name: string, library: string) {
		this._name = name;
		this._library = library;
	}
	
	public getName(): string { 
        return this._name; 
    }
	
	public getLibrary(): string { 
        return this._library; 
    }
	
	public equals(obj: any): boolean {
		if (obj instanceof TypeDescriptor) {
			let otherType = <TypeDescriptor>obj;
			if (this.getName() == null || otherType.getName() == null)
				return false;
			if (this.getName() != otherType.getName())
				return false;
			if (this.getLibrary() == null || otherType.getLibrary() == null
				|| this.getLibrary() == otherType.getLibrary())
				return true;
		}
		
		return false;
	}
	
	public toString(): string {
		let builder = '' + this._name;
		if (this._library != null)
			builder += ',' + this._library;
		return builder.toString();
	}
	
	public static fromString(value: string): TypeDescriptor {
		if (value == null || value.length == 0) 
			return null;
				
		let tokens = value.split(",");
		if (tokens.length == 1) {
			return new TypeDescriptor(tokens[0].trim(), null);
		} else if (tokens.length == 2) {
			return new TypeDescriptor(tokens[0].trim(), tokens[1].trim());		
		} else {
			throw new ConfigException(
				null, "BAD_DESCRIPTOR", "Type descriptor " + value + " is in wrong format"
			).withDetails("descriptor", value);
		}			
	}

}
