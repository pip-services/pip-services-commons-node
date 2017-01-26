import { ValidationResultType } from './ValidationResultType';
export declare class ValidationResult {
    private _path;
    private _type;
    private _code;
    private _message;
    private _expected;
    private _actual;
    constructor(path?: string, type?: ValidationResultType, code?: string, message?: string, expected?: any, actual?: any);
    getPath(): string;
    getType(): ValidationResultType;
    getCode(): string;
    getMessage(): string;
    getExpected(): any;
    getActual(): any;
}
