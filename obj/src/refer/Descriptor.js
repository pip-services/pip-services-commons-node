"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var Descriptor = /** @class */ (function () {
    /**
     * Creates instance of a component locator
     * @param group - logical group: 'pip-services-runtime', 'pip-services-logging'
     * @param type - logical type: 'cache', 'services' or 'controllers'
     * @param kind - implementation: 'memory', 'file' or 'memcached'
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
    /**
     * Gets a component group
     * @return a component group
     */
    Descriptor.prototype.getGroup = function () {
        return this._group;
    };
    /**
     * Gets a component type
     * @return a component type
     */
    Descriptor.prototype.getType = function () {
        return this._type;
    };
    /**
     * Gets a component kind
     * @return a component kind
     */
    Descriptor.prototype.getKind = function () {
        return this._kind;
    };
    /**
     * Gets a component name
     * @return a component name
     */
    Descriptor.prototype.getName = function () {
        return this._name;
    };
    /**
     * Gets an implementation version
     * @return an implementation version
     */
    Descriptor.prototype.getVersion = function () {
        return this._version;
    };
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
        return this.matchField(this._group, descriptor.getGroup())
            && this.matchField(this._type, descriptor.getType())
            && this.matchField(this._kind, descriptor.getKind())
            && this.matchField(this._name, descriptor.getName())
            && this.matchField(this._version, descriptor.getVersion());
    };
    Descriptor.prototype.exactMatchField = function (field1, field2) {
        if (field1 == null && field2 == null)
            return true;
        if (field1 == null || field2 == null)
            return false;
        return field1 == field2;
    };
    Descriptor.prototype.exactMatch = function (descriptor) {
        return this.exactMatchField(this._group, descriptor.getGroup())
            && this.exactMatchField(this._type, descriptor.getType())
            && this.exactMatchField(this._kind, descriptor.getKind())
            && this.exactMatchField(this._name, descriptor.getName())
            && this.exactMatchField(this._version, descriptor.getVersion());
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