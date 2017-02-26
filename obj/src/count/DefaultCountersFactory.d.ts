import { IFactory } from '../build/IFactory';
import { Descriptor } from '../refer/Descriptor';
export declare class DefaultCountersFactory implements IFactory {
    static readonly Descriptor: Descriptor;
    static readonly NullCountersDescriptor: Descriptor;
    static readonly LogCountersDescriptor: Descriptor;
    static readonly CompositeCountersDescriptor: Descriptor;
    canCreate(locator: any): boolean;
    create(locator: any): any;
}
