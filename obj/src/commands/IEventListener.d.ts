import { IEvent } from './IEvent';
import { Parameters } from '../run/Parameters';
/**
 * Listener for command events
 */
export interface IEventListener {
    /**
     * Notifies that event occurred.
     * @param event event reference
     * @param correlationId a unique correlation/transaction id
     * @param value event arguments
     */
    onEvent(correlationId: string, event: IEvent, args: Parameters): void;
}
