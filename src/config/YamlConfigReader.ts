let fs = require('fs');
let yaml = require('js-yaml');

import { ConfigParams } from './ConfigParams';
import { CachedConfigReader } from './CachedConfigReader';
import { IConfigurable } from './IConfigurable';
import { FileConfigReader } from './FileConfigReader';
import { IDescriptable } from '../refer/IDescriptable';
import { Descriptor } from '../refer/Descriptor';
import { ConfigException } from '../errors/ConfigException'
import { FileException } from '../errors/FileException'
import { JsonConverter } from '../convert/JsonConverter'

export class YamlConfigReader extends FileConfigReader implements IDescriptable {

    public constructor(name: string = null, path: string = null) {
        super(name, path);
    }

    public getDescriptor(): Descriptor
    {
            return new Descriptor("pip-services-commons", "config-reader", "yaml", super.getName() || "default", "1.0");
    }

    public readObject(correlationId: string): any {
        if(super.getPath() == null) {
            throw new ConfigException(correlationId, "NO_PATH", "Missing config file path");
        }

        try{
            // Todo: make this async?
            let data = yaml.safeLoad(fs.readFileSync(super.getPath(), 'utf8'));
            return data;
        } catch(e) {
                throw new FileException(
                    correlationId,
                    "READ_FAILED",
                    "Failed reading configuration " + super.getPath() + ": " + e
                )
                .withDetails("path", super.getPath())
                .withCause(e);
        }
    }

    protected performReadConfig(correlationId: string): ConfigParams {
        let value: any = this.readObject(correlationId);
        return ConfigParams.fromValue(value);
    }

    public static readObject(correlationId: string, path: string): void {
        return new YamlConfigReader(null, path).readObject(correlationId);
    }

    public static readConfig(correlationId: string, path: string): ConfigParams {
        return new YamlConfigReader(null, path).readConfig(correlationId);
    }
}