import { IFactory } from '../build/IFactory';
import { IDescriptable } from '../refer/IDescriptable';
import { Descriptor } from '../refer/Descriptor';
export declare class DefaultCacheFactory implements IFactory, IDescriptable {
    /**
     * Unique descriptor for the Memory Cache component
     */
    static readonly Descriptor: Descriptor;
    getDescriptor(): Descriptor;
    canCreate(locator: any): boolean;
    create(locator: any): any;
}
