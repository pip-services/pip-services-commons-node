let _ = require('lodash');

export class StringConverter {

    public static toNullableString(value: any): string {
        if (value == null) return null;
        if (_.isString(value)) return value;
        if (_.isDate(value)) value.toISOString();
        return value.toString();
    }

    public static toString(value: any): string {
        return StringConverter.toStringWithDefault(value, "");
    }

    public static toStringWithDefault(value: any, defaultValue: string): string {
        return StringConverter.toNullableString(value) || defaultValue;
    }

}