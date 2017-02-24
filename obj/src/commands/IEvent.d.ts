import { IEventListener } from './IEventListener';
import { INotifiable } from '../run/INotifiable';
/**
 * Interface for command events.
 */
export interface IEvent extends INotifiable {
    /**
     * Gets the event name
     */
    getName(): string;
    /**
     * Get listeners that receive notifications for that event
     */
    getListeners(): IEventListener[];
    /**
     * Adds listener to receive notifications
     * @param listener a listener reference to be added
     */
    addListener(listener: IEventListener): void;
    /**
     * Removes listener for event notifications.
     * @param listener a listener reference to be removed
     */
    removeListener(listener: IEventListener): void;
}
