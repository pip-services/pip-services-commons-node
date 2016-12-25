import { Parameters } from './Parameters';

/**
 * Interface for active components that can called to execute work.
 * In contrast to IParamExecutable this interface does not require parameters
 */
export interface IExecutable {
	/**
	 * Executes a unit of work
	 * @param correlationId a unique transaction id to trace calls across components
	 * @param args a set of parameters for execution
     * @param callback a function to call back when execution is complete
	 */
	execute(correlationId: string, args: Parameters, callback: (err: any, result: any) => void): void;
}
