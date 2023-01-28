export const createRangeIterable = (from: number, to: number) => {
    let currentValue = from
    return {
        nexe() {
            const value = currentValue < to ? currentValue++ : undefined
            const done = value == undefined
            return { value, done }
        }
    }
}