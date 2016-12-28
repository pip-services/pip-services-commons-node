import { ICache } from './ICache';
import { Descriptor } from '../refer/Descriptor';
import { IDescriptable } from '../refer/IDescriptable';

export class NullCache implements ICache, IDescriptable {
    public static readonly Descriptor: Descriptor = new Descriptor("pip-services-common", "cache", "null", "default", "1.0");

    public getDescriptor(): Descriptor {
        return NullCache.Descriptor;
    }

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
