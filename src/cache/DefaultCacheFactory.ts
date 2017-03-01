import { Factory } from '../build/Factory';
import { CreateException } from '../build/CreateException';
import { Descriptor } from '../refer/Descriptor';
import { NullCache } from './NullCache';
import { MemoryCache } from './MemoryCache';

export class DefaultCacheFactory extends Factory {
    public static readonly Descriptor: Descriptor = new Descriptor("pip-services-commons", "factory", "cache", "default", "1.0");
    public static readonly NullCacheDescriptor: Descriptor = new Descriptor("pip-services-commons", "cache", "null", "*", "1.0");
    public static readonly MemoryCacheDescriptor: Descriptor = new Descriptor("pip-services-commons", "cache", "memory", "*", "1.0");

	public constructor() {
        super();
		this.registerAsType(DefaultCacheFactory.MemoryCacheDescriptor, MemoryCache);
		this.registerAsType(DefaultCacheFactory.NullCacheDescriptor, NullCache);
	}
}
