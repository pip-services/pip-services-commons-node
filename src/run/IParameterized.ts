import { Parameters } from './Parameters';

/**
 * Interface for components that require parameters
 */
export interface IParameterized {
	/**
	 * Sets component configuration parameters
	 * @param parameters configuration parameters
	 * @throws ConfigException when configuration is wrong
	 */
	setParameters(parameters: Parameters): void;
}
