let _ = require('lodash');

import { StringValueMap } from '../data/StringValueMap';
import { RecursiveObjectReader } from '../reflect/RecursiveObjectReader';

/**
 * Map with configuration parameters that use complex keys with dot notation and simple string values.
 * 
 * Example of values, stored in the configuration parameters:
 * <ul>
 * <li>Section-1.Subsection-1-1.Key-1-1-1=123</li>
 * <li>Section-1.Subsection-1-2.Key-1-2-1="ABC"</li>
 * <li>Section-2.Subsection-1.Key-2-1-1="2016-09-16T00:00:00.00Z"</li>
 * </ul>
 *  
 * Configuration parameters support getting and adding sections from the map.
 * 
 * Also, configuration parameters may come in a form of parameterized string:
 * Key1=123;Key2=ABC;Key3=2016-09-16T00:00:00.00Z
 * 
 * All keys stored in the map are case-insensitive.
 */
export class ConfigParams extends StringValueMap {

	public constructor(values: any = null) {
		super(values);
	}

	public getSectionNames(): string[] {
        let sections: string[] = [];
		
		for (let key in this) {
            if (this.hasOwnProperty(key)) {
                let pos = key.indexOf('.');
                let section: string = key;
                if (pos > 0)
                    section = key.substring(0, pos);

                // Perform case sensitive search
                let found = false;
                for (let index = 0; index < sections.length; index++) {
                    if (section.toLowerCase() == sections[index].toLowerCase()) {
                        found = true;
                        break;
                    }
                }
                    
                if (!found)
                    sections.push(section);
            }
		}
		
		return sections;
	}
	
	public getSection(section: string): ConfigParams {
		let result = new ConfigParams();
		let prefix = section.toLowerCase() + ".";
		
		for (let key in this) {
            if (this.hasOwnProperty(key)) {
                // Prevents exception on the next line
                if (key.length < prefix.length)
                    continue;
                
                // Perform case sensitive match
                let keyPrefix = key.substring(0, prefix.length).toLowerCase();
                if (keyPrefix == prefix) {
                    let name = key.substring(prefix.length);
                    result.put(name, this[key]);
                }
            }
		}
		
		return result;
	}
	
	protected isShadowName(name: string): boolean {
		return name == null || name.length == 0
			|| _.startsWith(name, "#") || _.startsWith(name, "!");
	}
	
	public addSection(section: string, sectionParams: ConfigParams): void {
		if (section == null)
			throw new Error("Section name cannot be null");

		section = this.isShadowName(section) ? "" : section; 
		
		if (sectionParams != null) {
			for (let key in sectionParams) {
                if (sectionParams.hasOwnProperty(key)) {
                    let name = key;
                    name = this.isShadowName(name) ? "" : name;
                    
                    if (name.length > 0 && section.length > 0)
                        name = section + "." + name;
                    else if (name.length == 0)
                        name = section;

                    let value = sectionParams[key];
                    
                    this.put(name, value);
                }
			}
		}
	}
	
	public override(configParams: ConfigParams): ConfigParams {
		let map = StringValueMap.fromMaps(this, configParams);
		return new ConfigParams(map);
	}
	
	public setDefaults(defaultConfigParams: ConfigParams): ConfigParams {
		let map = StringValueMap.fromMaps(defaultConfigParams, this);
		return new ConfigParams(map);
	}

	public static fromValue(value: any): ConfigParams {
		let map = RecursiveObjectReader.getProperties(value);
		return new ConfigParams(map);
	}
	
	public static fromTuples(...tuples: any[]): ConfigParams {
		let map = StringValueMap.fromTuplesArray(tuples);
		return new ConfigParams(map);
	}
	
	public static fromString(line: string): ConfigParams {
		let map = StringValueMap.fromString(line);
		return new ConfigParams(map);
	}
	
	public static mergeConfigs(...configs: ConfigParams[]): ConfigParams {
		let map = StringValueMap.fromMaps(configs);
		return new ConfigParams(map);
	}
}