import { ConfigParams } from '../config/ConfigParams';
export declare class ConnectionParams extends ConfigParams {
    constructor(values?: any);
    useDiscovery(): boolean;
    getDiscoveryKey(): string;
    setDiscoveryKey(value: string): void;
    getProtocol(defaultValue?: string): string;
    setProtocol(value: string): void;
    getHost(): string;
    setHost(value: string): void;
    getPort(): number;
    setPort(value: number): void;
    getUri(): string;
    setUri(value: string): void;
    static fromString(line: string): ConnectionParams;
    static manyFromConfig(config: ConfigParams): ConnectionParams[];
    static fromConfig(config: ConfigParams): ConnectionParams;
}
