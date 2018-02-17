import { NullLock } from './NullLock';
import { MemoryLock } from './MemoryLock';
import { MemcachedLock } from './MemcachedLock';
import { Factory } from '../build/Factory';
import { CreateException } from '../build/CreateException';
import { Descriptor } from '../refer/Descriptor';

export class DefaultLockFactory extends Factory {
	public static readonly Descriptor = new Descriptor("pip-services-commons", "factory", "lock", "default", "1.0");
	public static readonly NullLockDescriptor = new Descriptor("pip-services-commons", "lock", "null", "*", "1.0");
	public static readonly MemoryLockDescriptor = new Descriptor("pip-services-commons", "lock", "memory", "*", "1.0");
	public static readonly MemcachedLockDescriptor = new Descriptor("pip-services-commons", "lock", "memcached", "*", "1.0");

	public constructor() {
        super();
		this.registerAsType(DefaultLockFactory.NullLockDescriptor, NullLock);
		this.registerAsType(DefaultLockFactory.MemoryLockDescriptor, MemoryLock);
		this.registerAsType(DefaultLockFactory.MemcachedLockDescriptor, MemcachedLock);
	}
}