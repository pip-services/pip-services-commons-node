import { Factory } from '../build/Factory';
import { Descriptor } from '../refer/Descriptor';
export declare class DefaultLockFactory extends Factory {
    static readonly Descriptor: Descriptor;
    static readonly NullLockDescriptor: Descriptor;
    static readonly MemoryLockDescriptor: Descriptor;
    constructor();
}
