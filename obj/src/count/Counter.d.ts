import { CounterType } from './CounterType';
export declare class Counter {
    private _name;
    private _type;
    private _last;
    private _count;
    private _min;
    private _max;
    private _average;
    private _time;
    constructor(name: string, type: CounterType);
    getName(): string;
    setName(name: string): void;
    getType(): CounterType;
    setType(type: CounterType): void;
    getLast(): number;
    setLast(last: number): void;
    getCount(): number;
    setCount(count: number): void;
    getMin(): number;
    setMin(min: number): void;
    getMax(): number;
    setMax(max: number): void;
    getAverage(): number;
    setAverage(average: number): void;
    getTime(): Date;
    setTime(time: Date): void;
}
