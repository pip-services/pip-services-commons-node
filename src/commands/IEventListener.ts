import { IEvent } from './IEvent';
import { Parameters } from '../run/Parameters';

export interface IEventListener {
    onEvent(correlationId: string, event: IEvent, args: Parameters): void;
}
