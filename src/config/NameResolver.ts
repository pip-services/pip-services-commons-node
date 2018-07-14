import { ConfigParams } from './ConfigParams';
import { Descriptor } from '../refer/Descriptor';

/**
 * Class that contains the static function {@link #resolve}, which can be used for resolving the name 
 * of a ConfigParams configuration.
 */
export class NameResolver {

    /**
     * Static method for resolving the name of ConfigParams 'config'. The configuration's name is
     * searched for in configurations with keys: "name", "id", "descriptor". In the case of 
     * "descriptor", the name of the {@link Descriptor} object will be returned. If no name is found,
     * 'defaultName' will be returned (or null if omitted).
     * 
     * @param config        ConfigParams, whose name is to be resolved.
     * @param defaultName   value to be returned if no name is resolved (null if omitted).
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