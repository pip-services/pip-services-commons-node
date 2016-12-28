export declare class CacheEntry {
    key: string;
    value: any;
    expiration: number;
    constructor(key: string, value: any, timeout: number);
    setValue(value: any, timeout: number): void;
    isExpired(): boolean;
}
