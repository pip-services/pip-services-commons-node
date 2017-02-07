import { IEventListener } from './IEventListener';
import { INotifiable } from '../run/INotifiable';
export interface IEvent extends INotifiable {
    getName(): string;
    getListeners(): IEventListener[];
    addListener(listener: IEventListener): void;
    removeListener(listener: IEventListener): void;
}
