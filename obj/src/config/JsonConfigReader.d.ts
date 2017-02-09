import { ConfigParams } from './ConfigParams';
import { FileConfigReader } from './FileConfigReader';
import { IDescriptable } from '../refer/IDescriptable';
import { Descriptor } from '../refer/Descriptor';
export declare class JsonConfigReader extends FileConfigReader implements IDescriptable {
    constructor(name?: string, path?: string);
    getDescriptor(): Descriptor;
    readObject(correlationId: string): any;
    protected performReadConfig(correlationId: string): ConfigParams;
    static readObject(correlationId: string, path: string): void;
    static readConfig(correlationId: string, path: string): ConfigParams;
}
