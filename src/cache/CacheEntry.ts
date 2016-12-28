export class CacheEntry {

    private _key: string;
    private _value: any;
    private _expiration: number;

    public constructor(key: string, value: any, timeout: number) {
	this._key = key;
	this._value = value;
        this._expiration = new Date().getTime() + timeout;
    }
	
    public get key(): string {
        return this._key; 
    }

    public get value(): any {
        return this._value; 
    }

    public get expiration(): number {
        return this._expiration; 
    }

    public setValue(value: any, timeout: number): void {
        this._value = value;
	this._expiration = new Date().getTime() + timeout;
    }
	
    public isExpired(): boolean
    {
    	return this._expiration < new Date().getTime();
    }

}
