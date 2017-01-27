import { CredentialParams } from './CredentialParams';
import { ConfigParams } from '../config/ConfigParams';
import { IReferences } from '../refer/IReferences';
export declare class CredentialResolver {
    private readonly _credentials;
    private _references;
    constructor(config?: ConfigParams, references?: IReferences);
    setReferences(references: IReferences): void;
    configure(config: ConfigParams, configAsDefault?: boolean): void;
    getAll(): CredentialParams[];
    add(connection: CredentialParams): void;
    lookupInStores(correlationId: string, credential: CredentialParams, callback: (err: any, result: CredentialParams) => void): void;
    lookup(correlationId: string, callback: (err: any, result: CredentialParams) => void): void;
}
