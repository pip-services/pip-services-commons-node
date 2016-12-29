import { ValidationResultType } from './ValidationResultType';

export class ValidationResult {
    private _path: string;
    private _type: ValidationResultType;
    private _code: string;
    private _message: string;
    private _expected: any;
    private _actual: any;

    public constructor(path: string = null, type: ValidationResultType = null, code: string = null, message: string = null, expected: any = null, actual: any = null)
    {
        this._path = path;
        this._type = type;
        this._code = code;
        this._message = message;
        this._expected = expected;
        this._actual = actual;
    }

    public get path(): string {
        return this._path; 
    }

    public get type(): ValidationResultType {
        return this._type; 
    }

    public get code(): string {
        return this._code; 
    }

    public get message(): string {
        return this._message; 
    }

    public get expected(): any {
        return this._expected; 
    }

    public get actual(): any {
        return this._actual; 
    }

}
