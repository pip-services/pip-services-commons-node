export declare class CacheEntry {
    private _key;
    private _value;
    private _expiration;
    constructor(key: string, value: any, timeout: number);
    readonly key: string;
    readonly value: any;
    readonly expiration: number;
    setValue(value: any, timeout: number): void;
    isExpired(): boolean;
}
