interface User {
    firstName: string,
    lastName: string,
    sayHi(name: string): string
    fullName(): string
}

interface Human {
    health: number
}

class Player implements User, Human {
    constructor(
        public firstName: string,
        public lastName: string,
        public health: number
    ) { }
    fullName(): string {
        return `${this.firstName} ${this.lastName}`
    }
    sayHi(name: string) {
        return `Hello ${name}. My name is ${this.fullName()}`
    }
}
const KB = new Player("KiBeom", "Kwon", 28)

/////
//타입스크립트에게 오브젝트 모양을 알려주고 싶다면 type과 interface를 쓸수있다
type PlayerA = {
    name: string
}
type PlayerAA = PlayerA & {
    lastName: string
}
const playerA: PlayerAA = {
    name: "bomi",
    lastName: "kim"
}

interface PlayerB {
    name: string
}
interface PlayerBB extends PlayerB {
    lastName: string
}
interface PlayerBB {
    health: number
}
const playerB: PlayerBB = {
    name: "bomi",
    lastName: "kim",
    health: 28
}
console.log(playerA, playerB)