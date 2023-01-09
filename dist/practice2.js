"use strict";
function sum(x, y) {
    return x + y;
}
console.log(sum(1, 2));
function sumArray(numbers) {
    return numbers.reduce(function (acc, cur) { return acc + cur; }, 0);
}
var total = sumArray([1, 2, 3, 4, 5]);
console.log(total);
