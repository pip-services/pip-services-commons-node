import { IDescriptable } from '../refer/IDescriptable';
import { Descriptor } from '../refer/Descriptor';
import { StringConverter } from '../convert/StringConverter';
import { LogLevel } from './LogLevel';
import { Logger } from './Logger';

export class ConsoleLogger extends Logger implements IDescriptable {

	public static readonly descriptor: Descriptor = new Descriptor("pip-services-commons", "logger", "console", "default", "1.0");
	
    public constructor() {
        super();
    }

	public getDescriptor(): Descriptor {
		return ConsoleLogger.descriptor;
	}

	protected write(level: LogLevel, correlationId: string, ex: Error, message: string): void {
        if (this.getLevel() < level) return;

        let result: string = '[';
        result += correlationId != null ? correlationId : "---";
        result += ':';
        result += level.toString();
        result += ':';
        result += StringConverter.toString(new Date());
        result += "] ";

        result += message;

        if (ex != null) {
            if (message.length == 0)
                result += "Error: ";
            else
                result += ": ";

            result += this.composeError(ex);
        }

        if (level == LogLevel.Fatal || level == LogLevel.Error || level == LogLevel.Warn)
            console.error(result);
        else
            console.log(result);
	}

}
