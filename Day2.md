# Typescript day2

## 객체와 타입

### 객체와 클래스

- 클래스 선언문

    typescript는 객체지향 언어에서 흔히 볼 수 있는 `class, private, public, protected, implements, extend`와 같은 키워드를 제공한다.

    다음 코드는 name과 age라는 속성을 가진 클래스를 선언한다.

    ```
    class Person1 {
        name: string
        age?: number
    }
    ```

    클래스에 new 연산자를 적용해 jack이라는 이름의 Person1 타입 변수를 만들 수 있다.

    ```
    let jack: Person1 = new Person1();
    jack.name = 'Jack'; jack.age = 23;
    console.log(jack)   // Person1 { name: 'Jack', age: 23 }
    ```

    <br> 

- 접근 제한자

    클래스의 속성은 public, private, protect와 같은 접근 제한자(access modifier)를 이름 앞에 붙일 수 있다. 생략시 모두 public으로 간주한다.

    ```
    class Person2 {
        public name : string
        private age : number
    }
    ```

<br>

- 생성자

    typescript의 클래스는 `constructor`라는 이름의 특별한 메서드를 포함하는데 이를 생성자라고 한다. 타언어와는 다르게 typescript 클래스는 다음 코드와 같은 형태로 클래스의 속성을 선언할 수 있다.

    ```
    class Person3 {
        constructor(public name: string, public age: number) {}
    }
    let jack2: Person3 = new Person3('Jack', 32)
    console.log(jack2)  // Person3 { name: 'Jack', age: 32 }
    ```

    타입스크립트는 생성자의 매개변수에 public과 같은 접근 제한자를 붙이면 해당 매개변수의 이름을 가진 속성이 클래스에 선언된 것처럼 동작한다. 즉, 위의 Person3 클래스는 다음 Person4클래스처럼 장황하게 구현된 것을 함축해서 구현한 것이다.

    ```
    class Person4 {
        name: string
        age: number
        constructor(name: string, age?: number) {
            this.name = name; this.age = age;
        }
    }
    let jack3: Person4 = new Person4('Jack', 32);
    console.log(jack3)  // Person4 { name: 'Jack', age: 32 }
    ```

<br>

- 인터페이스 구현

    typescript 클래스는 인터페이스를 구현할 수 있다. 클래스가 인터페이스를 구현할 때는 `implements` 키워드를 사용한다.

    다음 코드는 Iperson5라는 이름의 인터페이스를 구현하는 예시이다. 한가지 주의 할 점은 인터페이스는 이러이러한 속성이 있어야 한다는 규약에 불과할 뿐 물리적으로 해당 속성을 만들지 않는다는 점이다. 따라서 클래스 몸통에는 반드시 인터페이스가 정의하고 있는 속성을 멤버 속성으로 포함해야 한다.

    예시1
    ```
    interface IPerson4 {
        name: string
        age: number
    }

    class Person4 implements IPerson4 {
        name: string
        age: number
    }
    ```

    예시2
    ```
    interface IPerson4{
        name: string
        age?: number
    }

    class Person4 implements IPerson4 {
        constructor(public name: string, public age?: number ) {}
    }
    let jack4: IPerson4 = new Person4('Jack', 23)
    console.log(jack4)      // Person4 { name: 'Jack', age: 23 }
    ```

    <br>

- 추상 클래스

    타입스크립트는 abstract 키워드를 사용해 추상 클래스를 만들 수 있다. 추상 클래스는 다음 처럼 `abstract` 키워드를 class 키워드 앞에 붙여서 만든다. 추상 클래스는 자신의 속성이나 메서드 앞에 abstract를 붙여 나를 상속하는 다른 클래스에서 이 속성이나 메서드를 구현하게 한다.

    다음 AbstractPerson5 객체는 name 속성 앞에 abstract가 붙었으므로 new 연산자를 적용해 객체를 만들 수 없다.

    ```
    abstract class AbstractPerson5 {
        abstract name: string
        constructor(public age?: number) {}
    }
    ```

- 클래스의 상속

    타입스크립트는 `extends` 키워드를 사용해 상속 클래스를 만든다.

    다음 Person5 클래스는 AbstractPerson5 추상 클래스를 상속해 AbstractPerson5를 상속받는 클래스가 구현해야 할 name 속성을 구현한다. 타입스크립트에서는 부모 클래스의 생성자를 `super` 키워드로 호출 할 수 있다.

    ```
    abstract class AbstractPerson5 {
        abstract name: string
        constructor(public age?: number) {}
    }

    class Person5 extends AbstractPerson5 {
        constructor(public name: string, public age?: number) {
            super(age)
        }
    }
    let jack5 : Person5 = new Person5('Jack', 32)
    console.log(jack5)      // Person5 { name: 'Jack', age: 32 }
    ```

- static 속성

    타입스크립트 클래스는 정적인 속성을 가질 수 있다.

    다음 코드의 클래스 A는 initValue라는 정적 속성을 가진다. 클래스의 정적 속성은 '클래스이름.정적 속성 이름' 형태의 점 표기법을 사용해 값을 얻거나 설정한다.

    ```
    class A {
        static initValue = 1
    }

    let initVal = A.initValue
    ```

