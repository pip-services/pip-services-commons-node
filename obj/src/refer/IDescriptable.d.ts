import { Descriptor } from './Descriptor';
export interface IDescriptable {
    /**
     * Gets the component descriptor object.
     * @return the component descriptor for this object.
     */
    getDescriptor(): Descriptor;
}
