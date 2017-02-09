export interface ICache {
    retrieve(correlationId: string, key: string, callback: (err: any) => void): void;
    store(correlationId: string, key: string, value: any, timeout: number, callback: (err: any) => void): void;
    remove(correlationId: string, key: string, callback: (err: any) => void): any;
}
