# Typescript day9

## 반복기와 생성기

### 생성기

ESNext 자바스크립트와 타입스크립트는 `yield`라는 키워드를 제공한다. yield는 마치 return 키워드처럼 값을 반환한다. yield는 반드시 `function*` 키워드를 사용한 함수에서만 호출할 수 있다. 이렇게 function* 키워드로 만든 함수를 '생성기(generator)'라고 한다.

다음 코드의 1행은 function* 키워드로 만든 generator 함수이다. generator 함수의 몸통은 5행에서 yield 문을 3회 반복해서 호출하도록 구현하였다.

```
export function* generator() {
    console.log('generator started...')
    let value = 1
    while(value < 4)
        yield value++
    console.log('generator finished...')
}
```

> test code
```
import { generator } from './generator'
for (let value of generator())
    console.log(value)
```

<br>

- setInterval 함수와 생성기의 유사성

    생성기가 동작하는 방식을 '세미코루틴(semi-coroutine, 반협동 루틴)'이라고 한다. 세미코루틴은 타입스크립트처럼 단일 스레드로 동작하는 프로그래밍 언어가 마치 다중 스레드로 동작하는 것처럼 보이게 하는 기능을 한다. 

    자바스크립트가 기본으로 제공하는 setInterval 함수를 사용해 세미코루틴의 동작 방식을 알아보자. setInterval 함수는 지정한 주기로 콜백 함수를 계속 호출해 준다.

    `const intervalID = setInterval(콜백함수, 호출 주기)`

    setInterval 함수는 무한히 반복하지만 clearInterval 함수를 사용하면 멈출 수 있다.

    `clearIntervall(intervalID)`

    다음 코드는 setInterval 함수를 사용해 1초 간격으로 1부터 3까지 출력하는 예이다.

    ```
    const period = 1000
    let count = 0
    console.log('program started...')
    const id = setInterval(() => {
        if(count >= 3) {
            clearInterval(id)
            console.log('program finished...')
        }
        else console.log(++count)
    }, period)
    ```

    프로그램의 출력 내용만 보면 생성기 방식과 구분할 수 없을 정도로 비슷하다. setInterval 함수가 동작하는 구조는 C++ 언어의 스레드가 동작하는 방식과 흡사한 면이 있다. 즉 'program started...'를 출력하고 setInterval을 동작시킨 부분이 메인 스레드, setInterval의 콜백 함수는 작업 스레드를 떠올리게 한다.


<br>

- function*

    앞에서 본 generator 함수는 지금까지의 함수와 비교했을 때 두 가지 차이가 있다.

    - function* 키워드로 함수를 선언한다
    - 함수 몸통 안에 yield 키워드가 있다

    즉, function* 키워드로 선언된 함수가 생성기인데, 생성기는 오직 function* 키워드로 선언해야 하므로 화살표 함수로는 생성기를 만들 수 없다. 생성기는 반복기를 제공하는 반복기 제공자로서 동작한다.

<br>

- yield

    생성기 함수 안에서 yield 문을 사용할 수 있다. yield는 연산자(operator) 형태로 동작하며 두 가지 기능을 한다.

    - 반복기를 자동으로 만들어 준다
    - 반복기 제공자 역할 수행한다

    다음은 function* 키워드를 이용해 생성기 형태로 rangeGenerator라는 이름의 함수를 만든 것이다.

    ```
    export function* rangeGenerator(from: number, to: number) {
        let value = from
        while(value < to) {
            yield value++
        }
    }
    ```

    다음은 rangeGenerator를 테스트하는 코드이다.

    ```
    import {rangeGenerator} from './rangeGenerator'

    let iterator = rangeGenerator(1, 3 + 1)
    while(1) {
        const {value, done} = iterator.next()
        if(done) break
        console.log(value)
    }

    for(let value of rangeGenerator(4, 6 + 1))
        console.log(value)
    ```

<br>

- 반복기 제공자의 메서드로 동작하는 생성기 구현

    반복기를 공부할 때 StringIterable 클래스로 반복기 제공자를 구현하였었다. 그런데 생성기는 반복기를 제공하는 반복기 제공자로서 동작하므로, 생성기를 사용하면 StringIterable 클래스를 다음처럼 간결하게 구현할 수 있다.

    ```
    export class IterableUsingGenerator<T> implements Iterable<T> {
        constructor(private values: T[] = [], private currentIndex: number = 0) {}
        [Symbol.iterator] = function* () {
            while(this.currentIndex < this.values.length)
                yield this.value[this.currentIndex++]
        }
    }
    ```

<br>

- yield*

    타입스크립트는 yield 키워드 뒤에 *을 붙인 yield* 키워드도 제공한다. yield는 단순히 값을 대상으로 동작하지만, yield*는 다른 생성기나 배열을 대상으로 동작한다.

    ```
    function* gen12() {
        yield 1
        yield 2
    }

    export function* gen12345() {
        yield* gen12()
        yield* [3, 4]
        yield 5
    }
    ```

    6행의 gen12345함수는 1부터 5까지 5개의 값을 생성하는 생성기이다. 그런데 이 생성기는 또 다른 생성기인 gen12 함수를 yield* 키워드로 호출해 값 1과 2를 생성하고 3, 4는 배열에 든 값을, 마지막 5는 단순히 yield문으로 생성한다. 

    다음 테스트 코드는 1부터 5까지 수를 출력하는데, 이로부터 yield*의 동작 방식을 이해할 수 있다.

    ```
    import {gen12345} from './yield-star'

    for(let value of gen12345())
        console.log(value)
    ```

<br>

- yield 반환값

    yield 연산자는 값을 반환한다. 다음 코드에서 5행은 yield 연산자의 반환값을 select라는 변수에 저장한다.

    ```
    export function* gen() {
        let count = 5
        let select = 0
        while(count--){
            select = yield `you select ${select}`
        }
    }
    export const random = (max, min=0) => Math.round(Math.random() * (max-min)) + min
    ```

    yield 연산자의 반환값은 반복기의 next 메서드 호출 때 매개변수에 전달하는 값이다. 다음 테스트 코드에서 4행은 next 메서드 호출 때 난수를 생성해 전달한다.

    ```
    import {random, gen} from './yield-return'
    const iter = gen()
    while(true) {
        const {value, dome} = iter.next(random(10, 1))
        if(done) break
        console.log(value)
    }
    ```

    코드를 실행하면 첫 줄 외에 다른 줄은 모두 난수가 출력된다. 첫 줄은 항상 'you select 0'이 출력되는데, 3행에서 select 변수를 0으로 설정했기 때문이다. 실행 결과는 이전에 next 메서드가 전달한 값이 다시 gen 함수의 내부 로직에 의해 현재의 value 값이 되어 출력된다.