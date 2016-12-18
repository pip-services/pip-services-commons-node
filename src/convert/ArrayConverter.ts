let _ = require('lodash');

export class ArrayConverter {

	public static toNullableArray(value: any): any[] {
		// Return null when nothing found
		if (value == null) return null;

		// Convert list
		if (_.isArray(value))
			return <any[]>value;
        // Convert map
        else if (_.isObject(value)) {
            let array = [];
            for (let prop in value)
                array.push(value[prop]);
            return array;
        } 
		// Convert single values
        else 
			return [value];
	}

	public static toArray(value: any): any[] {
		let result: any[] = ArrayConverter.toNullableArray(value);
		return result || [];
	}

	public static toArrayWithDefault(value: any, defaultValue: any[]): any[] {
		let result: any[] = ArrayConverter.toNullableArray(value);
		return result || defaultValue;
	}

    public static listToArray(value: any): any[] {
        if (value == null) return [];
        if (_.isString(value)) value = value.split(',');
		return ArrayConverter.toArray(value);
    }
    
}