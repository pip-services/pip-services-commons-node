import { Factory } from '../build/Factory';
import { Descriptor } from '../refer/Descriptor';
export declare class DefaultLoggerFactory extends Factory {
    static readonly Descriptor: Descriptor;
    static readonly NullLoggerDescriptor: Descriptor;
    static readonly NullLoggerDescriptor2: Descriptor;
    static readonly ConsoleLoggerDescriptor: Descriptor;
    static readonly ConsoleLoggerDescriptor2: Descriptor;
    static readonly CompositeLoggerDescriptor: Descriptor;
    static readonly CompositeLoggerDescriptor2: Descriptor;
    constructor();
}
