import { Factory } from '../build/Factory';
import { Descriptor } from '../refer/Descriptor';
import { MemoryCredentialStore } from './MemoryCredentialStore';

/**
 * Contains static read-only descriptors for MemoryCredentialStore (as well as a default "credential-store" descriptor).
 * 
 * @see Factory
 */
export class DefaultCredentialStoreFactory extends Factory {
	public static readonly Descriptor = new Descriptor("pip-services", "factory", "credential-store", "default", "1.0");
	public static readonly MemoryCredentialStoreDescriptor = new Descriptor("pip-services", "credential-store", "memory", "*", "1.0");
	public static readonly MemoryCredentialStoreDescriptor2 = new Descriptor("pip-services-commons", "credential-store", "memory", "*", "1.0");
	
	/**
	 * Adds an object factory for MemoryCredentialStore to this Factory.
	 * 
	 * @see Factory#Factory
	 */
	public constructor() {
        super();
		this.registerAsType(DefaultCredentialStoreFactory.MemoryCredentialStoreDescriptor, MemoryCredentialStore);
		this.registerAsType(DefaultCredentialStoreFactory.MemoryCredentialStoreDescriptor2, MemoryCredentialStore);
	}	
}
