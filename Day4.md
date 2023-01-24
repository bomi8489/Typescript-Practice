# Typescript day4

## 함수와 메서드

### 함수 표현식

- 함수는 객체다

    자바스크립트는 함수형 언어 `스킴(scheme)`과 `프로토타입(prototype)` 기반 객체지향 언어 `셀프(self)`를 모델로 만들어졌습니다. 따라서 자바스크립트는 객체지향 언어와 함수형 언어의 특징이 모두 있다. 타입스크립트 또한 자바스크립트의 이런 특징을 모두 포함한다.

    자바스크립트에서 함수는 Function 클래스의 인스턴스(instance)이다.
    다음 코드를 실행하면 3행이 출력이 되는데 이는 add가 함수로서 동작한다는 의미이다.

    ```
    let add = new Function('a', 'b', 'return a + b')
    let result = add(1, 2)
    console.log(result) // 3
    ```

    1행의 내용이 조금 특이한데, add가 함수라면 다음과 같은 구문이어야 하는데, 1행은 변수 선언문 형태로 add 함수를 구현했기 때문이다.

    ```
    function add(a, b) {return a + b}
    ```

    add 함수는 다음과 같은 형태로도 구현할 수 있다.

    ```
    let add2 = function(a, b) {return a + b}
    console.log(add2(1, 2)) // 3
    ```

    이처럼 함수 선언문에서 함수 이름을 제외한 `function(a, b) {return a + b}`와 같은 코드를 함수 표현식이라고 한다. 함수 표현식은 함수형 언어의 핵심 기능이다.

<br>

- 일등 함수

    프로그래밍 언어가 일등 함수(first-class function) 기능을 제공하면 '함수형 프로그래밍언어'라고 한다. 자바스크립트와 타입스크립트는 일등 함수 기능이 있으므로 함수형 프로그래밍 언어다. 일등 함수란, 함수와 변수를 구분(혹은 차별) 하지 않는다는 의미다.

    예를 들어, 다음 코드에서 1행의 f 는 let 키워드가 앞에 있으므로 변수이다. f는 변수이므로 값을 저장할 수 있고 변수 f에는 a + b 형태의 함수 표현식을 저장하였다. 하지만 f는 변수이므로 2행처럼 a - b형태의 함수 표현식도 저장할 수 있다.

    ```
    let f = function(a, b) {return a + b}
    f = function(a, b) {return a - b}
    ```
    
<br>

### 화살표 함수와 표현식 문

<br>

 ESNext 자바스크립트와 타입스크립트는 FUNCTION 키워드가 아닌 => 기호로 만드는 화살표 함수도 제공한다.

```
CONST 함수이름 = (매개변수1: 타입1, 매개변수2: 타입2[, ...]): 반환타입 => 함수몸통
```

화살표 함수의 몸통은 function때와는 다르게 중괄호를 사용할 수 도 있고 생략할 수도 있다.

```
const arrow1 = (a: number, b: number): number => {return a + b}
// 실행문 방식 몸통

const arrow2 = (a: number, b: number): number => a + b
// 표현식 문 방식 몸통
```

중괄호 사용 여부에 따라 타입스크립트 문법이 동작하는 방식이 실행문 방식과 표현식 문 방식으로 달라진다.

- 실행문과 표현식 문

    프로그래밍언어는 오래전부터 실행문 지향 언어와 표현식 지향 언어로 구분되어 왔다. C가 대표적인 실행문 지향 언어이고, 스칼라(scala)가 대표적인 표현식 지향 언어이다. 자바스크립트는 ES5는 실행문 지향 언어이지만, ESNext와 타입스크립트는 실행문과 표현식 문을 동시에 지원한다. 이런언어를 보통 '다중 패러다임 언어(multi-paradigm language)'라고 한다.

    프로그래밍 언어에서 실행문은 CPU에서 실행되는 코드를 의미한다. 그런데 실행문은 CPU에서 실행만 될 뿐 결과를 알려 주지않고, 결과를 알기 위해선 반드시 return 키워드를 사용해야 한다. 반면, 표현식문은 CPU에서 실행된 결과를 굳이 return키워드를 사용하지 않아도 알려준다.

    다음처럼 변수에 값을 대입하는 것은 대표적인 실행문이다.

    ```
    let x
    x = 1
    ```

    반면, 다음과 같은 코드에서 `x > 0` 부분은 CPU가 평가한 후 true나 false라는 값으로 결과를 알려주지 않으면 if문이 정상적으로 동작할 수 없다.

    ```
    let x = 10
    if(x > 0) 
        x = 1
    ```

    만약 프로그래밍 문버이 다음과 같다면 코드를 작성하기가 번거로워진다

    ```
    if(return x > 0)
        x = 1
    ```

    즉, 똑같이 CPU에서 실행되는 구문이라도 `x > 0` 처럼 return 키워드 없이 결과값을 반환하는 실행문이 필요하고, 이를 표현식 문이라고 구분해서 부른다.
    
<br>

