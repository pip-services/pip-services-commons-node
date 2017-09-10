export declare class CacheEntry {
    private _key;
    private _value;
    private _expiration;
    constructor(key: string, value: any, timeout: number);
    getKey(): string;
    getValue(): any;
    getExpiration(): number;
    setValue(value: any, timeout: number): void;
    isExpired(): boolean;
}
