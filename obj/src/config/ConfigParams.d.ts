import { StringValueMap } from '../data/StringValueMap';
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
export declare class ConfigParams extends StringValueMap {
    constructor(values?: any);
    getSectionNames(): string[];
    getSection(section: string): ConfigParams;
    protected isShadowName(name: string): boolean;
    addSection(section: string, sectionParams: ConfigParams): void;
    override(configParams: ConfigParams): ConfigParams;
    setDefaults(defaultConfigParams: ConfigParams): ConfigParams;
    static fromValue(value: any): ConfigParams;
    static fromTuples(...tuples: any[]): ConfigParams;
    static fromString(line: string): ConfigParams;
    static mergeConfigs(...configs: ConfigParams[]): ConfigParams;
}
