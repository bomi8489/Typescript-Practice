import { createRangeIterable } from './createRangeIterable'
const iterator = createRangeIterable(1, 3 + 1)
while (true) {
    const { value, done } = iterator.nexe()   // 반복기 동작
    if (done) break
    console.log(value)
}