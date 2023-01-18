export class A {
    value: number = 2
    method: () => void = (): void => {
        console.log(`value: ${this.value}`)
    }
}