- 고차 함수와 클로저, 그리고 부분함수

    고차 함수는 또 다른 함수를 반환하는 함수를 말한다. 함수형 언어에서 함수는 단순히 함수 표현식이라는 값이므로 다른 함수를 반환할 수 있다. 고차 함수의 일반적인 형태는 다음과 같다

    ```
    const add1 = (a: number, b: number): number => a + b    // 일반 함수
    const add2 = (a: number): (number) => number => (b: number): number => a + b    // 고차 함수
    ```

    add1은 일반적인 함수로 선언되었지만 add2는 고차 함수로 선언되었다. 다음 코드의 add 함수는 앞의 add2 함수를 이름만 바꾼것이다.

    ```
    const add = (a: number): (number) => number => (b: number): number => a + b
    const result = add(1)(2)
    console.log(result) // 3
    ```

    이런 구문이 어떻게 가능한지 add 함수를 좀더 이해하기 쉬운 형태로 구현해보자. 다음 코드는 number 타입의 매개변수를 받아 number 타입의 값을 반환하는 함수 시그니처를 NumberToNumberFunc 타입으로 정의한다.

    ```
    type NumberToNumberFunc = (number) => number
    ```

    이제 NumberToNumberFunc 타입의 함수를 반환하는 add함수를 만들 수 있다.

    ```
    type NumberToNumberFunc = (number) => number
    export const add = (a: number): NumberToNumberFunc => {
        // NumberToNumberFunc 타입의 함수 반환
    }
    ```

    다음으로 add의 반환값을 중첩 함수로 구현할 수 있다.

    ```
    type NumberToNumberFunc = (number) => number
    export const add = (a: number): NumberToNumberFunc => {
        const _add: NumberToNumberFunc = (b: number): number => {
            // number 타입의 값 반환
        }
        return _add
    }
    ```

    add 함수가 반환하는 _add는 NumberToNumberFunc 타입이다. 고차 함수는 이처럼 중첩 함수를 반환할 수 있다.

    이제 최종적으로 _add의 몸통을 구현하면 고차함수가 완성된다.

    ```
    type NumberToNumberFunc = (number) => number
    export const add = (a: number): NumberToNumberFunc => {
        const _add: NumberToNumberFunc = (b: number): number => {
            return a + b    // 클로저
        }
        return _add
    }
    ```

    4행을 보면 a는 add함수의 매개변수이고 b는 _add함수의 매개변수이다. 즉, _add함수의 관점에서만 보면 a는 외부에 선언된 변수이다. 함수형 프로그래밍 언어에서 4행과 같은 형태를 클로저(closure)라고 한다. 고차함수는 클로저 기능이 반드시 필요하다.

    지금까지 구현한 고차함수 add를 사용하는 코드를 살펴보자. 앞서 구현한 add는 NumberToNumberFunc 타입의 값을 반환하는 함수이므로 다음과 같은 코드를 작성할 수 있다.

    ```
    import {NumberToNumberFunc, add} from './add'
    let fn: NumberToNumberFunc = add(1)
    ```

    변수 fn에 담긴 값은 NumberToNumberFunc 타입의 함수 표현식이므로 다음 5행처럼 fn 뒤에 함수 호출 연산자를 붙일 수 있다.

    ```
    import {NumberToNumberFunc, add} from './add'

    let fn: NumberToNumberFunc = add(1)

    let result = fn(2)
    console.log(result) // 3
    console.log(add(1)(2))  // 3
    ```

    변수 fn는 단순히 add(1)을 저장하는 임수 변수의 역할만 한다. 따라서 fn과 같은 임시 변수를 사용하지 않는다면 7행과 같은 구문이된다. 2차 고차함수인 add는 add(1)(2)처럼 함수 호출 연산자를 사용해야만 함수가 아닌 값을 얻을 수 있다. <br>
    만일, add가 다음 multiply처럼 3차 고차 함수로 구현되었다면 multiply(1)(2)(3)처럼 함수 호출 연산자가 3개 필요하다.

    ```
    const multiply = a => b => c => a * b * c
    ```

    3차 고차 함수인 multiply에 함수 호출 연산자를 하나나 두 개만 붙여서 multiply(1) 혹은 multiply(1)(2)처럼 사용하면 아직 값이 아닌 함수이다. 이것을 `부분 애플리케이션(partial application)` 혹은 `부분 적용 함수(partially applied function)`라고 한다.

<br>

### 함수 구현 기법

- 매개변수 기본값 지정하기

    선택적 매개변수 `ex) a?: number` 는 항상 그 값이 undefined로 고정된다. 만일, 함수 호출시 인수를 전달하지 않더라도 매개변수에 어떤 값을 설정하고 싶다면 매개변수의 기본값을 지정할 수 있다. 이를 디폴트 매개변수라고 하고 다음과 같은 형태로 사용한다.

    ```
    (매개변수): 타입 = 매개변수 기본값)
    ```

    다음 코드에서 3행의 makePerson 암수는 호출 때 매개변수 age에 해당하는 값을 전달받지 못하면 기본으로 10이 설정된다.

    ```
    export type Person = {name: string, age: number}

    export const makePerson = (name: string, age: number = 10): Person => {
        const person = {name: name, age: age}
        return person
    }
    console.log(makePerson('Jack')) // {name: 'Jack', age: 10}
    console.log(makePerson('Jane', 33)) // {name: 'Jane', age: 33}
    ```
