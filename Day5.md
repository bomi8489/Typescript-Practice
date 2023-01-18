# Typescript day3

## 함수와 메서드

### 함수 구현 기법

- 매개변수 기본값 지정하기

    선택적 매개변수 `ex) a?: number` 는 항상 그 값이 undefined로 고정된다. 만일, 함수 호출시 인수를 전달하지 않더라도 매개변수에 어떤 값을 설정하고 싶다면 매개변수의 기본값을 지정할 수 있다. 이를 디폴트 매개변수라고 하고 다음과 같은 형태로 사용한다.

    ```
    (매개변수): 타입 = 매개변수 기본값)
    ```

    다음 코드에서 3행의 makePerson 암수는 호출 때 매개변수 age에 해당하는 값을 전달받지 못하면 기본으로 10이 설정된다.

    #### default.ts
    ```
    export type Person = {name: string, age: number}

    export const makePerson = (name: string, age: number = 10): Person => {
        const person = {name: name, age: age}
        return person
    }
    console.log(makePerson('Jack')) // {name: 'Jack', age: 10}
    console.log(makePerson('Jane', 33)) // {name: 'Jane', age: 33}
    ```

<br>

- 객체 생성시 값 부분을 생략할 수 있는 타입스크립트 구문

    타입스크립트는 매개변수의 이름과 똑같은 이름의 속성을 가진 객체를 만들 수 있다. 이때 속성값 부분을 생략할 수 있는 단축 구문을 제공한다.

    #### return-object.ts
    ```
    export type Person = {name: string, age: number}

    export const makePerson = (name: string, age: number = 10): Person => {
        const person = {name, age}
        return person
    }
    console.log(makePerson('Jack')) // {name: 'Jack', age: 10}
    console.log(makePerson('Jane', 33)) // {name: 'Jane', age: 33}
    ```

<br>

- 객체를 반환하는 화살표 함수 만들기

    화살표 함수에서 객체를 반환하려면 중괄호`{}`를 소괄호`()`로 감싸주어야 한다. 소괄호로 감싸주지 않으면 컴파일러가 중괄호를 객체가 아닌 복합 실행문으로 해석하기 때문이다.

    > 잘못된 예시
    ```
    export const makePerson = (name: string, age: number) => {name, age}    // 컴파일러가 중괄호를 객체가 아닌 복합 실행문으로 해석
    ```

    > 수정
    ```
    export const makePerson = (name: string, age: number) => ({name, age})
    ```

    따라서 앞의 `return-object.ts`를 좀더 간결하게 수정할 수 있다.

    #### arrow.ts
    ```
    export type Person = {name: string, age: number}

    export const makePerson = (name: string, age: number = 10): Person => ({name, age})
    console.log(makePerson('Jack'))
    console.log(makePerson('Jane', 33))
    ```

<br>

- 매개변수에 비구조화 할당문 사용하기

    함수의 매개변수도 변수의 일종이므로 비구조화 할당문을 적용할 수 있다.

    #### destructring.ts
    ```
    export type Person = {name: string, age: number}

    const printPerson = ({name, age}: Person): void => console.log(`name: ${name}, age: ${age}`)

    printPerson({name: 'Jack', age: 10})
    ```

<br>

- 색인 키와 값으로 객체 만들기

    ESNext 자바스크립트에서는 다음과 같은 코드를 작성할 수 있다.

    ```
    const makeObject = (key, value) => ({[key]: value})
    ```

    이 코드는 객체의 속성 이름을 변수로 만들려고 할 때 사용한다. 즉, [key] 부분이 'name'이면 {name: vaule} 형태, 'firstname'이면 {firstname: value} 현태의 객체를 생성한다.

    ```
    const makeObject = (key, value) => ({[key]: value})
    console.log(makeObject('name', 'Jack'))
    console.log(makeObject('firstName', 'Jane'))
    ```

    타입스크립트에서는 {[key]: value} 형태의 타입을 `색인 가능 타입`이라고 하며, 다음과 같은 형태로 key와 value의 타입을 명시한다.

    ```
    type KeyType = {
        [key: string]: string
    }
    ```

    다음 코드는 색인 가능 타입을 사용해 속성 이름만 다른 객체를 만드는 예시이다.

    #### indexable-key.ts
    ```
    export type KeyValueType = {
        [key: string]: string
    }
    export const makeObject = (key: string, value: string): KeyValueType => ({ [key]: value })

    console.log(makeObject('name', 'Jack'))
    console.log(makeObject('firstName', 'Jane'))    
    ```

<br>

### 클래스 메서드

- 메서드

    타입스크립트에서 메서드(method)는 function으로 만든 함수 표현식을 담고 있는 속성이다. 다음 코드에서 클래스 A는 value와 method라는 두 개의 속성을 가진다. value에는 1이라는 값을 설정하지만, method는 () => void 타입의 함수 표현식을 설정한다. 여기서 독특한 부분은 4행의 `this.value` 부분이다.

    ```
    export class A {
        value: number = 1
        method: () => void = function(): void {
            console.log(`value: ${this.value}`)
        }
    }
    ```

    다음과 같은 테스트 코드를 만들어서 실행해보자. A.ts의 2행에서 value 속성을 1로 설정했으므로 4행의 this.value가 1이되어 value: 1이라는 문자열이 출력된다.

    ```
    import {A} from './A'
    let a: A = new A
    a.method()
    ```

    다음 코드는 A.ts와 똑같이 동작하지만 더 간결하게 작성한 코드이다.

    ```
    export class B {
        constructor(public value: number = 1) {}
        method(): void {
            console.log(`value: ${this.value}`)
        }
    }
    ```

    ```
    import {B} from '.B'
    let b: B = new B(2)
    b.method()
    ```