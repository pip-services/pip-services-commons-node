import { IFactory } from '../build/IFactory';
import { Descriptor } from '../refer/Descriptor';
export declare class DefaultLoggerFactory implements IFactory {
    static readonly Descriptor: Descriptor;
    static readonly NullLoggerDescriptor: Descriptor;
    static readonly ConsoleLoggerDescriptor: Descriptor;
    static readonly CompositeLoggerDescriptor: Descriptor;
    canCreate(locator: any): boolean;
    create(locator: any): any;
}
