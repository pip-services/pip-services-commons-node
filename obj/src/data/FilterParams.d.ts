import { StringValueMap } from './StringValueMap';
export declare class FilterParams extends StringValueMap {
    constructor(map?: any);
    static fromTuples(...tuples: any[]): FilterParams;
    static fromString(line: string): FilterParams;
}
