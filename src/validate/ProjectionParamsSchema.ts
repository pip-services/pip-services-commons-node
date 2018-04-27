import { TypeCode } from '../convert/TypeCode';
import { ArraySchema } from './ArraySchema';

export class ProjectionParamsSchema extends ArraySchema {

    public constructor() {
        super(TypeCode.String);
    }

}
