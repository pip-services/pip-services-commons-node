import { IEvent } from './IEvent';
import { Parameters } from '../run/Parameters';

/**
 * Listener for command events
 */
export interface IEventListener {
	/**
	 * Notifies that event occurred.
	 * @param event 			event reference.
	 * @param correlationId 	unique business transaction id to trace calls across components.
	 * @param value 			event arguments.
	 */
    onEvent(correlationId: string, event: IEvent, args: Parameters): void;
}
