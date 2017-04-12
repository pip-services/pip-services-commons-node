import { TypeCode } from '../convert/TypeCode';
import { MapSchema } from './MapSchema';

export class FilterParamsSchema extends MapSchema {

    public constructor() {
        super(null, null, TypeCode.String, null);
    }

}
