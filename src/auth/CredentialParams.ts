import { ConfigParams } from '../config/ConfigParams';
import { StringValueMap } from '../data/StringValueMap';

export class CredentialParams extends ConfigParams {

    public constructor(values: any = null) {
        super(values);
    }

    public useCredentialStore(): boolean {
        return super.getAsNullableString("store_key") != null;
    }

    public getStoreKey(): string {
        return super.getAsNullableString("store_key");
    }

    public setStoreKey(value: string) {
        super.put("store_key", value);
    }

    public getUsername(): string {
        return super.getAsNullableString("username");
    }

    public setUsername(value: string) {
        super.put("username", value);
    }

    public getPassword(): string {
        return super.getAsNullableString("password");
    }

    public setPassword(value: string) {
        super.put("password", value);
    }

    public getAccessId(): string {
        return super.getAsNullableString("access_id") || super.getAsNullableString("client_id");
    }

    public setAccessId(value: string) {
        super.put("access_id", value);
    }

    public getAccessKey(): string {
        return super.getAsNullableString("access_key") || super.getAsNullableString("client_key");
    }

    public setAccessKey(value: string) {
        super.put("access_key", value);
    }

    public static fromString(line: string): CredentialParams {
        let map = StringValueMap.fromString(line);
        return new CredentialParams(map);
    }

    public static manyFromConfig(config: ConfigParams, configAsDefault: boolean = true): CredentialParams[] {
        let result: CredentialParams[] = [];

        let credentials: ConfigParams = config.getSection("credentials");

        if (credentials.length() > 0) {
            for (let section in credentials.getSectionNames()) {
                let credential: ConfigParams = credentials.getSection(section);
                result.push(new CredentialParams(credential));
            }
        } else {
            let credential: ConfigParams = config.getSection("credential");
            if (credential.length() > 0) 
                result.push(new CredentialParams(credential));
            else if (configAsDefault)
                result.push(new CredentialParams(config));
        }

        return result;
    }

    public static fromConfig(config: ConfigParams, configAsDefault: boolean = true): CredentialParams {
        let connections: CredentialParams[] = this.manyFromConfig(config, configAsDefault);
        return connections.length > 0 ? connections[0] : null;
    }
}