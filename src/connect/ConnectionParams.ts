import { ConfigParams } from '../config/ConfigParams';
import { StringValueMap } from '../data/StringValueMap';

export class ConnectionParams extends ConfigParams {
    public constructor(values: any = null) {
        super(values);
    }

    public useDiscovery(): boolean {
        return super.getAsNullableString("discovery_key") != null;
    }

    public getDiscoveryKey(): string {
        return super.getAsString("discovery_key");
    }

    public setDiscoveryKey(value: string): void {
        return super.put("discovery_key", value);
    }

    public getProtocol(defaultValue: string = null): string {
        return super.getAsStringWithDefault("protocol", defaultValue);
    }

    public setProtocol(value: string): void {
        return super.put("protocol", value);
    }

    public getHost(): string {
        let host: string = super.getAsNullableString("host");
        host = host || super.getAsNullableString("ip");
        return host;
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
        return super.getAsString("uri");
    }

    public setUri(value: string): void {
        return super.put("uri", value);
    }

    public static fromString(line: string): ConnectionParams {
        let map: StringValueMap = StringValueMap.fromString(line);
        return new ConnectionParams(map);
    }

    public static manyFromConfig(config: ConfigParams): ConnectionParams[] {
        let result: ConnectionParams[] = [];
        let connections: ConfigParams = config.getSection("connections");

        if (connections.length() > 0) {
            let connectionSections: string[] = connections.getSectionNames();
            for (let index: 0; index < connectionSections.length; index++) {
                let connection: ConfigParams = connections.getSection(connectionSections[index]);
                result.push(new ConnectionParams(connection));
            }
        } else {
            let connection: ConfigParams = config.getSection("connection");
            if (connection.length() > 0)
                result.push(new ConnectionParams(connection));
        }

        return result;
    }

    public static fromConfig(config: ConfigParams) {
        let connections: ConnectionParams[] = this.manyFromConfig(config);
        return connections.length > 0 ? connections[0] : null;
    }

}