import { ConfigParams } from './ConfigParams';
import { Descriptor } from '../refer/Descriptor';

export class NameResolver {
    static resolve(config: ConfigParams, defaultName: string = null): string {
        let name: string = config.getAsNullableString("name") || config.getAsNullableString("id");

        if(name == null) {
            let descriptorStr: string = config.getAsNullableString("descriptor");
            let descriptor: Descriptor = Descriptor.fromString(descriptorStr);
            if(descriptor != null) {
                name = descriptor.name;
            }
        }

        return name || defaultName;
    }
}