import { ILogger } from './ILogger';
import { Logger } from './Logger';
import { LogLevel } from './LogLevel';
import { IDescriptable } from '../refer/IDescriptable';
import { IReferences } from '../refer/IReferences';
import { IReferenceable } from '../refer/IReferenceable';
import { Descriptor } from '../refer/Descriptor';

export class CompositeLogger extends Logger implements IReferenceable, IDescriptable {
	private readonly _descriptor: Descriptor = new Descriptor("pip-services-commons", "logger", "composite", "default", "1.0");
	private readonly _loggers: ILogger[] = [];

	public constructor(references: IReferences = null) {
		super();
		this.setReferences(references);
	}

	public getDescriptor(): Descriptor {
		return this._descriptor;
	}

	public setReferences(references: IReferences): void {
		let loggers: any[] = references.getOptional<any>(new Descriptor(null, "logger", null, null, null));
		// there is no interface type checking in ts, so add all loggers without checking if they implement ILogger
		this._loggers.push(...loggers);
	}

	protected write(level: LogLevel, correlationId: string, error: Error, message: string): void {
		for (let index = 0; index < this._loggers.length; index++) 
			this._loggers[index].log(level, correlationId, error, message);
	}
}