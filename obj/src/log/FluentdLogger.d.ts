import { ConfigParams } from '../config/ConfigParams';
import { IReferences } from '../refer/IReferences';
import { IReferenceable } from '../refer/IReferenceable';
import { IOpenable } from '../run/IOpenable';
import { CachedLogger } from './CachedLogger';
import { LogMessage } from './LogMessage';
export declare class FluentdLogger extends CachedLogger implements IReferenceable, IOpenable {
    private _connectionResolver;
    private _reconnect;
    private _timeout;
    private _client;
    constructor();
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    isOpened(): boolean;
    open(correlationId: string, callback: (err: any) => void): void;
    close(correlationId: string, callback: (err: any) => void): void;
    protected save(messages: LogMessage[]): void;
}
