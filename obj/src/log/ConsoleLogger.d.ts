import { IDescriptable } from '../refer/IDescriptable';
import { Descriptor } from '../refer/Descriptor';
import { LogLevel } from './LogLevel';
import { Logger } from './Logger';
export declare class ConsoleLogger extends Logger implements IDescriptable {
    static readonly descriptor: Descriptor;
    constructor();
    getDescriptor(): Descriptor;
    protected write(level: LogLevel, correlationId: string, ex: Error, message: string): void;
}
