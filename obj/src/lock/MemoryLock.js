"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Lock_1 = require("./Lock");
var MemoryLock = /** @class */ (function (_super) {
    __extends(MemoryLock, _super);
    function MemoryLock() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._locks = {};
        return _this;
    }
    MemoryLock.prototype.tryAcquireLock = function (correlationId, key, ttl, callback) {
        var expireTime = this._locks[key];
        var now = new Date().getTime();
        if (expireTime == null || expireTime < now) {
            this._locks[key] = now + ttl;
            callback(null, true);
        }
        else {
            callback(null, false);
        }
    };
    MemoryLock.prototype.releaseLock = function (correlationId, key, callback) {
        delete this._locks[key];
        if (callback)
            callback(null);
    };
    return MemoryLock;
}(Lock_1.Lock));
exports.MemoryLock = MemoryLock;
//# sourceMappingURL=MemoryLock.js.map