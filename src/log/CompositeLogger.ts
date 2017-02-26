import { ILogger } from './ILogger';
import { Logger } from './Logger';
import { LogLevel } from './LogLevel';
import { IReferences } from '../refer/IReferences';
import { IReferenceable } from '../refer/IReferenceable';
import { Descriptor } from '../refer/Descriptor';

export class CompositeLogger extends Logger implements IReferenceable {
	public static readonly descriptor: Descriptor = new Descriptor("pip-services-commons", "logger", "composite", "default", "1.0");
	private readonly _loggers: ILogger[] = [];

	public constructor(references: IReferences = null) {
		super();

		if (references)
			this.setReferences(references);
	}

	public setReferences(references: IReferences): void {
		let loggers: any[] = references.getOptional<any>(new Descriptor(null, "logger", null, null, null));
        for (var i = 0; i < loggers.length; i++) {
            let logger: ILogger = loggers[i];

            if (logger != this as ILogger)
                this._loggers.push(logger);
        }
	}

	protected write(level: LogLevel, correlationId: string, error: Error, message: string): void {
		for (let index = 0; index < this._loggers.length; index++) 
			this._loggers[index].log(level, correlationId, error, message);
	}
}