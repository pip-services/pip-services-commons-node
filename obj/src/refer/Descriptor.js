"use strict";
var ConfigException_1 = require("../errors/ConfigException");
/**
 * Component descriptor used to find a component by its descriptive elements:
 * <ul>
 * <li> logical group: package or other logical group of components like 'pip-services-storage-blocks'
 * <li> component type: identifies component interface like 'controller', 'services' or 'cache'
 * <li> component kind: identifies component implementation like 'memory', 'file' or 'mongodb', ...
 * <li> component name: identifies component internal content, ...
 * <li> implementation version: '1.0', '1.5' or '10.4'
 * </ul>
 */
var Descriptor = (function () {
    /**
     * Creates instance of a component locator
     * @param group - logical group: 'pip-services-runtime', 'pip-services-logging'
     * @param type - external type: 'cache', 'services' or 'controllers'
     * @param kind - internal implementation: 'memory', 'file' or 'memcached'
     * @param name - internal content
     * @param version - implementation version: '1.0'. '1.5' or '10.4'
     */
    function Descriptor(group, type, kind, name, version) {
        if ("*" == group)
            group = null;
        if ("*" == type)
            type = null;
        if ("*" == kind)
            kind = null;
        if ("*" == name)
            name = null;
        if ("*" == version)
            version = null;
        this._group = group;
        this._type = type;
        this._kind = kind;
        this._name = name;
        this._version = version;
    }
    Object.defineProperty(Descriptor.prototype, "group", {
        /**
         * Gets a component group
         * @return a component group
         */
        get: function () {
            return this._group;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Descriptor.prototype, "type", {
        /**
         * Gets a component type
         * @return a component type
         */
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Descriptor.prototype, "kind", {
        /**
         * Gets a component kind
         * @return a component kind
         */
        get: function () {
            return this._kind;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Descriptor.prototype, "name", {
        /**
         * Gets a component name
         * @return a component name
         */
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Descriptor.prototype, "version", {
        /**
         * Gets an implementation version
         * @return an implementation version
         */
        get: function () {
            return this._version;
        },
        enumerable: true,
        configurable: true
    });
    Descriptor.prototype.matchField = function (field1, field2) {
        return field1 == null
            || field2 == null
            || field1 == field2;
    };
    /**
     * Matches this descriptor to another descriptor
     * All '*' or null descriptor elements match to any other value.
     * Specific values must match exactly.
     *
     * @param descriptor - another descriptor to match this one.
     * @return <b>true</b> if descriptors match or <b>false</b> otherwise.
     */
    Descriptor.prototype.match = function (descriptor) {
        return this.matchField(this._group, descriptor.group)
            && this.matchField(this._type, descriptor.type)
            && this.matchField(this._kind, descriptor.kind)
            && this.matchField(this._name, descriptor.name)
            && this.matchField(this._version, descriptor.version);
    };
    Descriptor.prototype.exactMatchField = function (field1, field2) {
        if (field1 == null && field2 == null)
            return true;
        if (field1 == null || field2 == null)
            return false;
        return field1 == field2;
    };
    Descriptor.prototype.exactMatch = function (descriptor) {
        return this.exactMatchField(this._group, descriptor.group)
            && this.exactMatchField(this._type, descriptor.type)
            && this.exactMatchField(this._kind, descriptor.kind)
            && this.exactMatchField(this._name, descriptor.name)
            && this.exactMatchField(this._version, descriptor.version);
    };
    Descriptor.prototype.isComplete = function () {
        return this._group != null && this._type != null && this._kind != null
            && this._name != null && this._version != null;
    };
    Descriptor.prototype.equals = function (value) {
        if (value instanceof Descriptor)
            return this.match(value);
        return false;
    };
    Descriptor.prototype.toString = function () {
        return (this._group || "*")
            + ":" + (this._type || "*")
            + ":" + (this._kind || "*")
            + ":" + (this._name || "*")
            + ":" + (this._version || "*");
    };
    Descriptor.fromString = function (value) {
        if (value == null || value.length == 0)
            return null;
        var tokens = value.split(":");
        if (tokens.length != 5) {
            throw new ConfigException_1.ConfigException(null, "BAD_DESCRIPTOR", "Descriptor " + value + " is in wrong format").withDetails("descriptor", value);
        }
        return new Descriptor(tokens[0].trim(), tokens[1].trim(), tokens[2].trim(), tokens[3].trim(), tokens[4].trim());
    };
    return Descriptor;
}());
exports.Descriptor = Descriptor;
//# sourceMappingURL=Descriptor.js.map