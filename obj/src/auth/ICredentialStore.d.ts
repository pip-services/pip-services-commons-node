import { CredentialParams } from './CredentialParams';
export interface ICredentialStore {
    store(correlationId: string, key: String, credential: CredentialParams, callback: (err: any) => void): void;
    lookup(correlationId: string, key: string, callback: (err: any, result: CredentialParams) => void): void;
}
