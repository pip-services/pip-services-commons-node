import { NullLock } from './NullLock';
import { MemoryLock } from './MemoryLock';
import { Factory } from '../build/Factory';
import { CreateException } from '../build/CreateException';
import { Descriptor } from '../refer/Descriptor';

export class DefaultLockFactory extends Factory {
	public static readonly Descriptor = new Descriptor("pip-services", "factory", "lock", "default", "1.0");
	public static readonly NullLockDescriptor = new Descriptor("pip-services", "lock", "null", "*", "1.0");
	public static readonly MemoryLockDescriptor = new Descriptor("pip-services", "lock", "memory", "*", "1.0");

	public constructor() {
        super();
		this.registerAsType(DefaultLockFactory.NullLockDescriptor, NullLock);
		this.registerAsType(DefaultLockFactory.MemoryLockDescriptor, MemoryLock);
	}
}