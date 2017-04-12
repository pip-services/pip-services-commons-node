import { TypeCode } from '../convert/TypeCode';
import { ObjectSchema } from './ObjectSchema';

export class PagingParamsSchema extends ObjectSchema {

    public constructor() {
        super();
        this.withOptionalProperty("skip", TypeCode.Long);
        this.withOptionalProperty("take", TypeCode.Long);
        this.withOptionalProperty("total", TypeCode.Boolean);
    }

}
