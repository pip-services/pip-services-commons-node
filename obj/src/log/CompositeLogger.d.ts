import { Logger } from './Logger';
import { LogLevel } from './LogLevel';
import { IDescriptable } from '../refer/IDescriptable';
import { IReferences } from '../refer/IReferences';
import { IReferenceable } from '../refer/IReferenceable';
import { Descriptor } from '../refer/Descriptor';
export declare class CompositeLogger extends Logger implements IReferenceable, IDescriptable {
    static readonly descriptor: Descriptor;
    private readonly _loggers;
    constructor(references?: IReferences);
    getDescriptor(): Descriptor;
    setReferences(references: IReferences): void;
    protected write(level: LogLevel, correlationId: string, error: Error, message: string): void;
}
