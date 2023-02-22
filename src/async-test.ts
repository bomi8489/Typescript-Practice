export const test1 = async () => {
    let value = await 1
    console.log(value)
    value = await Promise.resolve(1)
    console.log(value)
}

export async function test2() {
    let value = await 'hello'
    console.log(value)
    value = await Promise.resolve('hello')
    console.log(value)
}