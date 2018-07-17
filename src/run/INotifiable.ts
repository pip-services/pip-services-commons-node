import { Parameters } from './Parameters';

/**
 * Interface for active components that can be notified (called without expecting a result).
 * In contrast to IParamNotifiable this interface does not require parameters
 */
export interface INotifiable {
	/**
	 * Executes a unit of work
	 * @param correlationId 	unique business transaction id to trace calls across components.
	 * @param args 				set of parameters for execution.
	 */
	notify(correlationId: string, args: Parameters): void;
}
