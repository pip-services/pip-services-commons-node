import { Parameters } from './Parameters';
/**
 * Helper class that triggers execution for components
 */
export declare class Executor {
    /**
     * Triggers execution for component that implement IExecutable and IParamExecutable interfaces
     * and passes to IParamExecutable them set of parameters.
     * @param correlationId a unique transaction id to trace calls across components
     * @param component a components to be executed
     * @param args a set of parameters to pass to executed components
     * @param callback a function to call back with results when execution is complete
     */
    static executeOne(correlationId: string, component: any, args: Parameters, callback: (err: any, result: any) => void): any;
    /**
     * Triggers execution for components that implement IExecutable and IParamExecutable interfaces
     * and passes to IParamExecutable them set of parameters.
     * @param correlationId a unique transaction id to trace calls across components
     * @param components a list of components to be executed
     * @param args a set of parameters to pass to executed components
     * @param callback a function to call back with results when execution is complete
     */
    static execute(correlationId: string, components: any[], args: Parameters, callback: (err: any, results: any[]) => void): void;
}
