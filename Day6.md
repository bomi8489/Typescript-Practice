# Typescript day6

## 배열과 튜플

### 배열

자바스크립트에서 배열은 Array 클래스의 인스턴스이며 다음처럼 선언한다.

```
let 배열이름 = new Array(배열길이)
```

```
let array = new Array
array.push(1); array.push(2); array.push(3)
console.log(array)  // [1, 2, 3]
```

<br>

- [] 단축 구문

    위의 코드로 배열을 만드는 것은 조금 번거롭다. 따라서 자바스크립트는 []라는 단축 구문을 제공한다.

    ```
    let numbers = [1, 2 ,3]
    let strings = ['Hello', 'World']
    console.log(numbers, strings)   // [1, 2, 3] ['Hello', 'World']
    ```

<br>

- 자바스크립트에서 배열은 객체다

    자바스크립트에서 배열은 다른 언어오 다르게 객체이다. 배열은 Array 클래스의 인스턴스인데, 클래스의 인스턴스는 객체이기 때문이다. Array 클래스는 배열을 사용하는데 필요한 여러가지 메서드를 제공해준다. 그중 `Array.isArray`는 매개변수로 전달받은 심벌이 배열인지 객체인지 알려준다.

    ```
    let a = [1, 2, 3]
    let o = {name: 'Jack', age: 32}
    console.log(Array.isArray(a), Array.isArray(o)) // true false
    ```

<br>

- 배열의 타입

    타입스크립트에서 배열의 타입은 '아이템 타입[]'이다. 예를들어, 배열의 아이템이 number 타입이면 배열의 타입은 number[]이고, 아이템이 string 타입이면 string[]이다.

    ```
    let numArray: number[] = [1, 2, 3]
    let strArray: string[] = ['Hello', 'World']

    type IPerson = {name: string, age?: number}
    let personArray: IPerso[] = [{name: 'Jack'}, {name: 'Jane', age: 32}]
    ```

<br>

- 문자열과 배열 간 변환

    어떤 프로그래밍 언어는 문자열(string)을 문자(characger)들의 배열(array)로 간주한다. 그러나 타입스크립트에서는 문자 타입이 없고 문자열의 내용 또한 변경할 수 없다. 이러한 특징 때문에 문자열을 가공하려면 가장 먼저 문자열을 배열로 전환해야 한다.

    보통 문자열을 배열로 전환할 때는 String 클래스의 `split` 메서드를 사용한다. split 메서드는 문자열을 문자로 쪼개는 기준인 구분자를 입력받아 문자열을 string[] 배열로 만들어 준다.

    ```
    const split = (str: string, delim: string= ''): string[] => str.split(delim)

    console.log(
        split('hello'),     // ['h', 'e', 'l', 'l', 'o']
        split('h_e_l_l_o', '_') // ['h', 'e', 'l', 'l', 'o']
    )
    ```

    string[] 타입의 배열을 다시 string 타입으로 변환하려면 Array 클래스의 join 메서드를 사용한다.

    ```
    const join = (strArray: string[], delim: string = ''): string => strArray.join(delim)

    console.log(
        join(['h', 'e', 'l', 'l', 'o']),
        join(['h', 'e', 'l', 'l', 'o'], '_')
    )
    ```

<br>

- 배열의 비구조화 할당

    객체뿐만 아니라 배열에도 비구조화 할당을 적용할 수 있다. 배열의 비구조화 할당문에서는 객체와 달리 [] 기호를 사용한다. 다음 코드는 배열에 담긴 아이템을 비구조화 할당문으로 얻는다.

    ```
    let array: number[] = [1, 2, 3, 4, 5]
    let [first, second, third, ...rest] = array
    console.log(first, second, third, rest) // 1 2 3 [4, 5]
    ```

<br>

- for...in 문

    ESNext 자바스크립트와 타입스크립트는 for 문을 좀 더 쉽게 사용하도록 `for...in`문을 제공한다. for...in문은 객체를 대상으로 사용하지만, 앞서 설명한 것처럼 배열도 객체이기 때문에 배열에 사용할 수도 있다.

    for...in문은 배열의 인덱스값을 순회한다. 다음 코드는 배열에 for...in문을 사용하는 예이다.

    ```
    let names = ['Jack', 'Jane', 'Steve']

    for (let index in names) {
        const name = names[index]
        console.log(`[${index}]: ${name}`)
    }
    ```

    만약, for...in문에 객체를 사용할 때는 객체가 가진 속성(property)을 대상으로 순회한다. 다음 코드는 name과 age 속성을 가진 jack 객체의 속성 이름과 값을 얻는 예이다.

    ```
    let jack = {name: 'Jack', age: 32}
    for(let property in jack) 
        console.log(`${property}: ${jack[property]}`)
    ```

<br>

