let _ = require('lodash');

import { PropertyReflector } from './PropertyReflector';
import { IntegerConverter } from '../convert/IntegerConverter';

export class ObjectReader {
	
    public static getValue(obj: any): any {
    	// Todo: just a blank implementation for compatibility
        return obj;
    }

	public static hasProperty(obj: any, name: string): boolean {
        if (obj == null || name == null) {
        	return false;
        } else if (_.isObject(obj) && !_.isDate(obj)) {
            return PropertyReflector.hasProperty(obj, name);
        } else if (_.isArray(obj)) {
            let index = IntegerConverter.toNullableInteger(name);
            return index != null && index < obj.length;
        } else {
            return false;
        }
    }

	public static getProperty(obj: any, name: string): any {
        if (obj == null || name == null) {
        	return null;
        } else if (_.isObject(obj) && !_.isDate(obj)) {
            return PropertyReflector.getProperty(obj, name);
        } else if (_.isArray(obj)) {
            let index = IntegerConverter.toNullableInteger(name);
            return index != null && index < obj.length ? obj[index] : null;
        } else {
            return null;
        }
    }

	public static getPropertyNames(obj: any): string[] {
        let properties: string[] = [];
        
        if (obj == null) {
        	// Do nothing
        } else if (_.isObject(obj) && !_.isDate(obj)) {
            properties = PropertyReflector.getPropertyNames(obj);
        } else if (_.isArray(obj)) {
			let length = obj.length;
            for (let index = 0; index < length; index++)
            	properties.push(index.toString());
        } else {
            // Do nothing
        }

        return properties;
    }

	public static getProperties(obj: any): any {
        let map: any = {};
        
        if (obj == null) {
        	// Do nothing
        } else if (_.isObject(obj) && !_.isDate(obj)) {
            map = PropertyReflector.getProperties(obj);
        } else if (_.isArray(obj)) {
			let length = obj.length;
            for (let index = 0; index < length; index++)
                map[index.toString()] = obj[index];
        } else {
            // Do nothing
        }

        return map;
    }
}
