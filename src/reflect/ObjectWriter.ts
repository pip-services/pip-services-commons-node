let _ = require('lodash');

import { PropertyReflector } from './PropertyReflector';
import { IntegerConverter } from '../convert/IntegerConverter';

export class ObjectWriter {
	
	public static setProperty(obj: any, name: string, value: any): void {
		if (obj == null)
			throw new Error("Object cannot be null");
		if (name == null)
			throw new Error("Property name cannot be null");

        if (_.isObject(obj) && !_.isDate(obj)) {
            PropertyReflector.setProperty(obj, name, value);
        } else if (_.isArray(obj)) {
            let index = IntegerConverter.toNullableInteger(name);
            if (index >= 0) {
                while (index < obj.length - 1)
                    obj.push(null);
                obj[index] = value;
            }
		}
	}
	
	public static setProperties(obj: any, values: any): void {
		if (values == null) return;
		
		for (let key in values) {
            let value = values[key];
			ObjectWriter.setProperty(obj, key, value);
		}
	}
}
