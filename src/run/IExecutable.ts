import { Parameters } from './Parameters';

/**
 * Interface for active components that can called to execute work.
 * In contrast to IParamExecutable this interface does not require parameters
 */
export interface IExecutable {
	/**
	 * Executes a unit of work
	 * @param correlationId 	unique business transaction id to trace calls across components.
	 * @param args 				set of parameters for execution.
     * @param callback 			function to call when execution is complete.
	 */
	execute(correlationId: string, args: Parameters, callback: (err: any, result: any) => void): void;
}
