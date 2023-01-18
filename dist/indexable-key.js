"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeObject = void 0;
var makeObject = function (key, value) {
    var _a;
    return (_a = {}, _a[key] = value, _a);
};
exports.makeObject = makeObject;
console.log((0, exports.makeObject)('name', 'Jack'));
console.log((0, exports.makeObject)('firstName', 'Jane'));
