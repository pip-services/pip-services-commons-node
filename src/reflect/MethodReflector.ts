let _ = require('lodash');

export class MethodReflector {
	
    private static matchMethod(methodName: string, methodValue: any, expectedName: string): boolean {
        if (!_.isFunction(methodValue)) return false;
        if (_.startsWith(methodName, '_')) return false;
        if (expectedName == null) return true;
        return methodName.toLowerCase() == expectedName;
    }

	public static hasMethod(obj: any, name: string): boolean {
		if (obj == null)
			throw new Error("Object cannot be null");
		if (name == null)
			throw new Error("Method name cannot be null");
		
        name = name.toLowerCase();
        for (let method in obj) {
            let methodValue = obj[method];
        	if (MethodReflector.matchMethod(method, methodValue, name))
        		return true;
        }

        return false;
	}

	public static invokeMethod(obj: any, name: string, ...args: any[]): any {
		if (obj == null)
			throw new Error("Object cannot be null");
		if (name == null)
			throw new Error("Method name cannot be null");
		
        name = name.toLowerCase();
        for (let method in obj) {
            let methodValue = obj[method];
        	try {
        	    if (MethodReflector.matchMethod(method, methodValue, name))
                    return methodValue.apply(obj, args);
        	} catch (ex) {
        		// Ignore exceptions
        	}
        }

        return null;
	}

	public static getMethodNames(obj: any): string[] {
        let methods: string[] = [];
		
        for (let method in obj) {
            let methodValue = obj[method];
        	if (MethodReflector.matchMethod(method, methodValue, null))
        		methods.push(method);
        }
        
		return methods;
	}

}
