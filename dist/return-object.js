"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePerson = void 0;
var makePerson = function (name, age) {
    if (age === void 0) { age = 10; }
    var person = { name: name, age: age };
    return person;
};
exports.makePerson = makePerson;
console.log((0, exports.makePerson)('Jack')); // {name: 'Jack', age: 10}
console.log((0, exports.makePerson)('Jane', 33)); // {name: 'Jane', age: 33}
