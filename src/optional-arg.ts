function fn(arg1: string, arg2?: number): void {
    console.log(`arg2: ${arg2}`)
}

fn('hello', 1)
fn('hello')