import { Factory } from '../build/Factory';
import { CreateException } from '../build/CreateException';
import { Descriptor } from '../refer/Descriptor';
import { NullCache } from './NullCache';
import { MemoryCache } from './MemoryCache';

/**
 * Contains static read-only descriptors for the Null and Memory caches (as well as a default cache descriptor).
 */
export class DefaultCacheFactory extends Factory {
    public static readonly Descriptor: Descriptor = new Descriptor("pip-services", "factory", "cache", "default", "1.0");
    public static readonly NullCacheDescriptor: Descriptor = new Descriptor("pip-services", "cache", "null", "*", "1.0");
    public static readonly MemoryCacheDescriptor: Descriptor = new Descriptor("pip-services", "cache", "memory", "*", "1.0");

    /**
	 * Registers the NullCacheDescriptor and the MemoryCacheDescriptor descriptors as types in this factory.
	 * 
	 * @see Factory#Factory
	 */
	public constructor() {
        super();
		this.registerAsType(DefaultCacheFactory.MemoryCacheDescriptor, MemoryCache);
		this.registerAsType(DefaultCacheFactory.NullCacheDescriptor, NullCache);
	}
}
