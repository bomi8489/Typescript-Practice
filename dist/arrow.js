"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePerson = void 0;
var makePerson = function (name, age) {
    if (age === void 0) { age = 10; }
    return ({ name: name, age: age });
};
exports.makePerson = makePerson;
console.log((0, exports.makePerson)('Jack'));
console.log((0, exports.makePerson)('Jane', 33));
