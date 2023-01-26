import { range } from './range'
import { fold } from './fold'

let numbers: number[] = range(1, 10 + 1)
// let result = fold(numbers, (result, value) => result + value, 0)
let result = numbers
    .filter(data => data % 2 !== 0)
    .reduce((cal, cur) => cal + cur, 0)
console.log(result)