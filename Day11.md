# Typescript day11

## Promise와 async/await 구문

### Promise

- then-체인

    Promise의 then 인스턴스 메서드를 호출할 때 사용된 콜백 함수는 값을 반호나할 수 있다. then에서 반환된 값은 또 다른 then 메서드를 호출해 값을 수신할 수 있다. then메서드는 반환된 값이 Promise타입이면 resolve 값을 반환한다. 만약 reject 값일 때는 catch 메서드에서 이 값을 얻을 수 있다.

    Promise 객체에 then 메서드를 여러 번 호출하는 코드 형태를 `then-chain`이라고 한다. 

    ```
    Promise.resolve(1)
        .then((value: number) => {
            console.log(value)
            return Promise.resolve(true)
        })
        .then((value: boolean) => {
            console.log(value)
            return [1, 2, 3]
        })
        .then((value: number[]) => {
            console.log(value)
            return {name: 'jack', age: 32}
        })
        .then((value: {name: string, age: number}) => {
            console.log(value)
        })
    ```

<br>

- Promise.all 메서드

    Array 클래스는 every라는 이름의 인스턴스 메서드를 제공한다. every 메서드는 배열의 모든 아이템이 어떤 조건을 만족하면 true를 반환한다. 다음 코드에서 isAllTrue 함수는 every 메서드를 사용해 배열에 담긴 값이 모두 true인지 확인한다.

    ```
    const isAllTrue = (values: boolean[]) => values.every((value => value == true))

    console.log(
        isAllTrue([true, true, true]),
        isAllTrue([false, true, true])
    )
    ```

    Promise 클래스는 every처럼 동작하는 all이라는 이름의 클래스 메서드를 제공한다.

    `all(프로미스 객체 배열: Promise[]): Promise<resolve한 값들의 배열(혹은 any)>`

    Promise.all 메서드는 Promise 객체들을 배열 형태로 받아, 모든 객체를 대상으로 해소(resolve)된 값들의 배열로 만들어 준다. Promise.all 메서드는 이런 내용으로 구성된 또 다른 Promise 객체를 반환하므로 해소된 값들의 배열은 then 메서드를 호출해서 얻어야 한다. 만약 배열에 담긴 Promise 객체중 거절(reject) 객체가 발생하면 더 기다리지 않고 해당 거절된 값들을 담은 Promise.reject 객체를 반환한다. 이 거절된 값은 catch 메서드를 통해 얻는다.

    ```
    const getAllResolvedResult = <T>(promises: Promise<T>[]) => Promise.all(promises)

    getAllResolvedResult<any>([Promise.resolve(true), Promise.resolve('hello')])
        .then(result => console.log(result))

    getAllResolvedResult<any>([Promise.reject(new Error('error')), Promise.resolve(1)])
        .then(result => console.log(result))
        .catch(error => console.log('error:', error.message))
    ```

<br>

- Promise.race 메서드

    Array 클래스는 배열의 내용 중 하나라도 조건을 만족하면 true를 반환하는 some이라는 인스턴스 메서드를 제공한다.

    ```
    const isAnyTrue = (values: boolean[]) => values.some((value => value == true))

    console.log(
        isAnyTrue([false, true, false]),
        isAnyTrue([false, false, false])
    )
    ```

    Promise.race 클래스 메서드는 배열에 담긴 프로미스 객체 중 하나라도 해소(resolve)되면 이 값을 담은 Promise.resolve 객체를 반환한다. 만일 거절(reject) 값이 가장 먼저 발생하면 Promise.reject 객체를 반환한다.

    `race(프로미스 객체 배열: Promise[]): Promise<가장 먼저 해소된 객체의 값 타입(혹은 Error)>`

    다음 코드에서 2행의 true는 출력되는데 그 이유는 배열에 담긴 프로미스 객체들의 순서가 Promise.resolve(true)가 먼저기 때문이다. 그러므로 4행에서 역시 Promise.resolve(true)가 먼저기 때문에 6행의 catch문은 호출되지 않는다. 반대로 8행은 Promise.reject()가 먼저이므로 9행의 then문은 실행되지 않고 10행의 catch문이 실행된다.

    ```
    Promise.race([Promise.resolve(true), Promise.resolve('hello')])
        .then(value => console.log(value))

    Promise.race([Promise.resolve(true), Promise.reject(new Error('hello'))])
        .then(value => console.log(value))
        .catch(error => console.log(error.message))

    Promise.race([Promise.reject(new Error('error')), Promise.resolve(true)])
        .then(value => console.log(value))
        .catch(error => console.log(error.message))
    ```