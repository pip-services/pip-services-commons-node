import { ConfigParams } from '../config/ConfigParams';
import { StringValueMap } from '../data/StringValueMap';

export class ConnectionParams extends ConfigParams {
    public constructor(values: any = null) {
        super(values);
    }

    public getUseDiscovery(): boolean {
        return super.getAsNullableString("discovery_key") != null;
    }

    public getDiscoveryKey(): string {
        return super.getAsString("discovery_key");
    }

    public setDiscoveryKey(value: string): void {
        return super.put("discovery_key", value);
    }

    public getProtocol(defaultValue: string = null): string {
        return super.getAsStringWithDefault("protocol", defaultValue || "http");
    }

    public setProtocol(value: string): void {
        return super.put("protocol", value);
    }

    public getHost(): string {
        let host: string = super.getAsNullableString("host");
        host = host || super.getAsNullableString("ip") || "";
        return host.length == 0 ? "localhost" : host;
    }

    public setHost(value: string): void {
        return super.put("host", value);
    }

    public getPort(): number {
        return super.getAsInteger("port");
    }

    public setPort(value: number): void {
        return super.put("port", value);
    }

    public getUri(): string {
        return this.getProtocol() + "://" + this.getHost() + ":" + this.getPort();
    }

    public static fromString(line: string): ConnectionParams {
        let map: StringValueMap = StringValueMap.fromString(line);
        return new ConnectionParams(map);
    }

    public static manyFromConfig(config: ConfigParams, configAsDefault: boolean = true): ConnectionParams[] {
        let result: ConnectionParams[] = [];
        let connections: ConfigParams = config.getSection("connections");

        if (connections.getCount() > 0) {
            let connectionSections: string[] = connections.getSectionNames();
            for (let index: 0; index < connectionSections.length; index++) {
                let connection: ConfigParams = connections.getSection(connectionSections[index]);
                result.push(new ConnectionParams(connection));
            }
        } else {
            let connection: ConfigParams = config.getSection("connection");
            if (connection.getCount() > 0)
                result.push(new ConnectionParams(connection));
            else
                result.push(new ConnectionParams(config));
        }

        return result;
    }

    public static fromConfig(config: ConfigParams, configAsDefault: boolean = true) {
        let connections: ConnectionParams[] = this.manyFromConfig(config, configAsDefault);
        return connections.length > 0 ? connections[0] : null;
    }

}