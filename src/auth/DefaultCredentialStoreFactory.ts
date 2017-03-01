import { Factory } from '../build/Factory';
import { Descriptor } from '../refer/Descriptor';
import { MemoryCredentialStore } from './MemoryCredentialStore';

export class DefaultCredentialStoreFactory extends Factory {
	public static readonly Descriptor = new Descriptor("pip-services-commons", "factory", "credential-store", "default", "1.0");
	public static readonly MemoryCredentialStoreDescriptor = new Descriptor("pip-services-commons", "credential-store", "memory", "*", "1.0");
	
	public constructor() {
        super();
		this.registerAsType(DefaultCredentialStoreFactory.MemoryCredentialStoreDescriptor, MemoryCredentialStore);
	}	
}
