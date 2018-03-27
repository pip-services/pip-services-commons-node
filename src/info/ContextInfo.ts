let os = require('os');

import { IdGenerator } from '../data/IdGenerator';
import { StringValueMap } from '../data/StringValueMap';
import { ConfigParams } from '../config/ConfigParams';
import { IReconfigurable } from '../config/IReconfigurable';

export class ContextInfo implements IReconfigurable {	
	private _name: string = "unknown";
	private _description: string = null;
	private _contextId: string = os.hostname(); // IdGenerator.nextLong();
	private _startTime: Date = new Date();
	private _properties: StringValueMap = new StringValueMap();

	public constructor(name?: string, description?: string) {
		this._name = name || "unknown";
		this._description = description || null;
	}

	public configure(config: ConfigParams): void {
		this.name = config.getAsStringWithDefault("name", this.name);
		this.description = config.getAsStringWithDefault("description", this.description);		
		this.properties = config.getSection("properties");
	}
	
	public get name(): string { return this._name; }
	public set name(value: string) { this._name = value || "unknown"; }
	
	public get description(): string { return this._description; }
	public set description(value: string) { this._description = value; }
	
	public get contextId(): string { return this._contextId; }
	public set contextId(value: string) { this._contextId = value; }
	
	public get startTime(): Date { return this._startTime; }
	public set startTime(value: Date) { this._startTime = value || new Date(); }
	
	public get uptime(): number {
		return new Date().getTime() - this._startTime.getTime();
	}

	public get properties(): any { return this._properties; }
	public set properties(properties: any) {
		this._properties = StringValueMap.fromValue(properties);
	}
	
	public static fromConfig(config: ConfigParams): ContextInfo {
		let result = new ContextInfo();
		result.configure(config);
		return result;
	}
}
