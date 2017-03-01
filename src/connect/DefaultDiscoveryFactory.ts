import { Factory } from '../build/Factory';
import { Descriptor } from '../refer/Descriptor';
import { MemoryDiscovery } from './MemoryDiscovery';

export class DefaultDiscoveryFactory extends Factory {
	public static readonly Descriptor = new Descriptor("pip-services-commons", "factory", "discovery", "default", "1.0");
	public static readonly MemoryDiscoveryDescriptor = new Descriptor("pip-services-commons", "discovery", "memory", "*", "1.0");
	
	public constructor() {
        super();
		this.registerAsType(DefaultDiscoveryFactory.MemoryDiscoveryDescriptor, MemoryDiscovery);
	}	
}
