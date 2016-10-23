let _ = require('lodash');

export class MapConverter {

    public static toNullableMap(value: any): any {
        if (value == null) 
            return null;
        else if (_.isArray(value)) {
            let map: any = {};
            for (let i = 0; i < value.length; i++) 
                map[i.toString()] = value[i];
            return map;
        }
        else 
            return _.isObject(value) ? value : null;
    }
    
    public static toMap(value: any): any {
        let map = MapConverter.toNullableMap(value);
        return map != null ? map : {};
    }

    public static toMapWithDefault(value: any, defaultValue: any): any {
        return MapConverter.toNullableMap(value) || defaultValue;
    }

}