let _ = require('lodash');

import { TypeCode } from '../convert/TypeCode';
import { TypeConverter } from '../convert/TypeConverter';
import { ObjectReader } from './ObjectReader';

export class RecursiveObjectReader {

    private static performHasProperty(obj: any, names: string[], nameIndex: number): boolean {
		if (nameIndex < names.length - 1) {
			let value  = ObjectReader.getProperty(obj, names[nameIndex]);
			if (value != null)
				return RecursiveObjectReader.performHasProperty(value, names, nameIndex + 1);
			else
				return false;
		} else
			return ObjectReader.hasProperty(obj, names[nameIndex]);
	}

	public static hasProperty(obj: any, name: string): boolean {
        if (obj == null || name == null) return false;

        let names = name.split(".");
        if (names == null || names.length == 0) 
        	return false;

        return RecursiveObjectReader.performHasProperty(obj, names, 0);
	}

    private static performGetProperty(obj: any, names: string[], nameIndex: number): any {
		if (nameIndex < names.length - 1) {
			let value = ObjectReader.getProperty(obj, names[nameIndex]);
			if (value != null)
				return RecursiveObjectReader.performGetProperty(value, names, nameIndex + 1);
			else
				return null;
		} else
			return ObjectReader.getProperty(obj, names[nameIndex]);
	}

	public static getProperty(obj: any, name: string): any {
        if (obj == null || name == null) return null;

        let names = name.split(".");
        if (names == null || names.length == 0) 
        	return null;

        return RecursiveObjectReader.performGetProperty(obj, names, 0);
	}

	private static isSimpleValue(value: any): boolean {
		let code = TypeConverter.toTypeCode(value);
		return code != TypeCode.Array && code != TypeCode.Map && code != TypeCode.Object;
	}
	
	private static performGetPropertyNames(obj: any, path: string, result: string[], cycleDetect: any): void {
		let map = ObjectReader.getProperties(obj);
		
        if (!_.isEmpty(map) && cycleDetect.length < 100) {		
			cycleDetect.push(obj);
			try {
				for (let key in map) {
                    let value = map[key];
					
					// Prevent cycles 
					if (cycleDetect.indexOf(value) >= 0)
						continue;

					let newPath = path != null ? path + "." + key : key;
					
					// Add simple values directly
					if (RecursiveObjectReader.isSimpleValue(value))
						result.push(newPath);
					// Recursively go to elements
					else
						RecursiveObjectReader.performGetPropertyNames(value, newPath, result, cycleDetect);				
				}
			} finally {
                let index = cycleDetect.indexOf(obj);
                if (index >= 0)
				    cycleDetect.splice(index, 1);
			}
		} else {
			if (path != null)
				result.push(path);
		}
	}

	public static getPropertyNames(obj: any): string[] {
        let propertyNames: string[] = [];
		
        if (obj == null) {
        	return propertyNames;
        } else {
            let cycleDetect: any[] = [];
        	RecursiveObjectReader.performGetPropertyNames(obj, null, propertyNames, cycleDetect);
        	return propertyNames;
        }
	}

	private static performGetProperties(obj: any, path: string, result: any, cycleDetect: any[]): void {
		let map = ObjectReader.getProperties(obj);
		
        if (!_.isEmpty(map) && cycleDetect.length < 100) {		
			cycleDetect.push(obj);
			try {
				for (let key in map) {
                    let value = map[key];
					
					// Prevent cycles 
					if (cycleDetect.indexOf(value) >= 0)
						continue;

					let newPath = path != null ? path + "." + key : key;
					
					// Add simple values directly
					if (RecursiveObjectReader.isSimpleValue(value))
                        result[newPath] = value;
					// Recursively go to elements
					else
						RecursiveObjectReader.performGetProperties(value, newPath, result, cycleDetect);				
				}
			} finally {
                let index = cycleDetect.indexOf(obj);
                if (index >= 0)
				    cycleDetect.splice(index, 1);
			}
		} else {
			if (path != null)
                result[path] = obj;
		}
	}

	public static getProperties(obj: any): any {
        let properties: any = {};
		
        if (obj != null) {
            let cycleDetect: any[] = [];
        	RecursiveObjectReader.performGetProperties(obj, null, properties, cycleDetect);
        }

        return properties;
	}
	
}
