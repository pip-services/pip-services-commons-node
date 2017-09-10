import { Factory } from '../build/Factory';
import { Descriptor } from '../refer/Descriptor';
export declare class DefaultLoggerFactory extends Factory {
    static readonly Descriptor: Descriptor;
    static readonly NullLoggerDescriptor: Descriptor;
    static readonly ConsoleLoggerDescriptor: Descriptor;
    static readonly CompositeLoggerDescriptor: Descriptor;
    constructor();
}
