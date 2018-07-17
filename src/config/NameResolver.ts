import { ConfigParams } from './ConfigParams';
import { Descriptor } from '../refer/Descriptor';

/**
 * Contains the static method {@link #resolve}, which can be used for resolving the name 
 * of a ConfigParams configuration.
 */
export class NameResolver {

    /**
     * Static method for resolving the name of a ConfigParams object. The configuration's name is
     * searched for using the keys: "name", "id", or "descriptor". In the case of 
     * "descriptor", the name of the {@link Descriptor} object will be returned. If no name is found,
     * 'defaultName' will be returned.
     * 
     * @param config        ConfigParams, whose name is to be resolved.
     * @param defaultName   (optional) value to be returned if no name is resolved. Defaults to null if omitted.
     * @returns             resolved name or 'defaultName'.
     */
    static resolve(config: ConfigParams, defaultName: string = null): string {
        let name: string = config.getAsNullableString("name") || config.getAsNullableString("id");

        if (name == null) {
            let descriptorStr: string = config.getAsNullableString("descriptor");
            let descriptor: Descriptor = Descriptor.fromString(descriptorStr);
            if (descriptor != null)
                name = descriptor.getName();
        }

        return name || defaultName;
    }
}