function sum(x: number, y: number): number {
    return x + y;
}

console.log(sum(1, 2));

function sumArray(numbers: number[]): number {
    return numbers.reduce((acc, cur) => acc + cur, 0);
}

const total = sumArray([1, 2, 3, 4, 5]);
console.log(total);