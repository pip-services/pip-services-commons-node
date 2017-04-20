import { AnyValueMap } from '../data/AnyValueMap';
import { JsonConverter } from '../convert/JsonConverter';
import { RecursiveObjectReader } from '../reflect/RecursiveObjectReader';
import { RecursiveObjectWriter } from '../reflect/RecursiveObjectWriter';
import { ObjectWriter } from '../reflect/ObjectWriter';
import { ConfigParams } from '../config/ConfigParams';

/**
 * Parameters represent hierarchical map that uses simple keys and stores complex objects.
 * It allows hierarchical access to stored data using dot-notation.
 * 
 * All keys stored in the map are case-insensitive.
 */
export class Parameters extends AnyValueMap {

	public constructor(map: any = null) {
		super(map);
	}

	public get(key: string): any {
		if (key == null)
			return null;
		else if (key.indexOf('.') > 0)
			return RecursiveObjectReader.getProperty(this, key);
		else
			return super.get(key);
	}

	public put(key: string, value: any): any {
		if (key == null)
			return null;
		else if (key.indexOf('.') > 0)
			RecursiveObjectWriter.setProperty(this, key, value);
		else
			super.put(key, value);
		return value;
    }

    public getAsNullableParameters(key: string): Parameters {
        let value = this.getAsNullableMap(key);
    	return value != null ? new Parameters(value) : null;
    }

    public getAsParameters(key: string): Parameters {
        let value = this.getAsMap(key);
    	return new Parameters(value);
    }

    public getAsParametersWithDefault(key: string, defaultValue: Parameters): Parameters {
        let result = this.getAsNullableParameters(key);
    	return result != null ? result: defaultValue;
    }

	public containsKey(key: string): boolean {
		return RecursiveObjectReader.hasProperty(this, key.toString());
	}
	
 	public override(parameters: Parameters, recursive: boolean = false): Parameters {
 		let result = new Parameters();
 		if (recursive) {
 			RecursiveObjectWriter.copyProperties(result, this);
 			RecursiveObjectWriter.copyProperties(result, parameters);
 		} else {
 			ObjectWriter.setProperties(result, this);
 			ObjectWriter.setProperties(result, parameters);
 		}
        return result;
    }

	public setDefaults(defaultParameters: Parameters, recursive: boolean = false): Parameters {
 		let result = new Parameters();
 		if (recursive) {
 			RecursiveObjectWriter.copyProperties(result, defaultParameters);
 			RecursiveObjectWriter.copyProperties(result, this);
 		} else {
 			ObjectWriter.setProperties(result, defaultParameters);
 			ObjectWriter.setProperties(result, this);
 		}
        return result;
	}

    public assignTo(value: any): void {
        if (value == null) return;        
        RecursiveObjectWriter.copyProperties(value, this);
    }
        
    public pick(...paths: string[]): Parameters {
    	let result = new Parameters();
        for (let index = 0; index < paths.length; index++) {
            let path = paths[index];
            if (this.containsKey(path))
                result.put(path, this.get(path));
        }
        return result;
    }

    public omit(...paths: string[]): Parameters {
    	let result = new Parameters(this);        
        for (let index = 0; index < paths.length; index++) {
            let path = paths[index];
            result.remove(path);
        }
        return result;
    }
	
	public toJson(): string {
		return JsonConverter.toJson(this);
	}
	
    public static fromValue(value: any): Parameters {
        return new Parameters(value);
    }
	
	public static fromTuples(...tuples: any[]): Parameters {
		let map = AnyValueMap.fromTuples(...tuples);
		return new Parameters(map);
	}
		
	public static mergeParams(...parameters: Parameters[]): Parameters {
		let map = AnyValueMap.fromMaps(...parameters);
		return new Parameters(map);
	}
	
	public static fromJson(json: string): Parameters {
		let map = JsonConverter.toNullableMap(json);
		return new Parameters(map);
	}
	
	public static fromConfig(config: ConfigParams): Parameters {
		let result = new Parameters();
		
		if (config == null)
			return result;
		
		for (let key in config) {
            if (config.hasOwnProperty(key))
			    result.put(key, config[key]);
		}
		
		return result;
	}
}
