export declare class PagingParams {
    constructor(skip?: any, take?: any, total?: any);
    skip: number;
    take: number;
    total: boolean;
    getSkip(minSkip: number): number;
    getTake(maxTake: number): number;
    static fromValue(value: any): PagingParams;
    static fromTuples(...tuples: any[]): PagingParams;
    static fromMap(map: any): PagingParams;
}