<br>

### 객체의 비구조화 할당문

- 객체의 구조화

    다음 코드는 name과 age가 다른 의미로 사용되므로 personName, companyName 처럼 둘을 구분하고 있다.

    ##### 구조화가 필요한 코드 예
    ```
    let personName = 'Jack'
    let perosnAge = 32

    let companyName = 'Apple Company, Inc'
    let companyAge = 43
    ```

    하지만 이런식의 구현은 작성하기도 번거럽고 기능을 확장하기도 어렵다. 따라서 인터페이스나 클래스를 사용해 관련된 정보를 묶어 새로운 타입으로 표현할 수 있다. 이를 구조화(structuring)라고 한다.

    ```
    export interface IPerson {
        name: string
        age: number
    }

    export interface ICompany {
        name: string
        age: number
    }
    ```

    코드를 이처럼 구조화하면 비슷한 유형의 변수를 쉽게 만들 수 있고 이로써 코드의 기능 확장이 수월해 진다.

    ```
    import {IPerson, ICompany} from './IPerson_ICompany'

    let jack: IPerson = {name: 'Jack', age: 32},
        jane: IPerson = {name: 'Jane', age: 32}

    let apple: ICompany = {name: 'Apple Computer, Inc', age: 43},
        ms: ICompany = {name: 'Microsoft', age: 44}
    ```

- 비구조화

    구조화된 데이터는 어떤 시점에서 데이터의 일부만 사용해야할 때가 있다. 다음 코드는 구조화된 jack 변수에서 jack이 아닌 jack.name, jack.age 부분을 각각 name과 age 변수에 저장한다. 그런데 이 시점부터는 jack 변수는 더 사용하지 않고 대신 name과 age 변수만 사용한다. 이처럼 구조화된 데이터를 분해하는 것을 비구조화라고 한다.

    ```
    let name = jack.name, age = jack.age
    ```

- 비구조화 할당

    비구조화 할당은 ESNext 자바스크립트의 구문으로 타입스크립트에서도 사용할 수 있다. 비구조화 할당은 배열과 튜플에서도 적용할 수 있다. 비구조화 할당을 객체에 적용하려면 얻고 싶은 속성을 중괄호로 묶는다.

    ```
    let {name, age} = jack
    ```

- 잔여 연산자

    ESNext 자바스크립트와 타입스크립트는 점을 연이어 3개 사용하는 `...`연산자를 제공한다. 이 연산자는 사용되는 위치에 따라 잔여 연산자(rest operator) 또는 전개 연산자(spread operator)라고 부른다.

    다음 코드에서 address 변수는 5개 속성을 가지고 있는데, 이 중 country와 city를 제외한 나머지 속성을 별도의 detail이라는 변수에 저장하고 싶다면, detail 변수 앞에 잔여 연산자를 붙인다.

    ```
    let address: any = {
        country: 'Korea',
        city: 'Seoul',
        address1: 'Gangnam-gu',
        address2: 'Sinsa-dong 123-456',
        address3: '789 street, 2 Floor ABC bouilding'
    }
    const {country, city, ...detail} = address
    console.log(detail)
    ```

<br>

## 객체의 타입 변환

- 타입 변환

    타입이 있는 언어들은 특정 타입의 변수 값을 다른 타입의 값으로 변환할 수 있는 기능을 제공하고 이를 타입 변환 이라고 한다. 다음은 타입변환이 필요한 예이다. person 변수의 타입은 object인데 object 타입은 name 속성을 가지지 않으므로 오류가 발생하고 있다.

    ```
    let person: object = {name: 'Jack', age: 32};
    console.log(person.name);
    // object형식에 name 속성이 없어서 오류
    ```

    person 변수를 일시적으로 name 속성이 있는 타입 즉 {name: string} 타입으로 변환해 person.name 속성을 갖게한다.

    ```
    let person: object = {name: 'Jack', age: 32};
    console.log((<{name:string}>person).name);  // Jack
    ```

- 타입 단언

    타입스크립트는 독특하게 타입 변환이 아닌 타입 단언(type assertion)이라는 용어를 사용한다. 타입 단언문은 다음 두가지 형태가 있다.

    `(<타입>객체)`

    `(객체 as 타입)`

    이들은 모두 ES5 자바스크립트 구문이 아니다. 따라서 자바스크립트의 타입 변환 구문과 구분하기 위해 타입 단언이라는 용어를 사용한다.

    타입 단언문의 예를 설명하기 전에 코드의 의미를 명확하게 하고자 다음과 같은 인터페이스를 구현한 INameable.ts 파일을 생성한다.

    ```
    export default interface INameable {
        name: string
    }
    ```

    다음 코드는 타입 단언의 두 가지 형태를 볼 수 있도록 작성했다. object 타입 객체 obj는 INameable 타입 객체로 변환되어 자신에게 담긴 객체의 name 속성값을 얻는다.

    ```
    import INameable from './INameable'
    let obj: object = {name: 'Jack'}

    let name1 = (<INameable>obj).name
    let name2 = (obj as INameable).name
    console.log(name1, name2);  // Jack Jack
    ```
    