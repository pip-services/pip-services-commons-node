import { IFactory } from '../build/IFactory';
import { IDescriptable } from '../refer/IDescriptable';
import { Descriptor } from '../refer/Descriptor';
export declare abstract class DefaultCountersFactory implements IFactory, IDescriptable {
    static readonly descriptor: Descriptor;
    getDescriptor(): Descriptor;
    canCreate(locator: any): boolean;
    create(locator: any): any;
}
