import { IEventListener } from './IEventListener';
import { INotifiable } from '../run/INotifiable';
export interface IEvent extends INotifiable {
    name: string;
    listeners: IEventListener[];
    addListener(listener: IEventListener): void;
    removeListener(listener: IEventListener): void;
}
