import { ConfigParams } from '../config/ConfigParams';
import { IReconfigurable } from '../config/IReconfigurable';
export declare class ContextInfo implements IReconfigurable {
    private _name;
    private _description;
    private _contextId;
    private _startTime;
    private _properties;
    constructor(name?: string, description?: string);
    configure(config: ConfigParams): void;
    name: string;
    description: string;
    contextId: string;
    startTime: Date;
    readonly uptime: number;
    properties: any;
    static fromConfig(config: ConfigParams): ContextInfo;
}
