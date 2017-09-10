import { ICache } from './ICache';
export declare class NullCache implements ICache {
    retrieve(correlationId: string, key: string, callback: (err: any, value: any) => void): void;
    store(correlationId: string, key: string, value: any, timeout: number, callback: (err: any, value: any) => void): void;
    remove(correlationId: string, key: string, callback: (err: any) => void): void;
}
