let _ = require('lodash');

export class PropertyReflector {
	
	private static matchField(fieldName: string, fieldValue: any, expectedName: string): boolean {
        if (_.isFunction(fieldValue)) return false;
        if (_.startsWith(fieldName, '_')) return false;
        if (expectedName == null) return true;
        return fieldName.toLowerCase() == expectedName;
	}

	public static hasProperty(obj: any, name: string): boolean {
		if (obj == null)
			throw new Error("Object cannot be null");
		if (name == null)
			throw new Error("Property name cannot be null");
		
        name = name.toLowerCase();
        for (let field in obj) {
            let fieldValue = obj[field];
        	if (PropertyReflector.matchField(field, fieldValue, name))
        		return true;
        }
		
        return false;
	}

	public static getProperty(obj: any, name: string): any {
		if (obj == null)
			throw new Error("Object cannot be null");
		if (name == null)
			throw new Error("Property name cannot be null");

        name = name.toLowerCase()
        for (let field in obj) {
            let fieldValue = obj[field];
        	try {
	        	if (PropertyReflector.matchField(field, fieldValue, name))
	        		return fieldValue;
        	} catch (ex) {
        		// Ignore exceptions
        	}
        }
		
        return null;
	}
	
	public static getPropertyNames(obj: any): string[] {
        let properties: string[] = [];
		
        for (let field in obj) {
            let fieldValue = obj[field];
        	if (PropertyReflector.matchField(field, fieldValue, null))
        		properties.push(field);
        }
		        
		return properties;
	}

	public static getProperties(obj: any): any {
        let map: any = {};
		
        for (let field in obj) {
            let fieldValue = obj[field];
        	try {
	        	if (PropertyReflector.matchField(field, fieldValue, null))
	        		map[field] = fieldValue;
        	} catch (ex) {
        		// Ignore exception
        	}
        }
		        
		return map;
	}
	
	public static setProperty(obj: any, name: string, value: any): void {
		if (obj == null)
			throw new Error("Object cannot be null");
		if (name == null)
			throw new Error("Property name cannot be null");

        let expectedName = name.toLowerCase();
        for (let field in obj) {
            let fieldValue = obj[field];
	    	try {        		
	            if (PropertyReflector.matchField(field, fieldValue, expectedName)) { 
	        		obj[field] = value;
	        		return;
	            }
	    	} catch (ex) {
	    		// Ignore exception
	    	}
        }

        // If no existing properties found set it directly
        obj[name] = value;
	}
	
	public static setProperties(obj: any, values: any): void {
		if (values == null) return;
		
		for (let field in values) {
            let fieldValue = values[field];
			PropertyReflector.setProperty(obj, field, fieldValue);
		}
	}
}
