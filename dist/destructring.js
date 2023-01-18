"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var printPerson = function (_a) {
    var name = _a.name, age = _a.age;
    return console.log("name: ".concat(name, ", age: ").concat(age));
};
printPerson({ name: 'Jack', age: 10 });
