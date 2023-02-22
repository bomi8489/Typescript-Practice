# Typescript day11

## Promise와 async/await 구문

### async와 await 구문

- await

    `await` 키워드는 피연산자의 값을 반환해 준다. 피연산자가 Promise 객체라면 then 메서드를 호출해 얻은 값을 반환해 준다.

    `let value = await 'Promise 객체 혹은 값'`

- async 함수 수정자

    await 키워드는 항상 `async`라는 이름의 함수 수정자가 있는 함수 몸통에서만 사용할 수 있다.

    ```
    export const test1 = async () => {
        let value = await 1
        console.log(value)
        value = await Promise.resolve(1)
        console.log(value)
    }

    async function test2() {
        let value = await 'hello'
        console.log(value)
        value = await Promise.resolve('hello')
        console.log(value)
    }

    test1()
    test2()
    ```
    > 출력값이 1 1 hello hello가 아닌 1 hello 1 hello 인 것에 주목하자

<br>

- async 함수의 성질

1. 일반 함수처럼 사용할 수 있다
2. Promise 객체로 사용할 수 있다

    다음 코드는 async 함수를 Promise 객체로 사용한 예시이다. 
    ```
    import {test1} from './async-test'
    import {test2} from './async-test'

    test1()
        .then(() => test2())
    ```

    위의 코드는 test1() 함수의 호출이 resolve 된 다음에 test2() 함수를 호출하고있다.
    
<br>

- async 함수가 반환하는 값의 의미

    async 함수는 값을 반환할 수 있다. 이때 반호나값은 Promise 형태로 변환되므로 then 메서드를 호출해 async 함수의 반환값을 얻어야 한다.

    ```
    const asyncReturn = async() => {
        return [1, 2, 3]
    }

    asyncReturn()
        .then(value => console.log(value))
    ```

<br>

- async 함수의 예외 처리

    async 함수에서는 예외가 발생하면 프로그램이 비정상으로 종료된다.

    ```
    const asyncException = async () => {
        throw ne Error('error')
    }
    asyncException()    // 예외 발생
    ```

    예외가 발생해서 그로그램이 비정상으로 종료하는 상황을 막으려면, 단순히 함수 호출 방식이 아닌 async 함수가 반환하는 프로미스 객체의 catch 메서드를 호출하는 형태로 코드를 작성해야 한다.

    ```
    const asyncException = async () => {
        throw new Error('error')
    }
    asyncException()
        .catch(err => console.log('error:', err.message))
    ```

    만약 await 구문에서 Promise.reject값이 발생하면 마찬가지로 프로그램이 비정상으로 종료하고 이 역시 마찬가지로 catch 메서드를 호출하는 방식으로 코드를 작성해야 한다.

    ```
    const awaitReject = async() => {
        await Promise.reject(new Error('error'))
    }

    awaitReject()
        .catch(err => console.log('error:', err.message))
    ```

<br>

- async 함수와 Promise.all

    다음 코드는 package.json과 tsconfig.json 두 파일의 내용을 async 함수와 Promise.all, readFilePromise를 사용해 화면에 출력한다.

    ```
    import { readFilePromise } from './readFilePromise'

    const readFilesAll = async (filenames: string[]) => {
        return await Promise.all(
            filenages.map(filename => readFilePromise(filename))
        )
    }

    readFilesAll(['./package.json', './tsconfig.json'])
        .then(([packageJson, tsconfigJson]: string[]) => {
            console.log('<package.json>: ', packageJson)
            console.log('<tsconfig.json>: ', tsconfigJson)
        })
        .catch(err => console.log('error:', err.message))
    ```

    