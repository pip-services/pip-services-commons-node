import { AnyValueMap } from '../data/AnyValueMap';
import { ConfigParams } from '../config/ConfigParams';
/**
 * Parameters represent hierarchical map that uses simple keys and stores complex objects.
 * It allows hierarchical access to stored data using dot-notation.
 *
 * All keys stored in the map are case-insensitive.
 */
export declare class Parameters extends AnyValueMap {
    constructor(map?: any);
    get(key: string): any;
    put(key: string, value: any): any;
    getAsNullableParameters(key: string): Parameters;
    getAsParameters(key: string): Parameters;
    getAsParametersWithDefault(key: string, defaultValue: Parameters): Parameters;
    containsKey(key: string): boolean;
    override(parameters: Parameters, recursive?: boolean): Parameters;
    setDefaults(defaultParameters: Parameters, recursive?: boolean): Parameters;
    assignTo(value: any): void;
    pick(...paths: string[]): Parameters;
    omit(...paths: string[]): Parameters;
    toJson(): string;
    static fromValue(value: any): Parameters;
    static fromTuples(...tuples: any[]): Parameters;
    static mergeParams(...parameters: Parameters[]): Parameters;
    static fromJson(json: string): Parameters;
    static fromConfig(config: ConfigParams): Parameters;
}
