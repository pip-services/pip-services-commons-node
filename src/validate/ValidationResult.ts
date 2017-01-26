import { ValidationResultType } from './ValidationResultType';

export class ValidationResult {
    private _path: string;
    private _type: ValidationResultType;
    private _code: string;
    private _message: string;
    private _expected: any;
    private _actual: any;

    public constructor(path: string = null, type: ValidationResultType = null, code: string = null, message: string = null, 
        expected: any = null, actual: any = null) {
        this._path = path;
        this._type = type;
        this._code = code;
        this._message = message;
        this._expected = expected;
        this._actual = actual;
    }

    public getPath(): string {
        return this._path; 
    }

    public getType(): ValidationResultType {
        return this._type; 
    }

    public getCode(): string {
        return this._code; 
    }

    public getMessage(): string {
        return this._message; 
    }

    public getExpected(): any {
        return this._expected; 
    }

    public getActual(): any {
        return this._actual; 
    }
}
