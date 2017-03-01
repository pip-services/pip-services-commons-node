import { Factory } from '../build/Factory';
import { Descriptor } from '../refer/Descriptor';
export declare class DefaultConfigReaderFactory extends Factory {
    static readonly Descriptor: Descriptor;
    static readonly MemoryConfigReaderDescriptor: Descriptor;
    static readonly JsonConfigReaderDescriptor: Descriptor;
    static readonly YamlConfigReaderDescriptor: Descriptor;
    constructor();
}
