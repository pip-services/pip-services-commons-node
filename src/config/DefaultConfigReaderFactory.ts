import { Factory } from '../build/Factory';
import { Descriptor } from '../refer/Descriptor';
import { MemoryConfigReader } from './MemoryConfigReader';
import { JsonConfigReader } from './JsonConfigReader';
import { YamlConfigReader } from './YamlConfigReader';

/**
 * Contains static read-only descriptors for the Memory, JSON, and YAML ConfigReaders (as well as a default config-reader descriptor).
 * 
 * @see Factory
 */
export class DefaultConfigReaderFactory extends Factory {
	public static readonly Descriptor = new Descriptor("pip-services", "factory", "config-reader", "default", "1.0");
	public static readonly MemoryConfigReaderDescriptor = new Descriptor("pip-services", "config-reader", "memory", "*", "1.0");
	public static readonly JsonConfigReaderDescriptor = new Descriptor("pip-services", "config-reader", "json", "*", "1.0");
	public static readonly YamlConfigReaderDescriptor = new Descriptor("pip-services", "config-reader", "yaml", "*", "1.0");
	
	/**
	 * Registers the MemoryConfigReaderDescriptor, JsonConfigReaderDescriptor, and YamlConfigReaderDescriptor
	 * descriptors as types in this factory.
	 * 
	 * @see Factory#Factory
	 */
	public constructor() {
        super();
		this.registerAsType(DefaultConfigReaderFactory.MemoryConfigReaderDescriptor, MemoryConfigReader);
		this.registerAsType(DefaultConfigReaderFactory.JsonConfigReaderDescriptor, JsonConfigReader);
		this.registerAsType(DefaultConfigReaderFactory.YamlConfigReaderDescriptor, YamlConfigReader);
	}
}
