let _ = require('lodash');

import { TypeCode } from '../convert/TypeCode';
import { TypeConverter } from '../convert/TypeConverter';
import { IntegerConverter } from '../convert/IntegerConverter';
import { ObjectReader } from './ObjectReader';
import { ObjectWriter } from './ObjectWriter';
import { RecursiveObjectReader } from './RecursiveObjectReader';

export class RecursiveObjectWriter {

	private static createProperty(obj: any, names: string[], nameIndex: number): any {
		// If next field is index then create an array
		let subField = names.length > nameIndex + 1 ? names[nameIndex + 1] : null;
		let subFieldIndex = IntegerConverter.toNullableInteger(subField);
		if (subFieldIndex != null)
			return [];

		// Else create a dictionary
		return {};
	}
	
    private static performSetProperty(obj: any, names: string[], nameIndex: number, value: any): any {
		if (nameIndex < names.length - 1) {
			let subObj = ObjectReader.getProperty(obj, names[nameIndex]);
			if (subObj != null)
				RecursiveObjectWriter.performSetProperty(subObj, names, nameIndex + 1, value);
			else {
				subObj = RecursiveObjectWriter.createProperty(obj, names, nameIndex);
				if (subObj != null) {					
					RecursiveObjectWriter.performSetProperty(subObj, names, nameIndex + 1, value);
					ObjectWriter.setProperty(obj, names[nameIndex], subObj);
				}
			}
		} else
			ObjectWriter.setProperty(obj, names[nameIndex], value);
	}

	public static setProperty(obj: any, name: string, value: any): void {
        if (obj == null || name == null) return;

        let names = name.split(".");
        if (names == null || names.length == 0) 
        	return;

        RecursiveObjectWriter.performSetProperty(obj, names, 0, value);
	}

	public static setProperties(obj: any, values: any): void {
		if (values == null) return;
		
		for (let key in values) {
            let value = values[key];
			RecursiveObjectWriter.setProperty(obj, key, value);
		}
	}

	public static copyProperties(dest: any, src: any): void {
		if (dest == null || src == null) return;
		
		let values = RecursiveObjectReader.getProperties(src);
		RecursiveObjectWriter.setProperties(dest, values);
	}

}
