
export class Counter {
    private _name: string;
    private _type: number;
    private _last: number;
    private _count: number;
    private _min: number;
    private _max: number;
    private _average: number;
    private _time: Date;

    public constructor(name: string, type: number) {
        this._name = name;
        this._type = type;
    }

    public getName() : string { return this._name; }
    public setName(name: string) : void { this._name = name; }

    public getType() : number { return this._type; }
    public setType(type: number) : void { this._type = type; }

    public getLast() : number { return this._last; }
    public setLast(last: number) : void { this._last = last; }

    public getCount() : number { return this._count; }
    public setCount(count: number) : void { this._count = count; }

    public getMin() : number { return this._min; }
    public setMin(min: number) : void { this._min = min; }

    public getMax() : number { return this._max; }
    public setMax(max: number) : void { this._max = max; }

    public getAverage() : number { return this._average; }
    public setAverage(average: number) : void { this._average = average; }

    public getTime() : Date { return this._time; }
    public setTime(time: Date) : void { this._time = time; }
}