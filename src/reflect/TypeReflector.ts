let _ = require('lodash');

import { TypeDescriptor } from './TypeDescriptor';
import { NotFoundException } from '../errors/NotFoundException';
import { UnsupportedException } from '../errors/UnsupportedException';

export class TypeReflector {

	public static getType(name: string, library: string): any {
		try {
	        // Load module
            var type = require(library);
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

        let typeConstructor = function() {
            type.apply(this, args);
        };
        return new typeConstructor();
	}

	public static createInstance(name: string, library: string, ...args: any[]): any {
		let type = TypeReflector.getType(name, library);		
		if (type == null)
			throw new NotFoundException(null, "TYPE_NOT_FOUND", "Type " + name + "," + library + " was not found")
				.withDetails("type", name).withDetails("library", library);
		
		return TypeReflector.createInstanceByType(type, args);
	}

	public static createInstanceByDescriptor(type: TypeDescriptor, ...args: any[]): any {
		if (type == null)
			throw new Error("Type descriptor cannot be null");

		return TypeReflector.createInstance(type.getName(), type.getLibrary(), args);
	}

}
