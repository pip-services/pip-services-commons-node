import { ICache } from './ICache';
import { Descriptor } from '../refer/Descriptor';
import { IDescriptable } from '../refer/IDescriptable';
export declare class NullCache implements ICache, IDescriptable {
    static readonly Descriptor: Descriptor;
    getDescriptor(): Descriptor;
    retrieve(correlationId: string, key: string, callback: (err: any, value: any) => void): void;
    store(correlationId: string, key: string, value: any, timeout: number, callback: (err: any, value: any) => void): void;
    remove(correlationId: string, key: string, callback: (err: any) => void): void;
}
