# Typescript day6

## 배열과 튜플

### 선언형 프로그래밍과 배열

함수형 프로그래밍은 선언형 프로그래밍과 깊은 관련이 있다. 선언형 프로그래밍은 명령형 프로그래밍과 곧 잘 비교되지만, 이 둘은 대등하게 비교할 대상은 아니다. 명령형은 좀 더 CPU 친화적인 저수준(low-level) 구현 방식이고, 선언형은 명령형 방식 위에서 동작하는 인간에게 친화적인 고수준(high-level) 구현 방식이다.

- 명령형 프로그래밍

    프로그램의 기본 형태는 입력 데이터를 얻고 가공한 다음, 결과를 출력하는 형태로 구성된다.

    - 입력 데이터 얻기
    - 입력 데이터 가공해 출력 데이터 생성
    - 출력 데이터 출력

    명령형 프로그래밍에서는 여러 개의 데이터를 대상으로 할 때 for문을 사용해서 구현한다.

    ```
    for(;;) {
        입력 데이터 얻기
        입력 데이터 가공해 출력 데이터 생성
        출력 데이터 출력
    }
    ```

    반면, 선언형 프로그래밍은 시스템의 자원의 효율적인 운용보단 일관된 문제 해결 구조에 더 집중한다. 선언형 프로그래밍은 명령형처럼 for문을 사용하지 않고도 모든 데이터를 배열에 담는다.

    - 문제를 푸는 데 필요한 모든 데이터 배열에 저장
    - 입력 데이터 배열을 가공해 출력 데이터 배열 생성
    - 출력 데이터 배열에 담긴 아이템 출력

<br>

- 1부터 100까지의 합

    다음 코드는 1부터 100까지의 합을 for문을 사용해 구한다. 이러한 구조는 명령형 프로그래밍 방식이다.

    ```
    let sum = 0
    for(let i = 1; i<= 100)
        sum += i++
    console.log(sum)    // 5050
    ```

    명령형 코드는 데이터의 가공이 for 문 안에서 이루어졌지만, 선언형은 데이터 생성과 가공 과정을 분리한다. 다음 코드는 1부터 100까지의 데이터를 배열로 생성부터 한다.

    ```
    import { range } from './range'
    let numbers: number[] = range(1, 100 + 1)
    console.log(numbers)    // [1, 2, 3, ... , 100]
    ```

    이제 배열에 담긴 데이터를 모두 더해야 한다. 이와 같은 방식의 데이터 가공은 함수형 프로그래밍에서 '폴드'라고 부르는 함수를 사용한다.

<br>

- fold: 배열 데이터 접기

    폴드는 [1, 2, 3, ...] 형태의 배열 데이터를 가공해 5050과 같은 하나의 값을 생성하려고 할 때 사용한다. 배열의 아이템 타입이 T라고 할 때 배열은 T[]로 표현할 수 있는데, 폴드 함수는 T[] 타입 배열을 가공해 T타입 결과를 만들어 준다. 다음 코드에서 fold 함수는 T 타입의 배열 T[]를 가공해 타입 T의 결과값을 만든다.

    ```
    export const fold = <T>(array: T[], callback: (result: T, val: T) => T, initValue: T) => {
        let result: T = initValue
        for(let i = 0; i < array.length; ++i) {
            const value = array[i]
            result = callback(result, value)
        }
        return result
    }
    ```

    fold 함수를 사용해 선언형 프로그래밍 방식으로 1부터 100까지의 합을 구하는 코드를 구현해보자

    ```
    import {range} from './range'
    import {fold} from './fold'

    let numbers: number[] = range(1, 100+1)
    let result = fold(numbers, (result, value) => result + value, 0)
    console.log(result)
    ```

<br>

### 순수 함수와 배열

- 순수 함수

    순수 함수는 부수 효과가 없는 함수를 말한다. 순수 함수가 되기 위해서는 다음과 같은 조건을 충족해야 한다.

    ```
    - 함수 몸통에 입출력 관련 코드가 없어야 한다
    - 함수 몸통에서 매개변숫값을 변경시키지 않는다
    - 함수는 몸통에서 만들어진 결과를 즉시 반환한다
    - 함수 내부에 전역 변수나 정적 변수를 사용하지 않는다
    - 함수가 예외를 발생시키지 않는다
    - 함수가 콜백 함수로 구현되었거나 함수 몸통에 콜백 함수를 사용하는 코드가 없다
    - 함수 몸통에 Promise와 같은 비동기 방식으로 동작하는 코드가 없다
    ```

    ex)
    ```
    function pure(a: number, b: number): number => {return a + b}
    ```
<br>

- 타입 수정자 readonly

    타입스크립트는 순수 함수 구현을 쉽게 하도록 `readonly` 키워드를 제공한다. 얼핏 "const 키워드가 있는데 readonly가 필요한가?"라는 의문이 들 수 있지만 타입스크립트에서 인터페이스, 클래스, 함수의 매개변수 등은 let이나 const 키워드 없이 선언이 가능하기 때문에 이런 심벌에 const와 같은 효과를 주려면 readonly라는 타입 수정자가 필요하다.

    ex)
    ```
    function forcePure(array: readonly number[]) {}
    ```

<br>

- 가변 인수 함수와 순수 함수

    함수를 호출할 때 전달하는 인수의 개수를 제한하지 않는 것을 가변 인수라고한다. 다음 코드에서 mergeArray 함수는 3행에서 두 개의 인수를 입력받고, 8행에서 4개의 인수를 입력받는다.

    ```
    import {mergeArray} from './mergeArray'

    const mergedArray1: string[] = mergeArray(
        ['Hello'], ['World']
    )
    console.log(mergedarray1)   // [ 'Hello', 'World' ]

    const mergedArray2: number[] = mergeArray(
        [1], [2, 3], [4, 5, 6], [7, 8, 9, 10]
    )
    console.log(mergedArray2)   // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    ```

    가변 인수 함수를 구현할 때 기본 형태는 다음과 같다. 매개변수 array 앞의 `...`.은 잔여나 전개 연산자가 아니라 가변 인수를 표현하는 구문이다.

    `export const mergeArray = (...arrays) => {}`

    mergeArray 함수는 string[] 타입과 number[] 타입 배열에 모두 동작했으므로 제네릭 타입으로 구현되어야 한다.

    `export const mergeArray = <T>(...arrays) => {}`

    또한 mergeArray 함수를 호출 했을 때 전달하는 값은 모두 배열이었으므로 매개변수 arrays의 타입은 배열의 배열로 선언한다.

    `export const mergeArray = <T>(...arrays: T[][]) => {}`

    mergeArray 함수의 매개변수 arrays는 배열의 배열인 T[][] 타입일지라도 출력은 T[] 형태의 배열을 반환해야 한다.

    `export const mergeArray = <T>(...arrays: T[][]): T[] => {}`

    mergeArray 함수를 '순수 함수'로 구현하려면 매개변수의 내용을 훼손하지 말아야 하므로 readonly 키워드를 입력한다.

    `export const mergeArray = <T>(...arrays: readonly T[][]): T[] => {}`

    마지막으로 mergeArray 함수내용을 구현해보자

    ```
    export const mergeArray = <T>(...arrays: readonly T[][]): T[] => {
        let result: T[] = []
        for(let index = 0; index < arrays.length; index++){
            const array: T[] = arrays[index]
            result = [...result, ...array]
        }
        return result
    }
    ```
