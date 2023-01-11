// interface MyPerson {
//     name: string
//     age: number
// }

// class myPeople implements MyPerson {
//     constructor(public name: string, public age: number, private etc?: boolean) { }
// }

// let pual: MyPerson = new myPeople('Pual', 32, true);

// console.log(pual);

let person: object = { name: 'Jack', age: 32 };
console.log((<{ name: string }>person).name);