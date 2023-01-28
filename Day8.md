# Typescript day8

## 반복기와 생성기

### 반복기

- 반복기와 반복기 제공자

    for...of 구문은 다음 코드처럼 타입에 무관하게 배열에 담긴 값을 차례로 얻는 데 활용한다.

    ```
    const numArray: number[] = [1, 2, 3]
    for(let value of numArray)
        console.log(value)

    const strArray: string[] = ['hello', 'world', '!']
    for(let value of strArray)
        console.log(value)
    ```

    for...of 구문은 다른 프로그래밍 언어에서도 '반복기(iterator)'라는 주제로 흔히 찾아볼 수 있다. 대부분의 프로그래밍 언어에서 반복기는 다음과 같은 특징이 있는 객체다.

    - next라는 이름의 메서드를 제공한다
    - next 메서드는 value와 done이라는 두 개의 속성을 가진 객체를 반환한다

    다음 코드에서 createRangeIterable 함수는 next 메서드가 있는 객체를 반환하므로 이 함수는 반복기를 제공하는 역할을 한다. 반복기를 제공하는 역할을 하는 함수를 '반복기 제공자'라고 한다

    ```
    export const createRangeIterable = (from: number, to: number) => {
        let currentValue = from
        return {
            nexe() {
                const value = currentValue < to ? currentValue++ : undefined
                const done = value == undefined
                return {value, done}
            }
        }
    }
    ```

    다음은 createRangeIterable 함수가 제공하는 반복기를 사용하는 예이다.

    ```
    import {createRangeIterable} from './createRangeIterable'
    const iterator = createRangeIterable(1, 3+1)
    while(true) {
        const {value, done} = iterator.nexe()   // 반복기 동작
        if(done) break
        console.log(value)
    }
    ```

<br>

- for...of 구문과 [Symbol.iterator] 메서드

    range 함수는 for...of 구문의 fo 뒤에 올 수 있다

    ```
    import {range} from './range'
    for(let value of range(1, 3+1))
        console.log(value)
    ```

    그러나 앞아서 작성한 createRangeIterable 함수를 for...of 구문에 적용하면 `[Symbol.iterator]() 메서드가 없다`는 오류가 발생한다.

    ```
    // 오류코드
    import {createRangeIterable} from './createRangeIterable'
    const iterable = createRangeIterable(1, 3+1)
    for(let value of iterable)
        console.log(value)
    ```

    위의 코드의 오류 해결법은 createRangeIterable 함수를 다음 RangeIterable 처럼 클래스로 구현해야 한다. RangeIterable 클래스는 3행에서 [Symbol.iterator] 메서드를 구현하고 있다.

    ```
    export class RangeIterable {
        constructor(public from: number, public to: number) {}
        [Symbol.iterator]() {
            const that = this
            let currentValue = that.from
            return {
                next() {
                    const value = currentValue < that.to ? currentValue++ : undefined
                    const done = value == undefined
                    return {value, done}
                }
            }
        }
    }
    ```

    createRangeIterable 함수와 달리 RangeIterable 클래스는 다음 코드에서 보듯 range 함수 처럼 for...of 구문의 of 뒤에 올 수 있다

    ```
    import { RangeIterable } from './RangeIterable'
    const iterator = new RangeIterable(1, 3 + 1)

    for (let value of iterator)
        console.log(value)
    ```

<br>

- Iterable<T> 와 Iterator<T> 인터페이스

    타입스크립트는 반복기 제공자에 Iterable<T>와 Iterator<T> 제네릭 인터페이스를 사용할 수 있다. Iterable<T>는 다음처럼 자신을 구현하는 클래스가 [Symbol.iterator] 메서드를 제공한다는 것을 명확하게 알려주는 역할을 한다.

    `class 구현 클래스 implements Iterable<생성할 값의 타입> {}`

    또한, Iterator<T>는 반복기가 생성할 값의 타입을 명확하게 해준다.

    `[Symbol.iterator](): Iterator<생성할 값을 타입> {}`

    다음 코드는 반복기 제공자를 타입스크립트가 제공하는 Iterable<T>와 Iterator<T>를 사용해 구현한 예이다.

    ```
    export class StringIterable implements Iterable<string> {
        constructor(private strings: string[] = [], private currentIndex: number = 0) {}
        [Symbol.iterator](): Iterator<string> {
            const that = this
            let currentIndex = that.currentIndex, length = that.strings.length

            const iterator: Iterator<string> = {
                next(): {value: string, done: boolean} {
                    const value = currentIndex < length ? that.strings[currentIndex++] : undefined
                    const done = value == undefined
                    return {value, done}
                }
            }
            return iterator
        }
    }
    ```

    테스트 코드를 작성해 실행하면 StringIterable 클래스의 strings 속성에 담긴 배열의 아이템을 하나씩 출력한다.

    ```
    import {StringIterable} from './StringIterable'
    for(let value of new StringIterable(['hello', 'world', '!']))
        console.log(value)
    ```
