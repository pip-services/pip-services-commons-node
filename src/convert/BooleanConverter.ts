let _ = require('lodash');

export class BooleanConverter {

    public static toNullableBoolean(value: any): boolean {
        if (value == null) return null;
        if (_.isBoolean(value)) return value;
        if (_.isNumber(value)) return !!value;

        value = value.toString().toLowerCase();

        if (value == '1' || value == 'true' || value == 't'
            || value == 'yes' || value == 'y')
            return true;

        if (value == '0' || value == 'false' || value == 'f'
            || value == 'no' || value == 'n')
            return false;

        return null;
    }

    public static toBoolean(value: any): boolean {
        return BooleanConverter.toBooleanWithDefault(value, false);
    }

    public static toBooleanWithDefault(value: any, defaultValue: boolean = false): boolean {
        var result = BooleanConverter.toNullableBoolean(value);
        return result != null ? result : defaultValue;
    }

}