- for...of 문

    ESNext 자바스크립트와 타입스크립트는 for...in과는 사용법이 약간 다른 `for...of`문도 제공한다.

    for...in문은 배열의 인덱스값을 대상으로 순회하지만, for...of문은 배열의 아이템값을 대상으로 순회한다. 다음 코드는 for...of 구문의 예로, 아이템값만 필요할 때는 for...in보다 좀더 간결하게 구현할 수 있다.

    ```
    for(let name of ['Jack', 'Jane', 'Steve'])
        console.log(name)   // Jack Jane Steve
    ```

<br>

- 제네릭 방식 타입

    배열을 다루는 함수를 작성할 때는 number[]와 같이 타입이 고정된 함수를 만들기보다는 `T[]` 형태로 배열의 아이템 타입을 한꺼번에 표현하는 것이 편리하다. 타입을 T와 같은 일종의 변수(타입 변수)로 취급하는 것을 제네릭(generics)타입이라고 한다. 다음 arrayLength 함수는 배열의 길이를 얻는 함수로서 자바스크립트로 구현되었다.

    ` const arrayLength = (array) => array.Length `

    이 함수가 number[], string[], IPerson[] 등 다양한 아이템 타입을 가지는 배열에 똑같이 적용되게 하려면 다음처럼 배열의 타입 주석을 T[]로 표현한다.

    ` const arrayLength = (array: T[]): number => array.Length `

    그런데 이렇게 하면 컴파일러가 T의 의미를 알 수 있어야 한다. 즉, T가 타입 변수(type variable)라고 알려줘야 한다. 예를 들어, 배열의 길이를 구하는 함수와 배열이 비었는지를 판별하는 함수를 제네릭 함수 스타일로 구현하면 다음과 같다.

    ```
    const arrayLength = <T>(array: T[]): number => array.Length
    const isEmpty = <T>(array: T[]): boolean => arrayLength<T>(array) == 0

    let numArray: number[] = [1, 2, 3]
    let strArray: string[] = ['Hello', 'World']

    type IPerson = {name: string, age?: number}
    let personArray: IPerson[] = [{name: 'Jack'}, {name: 'Jane', age: 32}]

    console.log(
        arrayLength(numArray),
        arrayLength(strArray),
        arrayLength(personArray),
        isEmpty([]),
        isEmpty([1])
    )
    ```

<br>

- 제네릭 함수의 타입 추론

    ```
    const identity = <T>(n: T): T => n
    console.log(
        identity<boolean>(true)
        identity(true)
    )
    ```

    위의 코드에서 제네릭 형태로 구현된 함수는 3행처럼 타입 변수를 `함수이름<타입변수>(매개변수)` 이렇게 명시해 주어야 한다.

    하지만 이런 코드는 번거롭기에 4행처럼 타입 변수 부분을 생략할 수 있게 한다. 타입스크립트는 타입 변수가 생략된 제네릭 함수를 만나면 타입 추론을 통해 생략된 타입을 찾아낸다.

<br>

- 제네릭 함수의 함수 시그니처

    타입스크립트는 어떤 경우 함수 시그니처의 매개변수 부분에 변수 이름을 기입하라고 요구한다. 다음 코드에서 normal 함수는 cb라는 이름의 매개변수에 함수 시그니처를 사용했다. 그런데 normal과 달리 error함수는 오류가 발생한다.

    ```
    const normal = (cb: (number) => number): void => { }
    const error = (cb: (number, number?) => number): void => { }    // error
    const fixed = (cb: (a: number, number?) => number): void => { }
    ```

    이런 오류가 발생하면 3행의 fixed 선언문처럼 타입스크립트가 해석하지 못하는 부분에 변수를 삽입하고 이 변수에 타입을 명시해 해결한다. 제네릭 타입의 함수에서도 같은 문제가 발생하는데, 앞선 fixed에서와 같이 해결할 수 있다.

    ```
    const f = <T>(cb: (arg: T, i?: number) => number): void => {}
    ```

<br>

- 전개 연산자

    전개 연산자 `...`는 배열에도 적용할 수 있다. 다음 코드는 전개 연산자를 사용해 두 배열과 특정 값을 동시에 결합하는 예이다.

    ```
    let array1: number[] = [1]
    let array2: number[] = [2, 3]
    let mergedArray: number[] = [...array1, ...array2, 4]
    console.log(mergedArray)
    ```

<br>

- range 함수 구현

    배열에 spread-operator를 적용하면 R.range와 같은 함수를 만들 수 있다. 다음 range 함수는 재귀함수 스타일로 동작하며, R.range처럼 from에서 to 까지 수로 구성된 배열을 생성해준다.

    ```
    const range = (from: number, to: number): number[] => 
        from < to ? [from, ...range(from + 1, to)] : []

    let numbers: number[] = range(1, 9+1)
    console.log(numbers)
    ```