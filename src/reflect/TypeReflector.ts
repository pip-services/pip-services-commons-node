let _ = require('lodash');
let path = require("path");

import { TypeDescriptor } from './TypeDescriptor';
import { NotFoundException } from '../errors/NotFoundException';
import { UnsupportedException } from '../errors/UnsupportedException';
import { TypeCode } from '../convert/TypeCode';
import { TypeConverter } from '../convert/TypeConverter';

export class TypeReflector {

	public static getType(name: string, library: string): any {
		try {
			if (!library)
				library = name;

			let absPath = library;
			if (_.startsWith(absPath, '.'))
				absPath = path.resolve(absPath)

	        // Load module
            let type = require(absPath);
            if (type == null) return null;

            // Get exported type by name
            if (name != null && name.length > 0)
                type = type[name];

            return type;
	    } catch (ex) {
	    	return null;
	    }
	}

	public static getTypeByDescriptor(type: TypeDescriptor): any {
		if (type == null)
			throw new Error("Type descriptor cannot be null");
			
		return TypeReflector.getType(type.getName(), type.getLibrary());
	}

	public static createInstanceByType(type: any, ...args: any[]): any {
        if (type == null)
            throw new Error("Type constructor cannot be null");
        if (!_.isFunction(type))
            throw new Error("Type contructor has to be a function");

        return new type(...args);
	}

	public static createInstance(name: string, library: string, ...args: any[]): any {
		let type = TypeReflector.getType(name, library);		
		if (type == null)
			throw new NotFoundException(null, "TYPE_NOT_FOUND", "Type " + name + "," + library + " was not found")
				.withDetails("type", name).withDetails("library", library);
		
		return TypeReflector.createInstanceByType(type, ...args);
	}

	public static createInstanceByDescriptor(type: TypeDescriptor, ...args: any[]): any {
		if (type == null)
			throw new Error("Type descriptor cannot be null");

		return TypeReflector.createInstance(type.getName(), type.getLibrary(), ...args);
	}

	public static isPrimitive(value: any): boolean {
		let typeCode = TypeConverter.toTypeCode(value);
		return typeCode == TypeCode.String || typeCode == TypeCode.Enum
			|| typeCode == TypeCode.Boolean || typeCode == TypeCode.Integer
			|| typeCode == TypeCode.Long || typeCode == TypeCode.Float
			|| typeCode == TypeCode.Double || typeCode == TypeCode.DateTime
			|| typeCode == TypeCode.Duration;
	}

}
