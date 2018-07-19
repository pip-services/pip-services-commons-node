let _ = require('lodash');

import { StringValueMap } from '../data/StringValueMap';
import { RecursiveObjectReader } from '../reflect/RecursiveObjectReader';

/**
 * Map with configuration parameters that uses complex keys with dot notation and simple 
 * string values.
 * 
 * Provides hierarchical organization of various configuration parameters using sections, 
 * subsections, and keys.
 * 
 * Examples of values, stored in configuration parameters:
 * 
 * - Section-1.Subsection-1-1.Key-1-1-1=123
 * - Section-1.Subsection-1-2.Key-1-2-1="ABC"
 * - Section-2.Subsection-1.Key-2-1-1="2016-09-16T00:00:00.00Z"
 *  
 * Configuration parameters support getting and adding sections from the map.
 * 
 * Also, configuration parameters may come in the form of a parameterized string:
 * Key1=123;Key2=ABC;Key3=2016-09-16T00:00:00.00Z
 * 
 * All keys stored in the map are case-insensitive.
 * 
 * ConfigParams can be used to configure objects of classes that implement {@link IConfigurable}.
 * 
 * @see IConfigurable
 * @see StringValueMap
 */
export class ConfigParams extends StringValueMap {

	/**
	 * Creates a new ConfigParams object from an array of tuples, a parameterized string 
	 * (Example: "Key1=123;Key2=ABC;Key3=2016-09-16T00:00:00.00Z"), or from an object with
	 * configuration parameters stored as properties.
	 * 
	 * @param values 	configuration parameters to store in this object. Defaults to null.
	 * 
	 * @see StringValueMap#StringValueMap
	 */
	public constructor(values: any = null) {
		super(values);
	}

	/**
	 * @returns the names of all sections that are present in this object's complex keys. 
	 * 
	 * Example key "Section-1.Subsection-1-1.Key-1-1-1" contains the section named "Section-1".
	 */
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
					if (section == sections[index]) {
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

	/**
	 * @param section	name of the section to retrieve configuration parameters from.
	 * @returns 		all configuration parameters that belong to the section named 'section'. 
	 * 
	 * Example key "Section-1.Subsection-1-1.Key-1-1-1" contains the section named "Section-1". 
	 * Calling <code>getSection("Section-1")</code> would return a ConfigParams object containing 
	 * the key "Subsection-1-1.Key-1-1-1"
	 */
	public getSection(section: string): ConfigParams {
		let result = new ConfigParams();
		let prefix = section + ".";

		for (let key in this) {
			if (this.hasOwnProperty(key)) {
				// Prevents exception on the next line
				if (key.length < prefix.length)
					continue;

				// Perform case sensitive match
				let keyPrefix = key.substring(0, prefix.length);
				if (keyPrefix == prefix) {
					let name = key.substring(prefix.length);
					result.put(name, this[key]);
				}
			}
		}

		return result;
	}

	/**
	 * Adds 'sectionParams' to this ConfigParams object under the section named 'section'.
	 * 
	 * @param section 			name of the section, under which 'sectionParams' is to be added. 
	 * 							The keys of 'sectionParams' will be renamed to "(section).<key's name>",
	 * 							when added to this ConfigParams object.
	 * @param sectionParams 	ConfigParams that are to be added under the section named 'section'.
	 */
	public addSection(section: string, sectionParams: ConfigParams): void {
		if (section == null)
			throw new Error("Section name cannot be null");

		if (sectionParams != null) {
			for (let key in sectionParams) {
				if (sectionParams.hasOwnProperty(key)) {
					let name = key;

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

	/**
	 * Overrides the configuration parameters stored in this object with the ones in 
	 * 'configParams'. If a configuration is already set in this ConfigParams object, 
	 * it will be overwritten by the value in 'configParams' with the same key.
	 * @see #setDefaults
	 * 
	 * @param configParams		configuration parameters to override the 
	 * 							parameters of this object with.
	 * @returns					ConfigParams object with overridden parameters.
	 */
	public override(configParams: ConfigParams): ConfigParams {
		let map = StringValueMap.fromMaps(this, configParams);
		return new ConfigParams(map);
	}

	/**
	 * Sets the default configurations for this ConfigParams object, based on the
	 * default configuration parameters passed in 'defaultConfigParams'. If a 
	 * configuration is already set in this ConfigParams object, it will not be
	 * overwritten by the default value in 'defaultConfigParams' with the same key.
	 * @see #override
	 * 
	 * @param defaultConfigParams	default configuration parameters (ConfigParams object).
	 * @returns						ConfigParams object with newly set defaults.
	 */
	public setDefaults(defaultConfigParams: ConfigParams): ConfigParams {
		let map = StringValueMap.fromMaps(defaultConfigParams, this);
		return new ConfigParams(map);
	}

	/**
	 * Static method that creates a ConfigParams object based on the values that are stored 
	 * in the 'value' object's properties.
	 * 
	 * @param value		configuration parameters in the form of an object with properties.
	 * @returns			generated ConfigParams.
	 * 
	 * @see RecursiveObjectReader#getProperties
	 */
	public static fromValue(value: any): ConfigParams {
		let map = RecursiveObjectReader.getProperties(value);
		return new ConfigParams(map);
	}

	/**
	 * Static method that creates a ConfigParams object from an array of tuples.
	 * 
	 * @param tuples	configuration parameters in the form of an array of tuples.
	 * @returns			generated ConfigParams.
	 * 
	 * @see StringValueMap#fromTuplesArray
	 */
	public static fromTuples(...tuples: any[]): ConfigParams {
		let map = StringValueMap.fromTuplesArray(tuples);
		return new ConfigParams(map);
	}

	/**
	 * Static method that creates a ConfigParams object from a parameterized string.
	 * 
	 * @param line 		configuration parameters in the form of a parameterized string. 
	 * 					Example: "Key1=123;Key2=ABC;Key3=2016-09-16T00:00:00.00Z"
	 * @returns			generated ConfigParams.
	 * 
	 * @see StringValueMap#fromString
	 */
	public static fromString(line: string): ConfigParams {
		let map = StringValueMap.fromString(line);
		return new ConfigParams(map);
	}

	/**
	 * Static method that can merge two or more ConfigParams into one.
	 * 
	 * @param configs 	array of ConfigParams that are to be merged into one ConfigParams object. 
	 * 					The order of elements in this array is important, as it regulates which values 
	 * 					to keep in the case of identical complex keys (the ConfigParams with the 
	 * 					highest index override the values of other ConfigParams with the same key).
	 * @returns			merged ConfigParams.
	 * 
	 * @see StringValueMap#fromMaps
	 */
	public static mergeConfigs(...configs: ConfigParams[]): ConfigParams {
		let map = StringValueMap.fromMaps(...configs);
		return new ConfigParams(map);
	}
}