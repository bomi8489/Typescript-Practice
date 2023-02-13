# Typescript day10

## Promise와 async/await 구문

### Promise

자바스크립트에서 프로미스는 `Promise`라는 이름의 클래스이다. 따라서 Promise 클래스를 사용하려면 일단 new 연산자를 적용해 프로미스 객체를 만들어야 한다. 그리고 new 연산자로 프로미스 객체를 만들 때 콜백 함수도 제공해야 한다.

`const promise = new Promise(콜백 함수)`

이 때 Promise의 콜백 함수는 `resolve`와 `reject`라는 두 개의 매개변수를 가진다.

`(resolve, reject) => {}`

타입스크립트에서 Promise는 제네릭 클래스 형태로 사용한다.

```
const numPromise: Promise<number> = new Promise<number>()
const strPromise: Promise<string> = new Promise<string>()
const arrayPromise: Promise<number[]> = new Promise<number[]>()
```

타입스크립트 Promise의 콜백함수는 resolve와 reject 함수를 매개변수로 받는 형태이다.

```
new Promise<T>((
    resolve: (sucessValue: T) => void,
    reject: (any) => void
) => {
    //코드 구현
})
```

<hr><br>

- resolve와 reject 함수

    다음 코드는 비동기 방식 API인 `readFile`을 호출하는 내용을 프로미스로 구현한 내용이다.

    ```
    import {readFile} from 'fs'

    export const readFilePromise = (filename: string): Promise<string> => new Promise<string>((
        resolve: (value: string) => void,
        reject: (error: Error) => void) => {
            readFile(filename, (err: Error, buffer: Buffer) => {
                if(err) reject(err)
                else resolve(buffer.toString())
            })
        }
    ))
    ```

    8행 9행에서 에러가 발생할 때는 reject(err) 함수를 호출하고, 에러 없이 정상적으로 실행되었을 때는 파일 내용이 담긴 buffer를 이용해 resolve(buffer) 함수를 호출한다.

    다음 코드는 readFilePromise 함수가 반환하는 Promise 타입 객체의 then, catch, finally 메서드를 메서드 체인 형태로 사용한다.

    ```
    import {readFilePromise} from './readFilePromise'

    readFilePromise('../package.json')
        .then((content: string) => {
            console.log(content)
            return readFilePromise('../tsconfig.json')
        })
        .then((content: string) => {
            console.log(content)
        })
    ```

<br>

- Promise.resolve 메서드

    Promise 클래스는 resolve라는 클래스 메서드를 제공한다. 앞서 Promise 객체를 생성할 때 resolve 함수를 호출했는데, Promise.resolve는 이를 클래스 메서드로 구현한것이다. Promise.resolve(값) 형태로 호출하면 항상 이 '값'은 then 메서드에서 얻을 수 있다.

    ```
    Promise.resolve(1)
        .then(value => console.log(value))

    Promise.resolve('hello')
        .then(value => console.log(value))

    Promise.resolve([1, 2, 3])
        .then(value => console.log(value))

    Promise.resolve({name: 'Jack', age: 32})
        .then(value => console.log(value))
    ```

<br>

- Promise.reject 메서드

    Promise.reject(Error 타입 객체)를 호출하면 이 'Error 타입 객체'는 항상 catch 메서드의 콜백 함수에서 얻을 수 있다.

    ```
    Promise.reject(new Error('에러 발생'))
        .catch((err: Error) => console.log('error:', err.message))
    ```