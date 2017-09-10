import { Factory } from '../build/Factory';
import { Descriptor } from '../refer/Descriptor';
export declare class DefaultCacheFactory extends Factory {
    static readonly Descriptor: Descriptor;
    static readonly NullCacheDescriptor: Descriptor;
    static readonly MemoryCacheDescriptor: Descriptor;
    constructor();
}
