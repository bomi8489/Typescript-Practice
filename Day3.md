# Typescript day3

## 함수와 메서드

### 함수 선언문

- 함수 선언

    타입스크립트 함수 선언문은 자바스크립트 함수 선언문에서 매개변수와 함수 반환값에 타입 주석을 붙이는 다음 형태로 구성한다.

    ```
    function add(a: number, b: number): number {
        return a + b
    }
    ```

<br>

- 매개변수와 반환값의 타입 주석 생략

    변수 때와 마찬가지로 함수 선언문에서도 매개변수와 반환값에 대한 타입 주석을 생략할 수 있다. 다만, 함수의 매개변수 타입과 반환 타입을 생략하는 것은 바람직하지 않다. 타입이 생략되어 있으면 함수의 구현 의도를 알기 어렵고 잘못 사용하기 쉽기 때문이다.

<br>

- void 타입

    void 타입은 함수 반환 타입으로만 사용할 수 있다.
    
    ```
    function printMe(name: string, age: number): void {
        console.log(`name: ${name}, age: ${age}`)
    }
    ```

<br>

- 함수 시그니처

    변수에 타입이 있듯이 함수 또한 타입이 있는데 이를 함수 시그니처라고 한다.

    ```
    (매개변수1 타입, 매개변수2 타입[, ...]) => 반환값 타입
    ```

    다음은 printMe 함수의 시그니처를 이용한 예이다. printMe 함수는 string과 number 타입의 매개변수가 두 개 있고 반환 타입이 void이다. 따라서 함수 시그니처는 `(string, number) => void` 이다.

    ```
    let printMe: (string, number) => void = function(name: string, age: number): void {}
    ```

<br>

- type 키워드로 타입 별칭 만들기

    타입스크립트는 `type`이라는 키워드를 제공한다. type 키워드는 기존에 존재하는 타입을 단순히 이름만 바꿔서 사용할 수 있게 해준다. 이러한 기능을 타입 별칭이라고 한다.

    ```
    type 새로운타입 = 기존타입
    ```

    다음 코드는 `(string, number) => void ` 함수 시그니처를 stringNumberFunc 이라는 이름으로 타입 별칭을 만든다. 이 별칭덕분에 2행과 3행에서 타입 주석을 더 수월하게 붙일 수 있다.

    ```
    type stringNumberFunc = (string, number): void
    let f: stringNumberFunc = function(a: string, b: number): void {}
    let g: stringNumberFunc = function(c: string, d: number): void {}
    ```

    합수의 타입, 즉 함수 시그니처를 명시하면 매개변수의 개수나 타입, 반환 타입이 다른 함수를 선언하는 잘못을 미연에 방지할 수 있다.

<br>

- undefined

    ```
    interface INameable {
        name: string
    }
    function getName(o: INameable) {return o.name}

    let n = getName(undefined)  // 오류 발생
    console.log(n)
    ```

    4행의 getName은 INameable 타입의 매개변수를 요구하지만, 6행에서 INameable 타입 객체가 아니라 undefined를 매개변수로 호출해도 구문오류가 발생하지 않는다. 즉 undefined는 최하위 타입이므로 INameable을 상속하는 자식 타입으로 간주한다.

    하지만 코드를 실행하면 4행의 o.name 부분이 undefined.name이 되어 `Cannot read property 'name' of undefined`라는 오류가 발생한다. 이 오류룰 방지하려면 매개변수의 값이 undefined인지 판별하는 코드를 작성해야한다.

    ```
    interface INameable {
        name: string
    }
    function getName(o: INameable) {
        return o != undefined ? o.name : "unknown name"
    }

    let n = getName(undefined)
    console.log(n)  // unknown name
    console.log(getName({name: 'Jack})) // Jack
    ```

    인터페이스에 선택 속성이 있는 경우

    ```
    interface IAgeable {
        age?: number
    }
    function getAge(o: IAgeable) {
        return o != undefined && o.age ? o.age : 0
    }

    console.log(getAge(undefined))  // 0
    console.log(getAge(null))   // 0
    console.log(getAge({age: 32}))  // 32
    ```

<br>

- 선택적 매개변수

    함수의 매개변수 역시 이름뒤에 물음표를 붙일 수 있으며 이를 선택적 매개변수라고 한다.

    ```
    function fn(arg1: string, arg2?: number): void {}
    ```

    선택적 매개변수는 다음 3행과 4행의 함수 모두 호출하고 싶을 때 사용한다.

    ```
    function fn(arg1: string, arg2?: number): void {
        console.log(`arg2: ${arg2}`)
    }

    fn('hello', 1)
    fn('hello)
    ```

    선택적 매개변수가 있는 함수의 시그니처는 타입 뒤에 물음표를 붙인다.

    ```
    type OptionalArgFUnc = (string, number?) => void
    ```

<br>

### 함수 표현식

