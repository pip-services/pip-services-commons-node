let fs = require('fs');
let yaml = require('js-yaml');

import { ConfigParams } from './ConfigParams';
import { CachedConfigReader } from './CachedConfigReader';
import { IConfigurable } from './IConfigurable';
import { FileConfigReader } from './FileConfigReader';
import { ConfigException } from '../errors/ConfigException'
import { FileException } from '../errors/FileException'
import { JsonConverter } from '../convert/JsonConverter'

export class YamlConfigReader extends FileConfigReader {

    public constructor(path: string = null) {
        super(path);
    }

    public readObject(correlationId: string): any {
        if (super.getPath() == null)
            throw new ConfigException(correlationId, "NO_PATH", "Missing config file path");

        try {
            // Todo: make this async?
            let data = yaml.safeLoad(fs.readFileSync(super.getPath(), 'utf8'));
            return data;
        } catch (e) {
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
        return new YamlConfigReader(path).readObject(correlationId);
    }

    public static readConfig(correlationId: string, path: string): ConfigParams {
        return new YamlConfigReader(path).readConfig(correlationId);
    }
}