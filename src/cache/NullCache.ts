import { ICache } from './ICache';

export class NullCache implements ICache {
    
    public retrieve(correlationId: string, key: string, callback: (err: any, value: any) => void): void {
        callback(null, null);
    }

    public store(correlationId: string, key: string, value: any, timeout: number, callback: (err: any, value: any) => void): void {
        callback(null, value);
    }

    public remove(correlationId: string, key: string, callback: (err: any) => void): void {
        callback(null);
    }

}
