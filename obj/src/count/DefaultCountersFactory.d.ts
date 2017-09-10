import { Factory } from '../build/Factory';
import { Descriptor } from '../refer/Descriptor';
export declare class DefaultCountersFactory extends Factory {
    static readonly Descriptor: Descriptor;
    static readonly NullCountersDescriptor: Descriptor;
    static readonly LogCountersDescriptor: Descriptor;
    static readonly CompositeCountersDescriptor: Descriptor;
    constructor();
}
