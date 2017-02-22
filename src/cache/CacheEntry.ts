export class CacheEntry {
    private _key: string;
    private _value: any;
    private _expiration: number;

    public constructor(key: string, value: any, timeout: number) {
        this._key = key;
        this._value = value;
        this._expiration = new Date().getTime() + timeout;
    }

    public getKey(): string {
        return this._key;
    }

    public getValue(): any {
        return this._value;
    }

    public getExpiration(): number {
        return this._expiration;
    }

    public setValue(value: any, timeout: number): void {
        this._value = value;
        this._expiration = new Date().getTime() + timeout;
    }

    public isExpired(): boolean {
        return this._expiration < new Date().getTime();
    }

}
