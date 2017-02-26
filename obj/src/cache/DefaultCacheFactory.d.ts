import { IFactory } from '../build/IFactory';
import { Descriptor } from '../refer/Descriptor';
export declare class DefaultCacheFactory implements IFactory {
    static readonly Descriptor: Descriptor;
    static readonly NullCacheDescriptor: Descriptor;
    static readonly MemoryCacheDescriptor: Descriptor;
    canCreate(locator: any): boolean;
    create(locator: any): any;
}
