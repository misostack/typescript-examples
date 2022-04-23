# Typescript Cheatsheet

> Last update: 2022

## Primitive types

- string
- number
- boolean

## Interface vs Types

> Interface can be merged after creation

```ts
interface CustomerBehavior {
  order(): void;
}

interface CustomerBehavior {
  pay(): void;
}

interface CustomerBehavior {
  return(): void;
}
```

> Type can not be modified after creation

```ts
type Member = {
  login: string;
  password: string;
};

type Admin = Member & {
  permissions: Array<string>;
};
```

> Should use _interface_ until you need to use features from _type_

## Literal Type

```ts
const position: 'left' = 'left';
const deleteStatus: 0 = 0;
const isRemember: true | false = true;
```

> In this case 'left' is a literal type, and there is only one available value "left".
> Is this useless? No take a look at this composition

```ts
type position = 'left' | 'right' | 'top' | 'bottom';
element.position = position;
type status = 0 | 1 | 2;
// Now you see me !
```

> An of course we can also combine non-literal types

```ts
interface Options {
  width: number;
}

const configure = (opt: Options | 'auto') => {
  console.info(opt);
};

configure('auto');
configure({ width: 123 });
```

## Literal Inference

> In this example, typescript can infer type of counter. So if you try to assign counter with a string, an error will be raised ! Now you see !

```ts
const stats = { counter: 1 };
stats.counter = 'a';
```

> Take a look at another example

```ts
const handleRequest = (url: string, method: 'GET' | 'POST') => {
  console.info(`Execute: /${method} ${url}`);
};
const req = {
  url: 'https://api.jsbasevietnam.com/v1/posts',
  method: 'GET',
};
// what's happened and how to fix
handleRequest(req.url, req.method);
```

```ts
const req = {
  url: 'https://api.jsbasevietnam.com/v1/posts',
  method: 'GET' as 'GET',
};
// or
const req = {
  url: 'https://api.jsbasevietnam.com/v1/posts',
  method: 'GET',
} as const;
```

## null and undefined

> With strictNullChecks on, when a value is null or undefined, you will need to test for those values before using methods or properties on that value. Just like checking for undefined before using an optional property, we can use narrowing to check for values that might be null

**Non-null Assertion Operator (Postfix!)**

```ts
// this example will thrown error
const divide = (n?: number | null) => {
  return 1 / n;
};
// but if you can make sure n never be null or undefined, you can use this syntax
// to removing null and undefined from a type without doing any explicit checking
const divide = (n?: number | null) => {
  return 1 / n!;
};
```

## Enum

```ts
enum TransportationMode {
  Walking = 'Walking',
  Car = 'Car',
  Bus = 'Bus',
  Unknown = 'Unknown',
}
```

## Less Common Primitives

## Decorator

> Decorator is an expression which returns a function and can take a target, name and property descriptor as arguments

## Guidelines for Writing Good Generic Functions

> Rule: When possible, use the type parameter itself rather than constraining it

```ts
function firstElement1<Type>(arr: Type[]) {
  return arr[0];
}

function firstElement2<Type extends any[]>(arr: Type) {
  return arr[0];
}

// a: number (good)
const a = firstElement1([1, 2, 3]);
// b: any (bad)
const b = firstElement2([1, 2, 3]);
```

> Rule: Always use as few type parameters as possible

```ts
// good : only depend on one field type
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
  return arr.filter(func);
}

// bad: its create two few types
function filter2<Type, Func extends (arg: Type) => boolean>(
  arr: Type[],
  func: Func,
): Type[] {
  return arr.filter(func);
}
```

> Rule: If a type parameter only appears in one location, strongly reconsider if you actually need it

```ts
// good
function greet(s: string) {
  console.log('Hello, ' + s);
}

// not necessary
function greet<Str extends string>(s: Str) {
  console.log('Hello, ' + s);
}

greet('world');
```

## Function Overload

> The signature of the implementation is not visible from the outside. When writing an overloaded function, you should always have two or more signatures above the implementation of the function

```ts
// Funtion Overload
enum Singer {
  HuongLy = 'Huong Ly',
  ThaoPham = 'Thao Pham',
  KieuTho = 'Kieu Tho',
}
interface Song {
  id: number;
  name: string;
  singer: Singer;
  views: number;
  likes: number;
}
const songs: Song[] = [
  {
    id: 1,
    name: 'Là ai từ bỏ, là ai vô tình',
    singer: Singer.HuongLy,
    views: 1_000_000,
    likes: 500_000,
  },
  {
    id: 2,
    name: 'Muốn em là',
    singer: Singer.ThaoPham,
    views: 500_000,
    likes: 250_000,
  },
  {
    id: 3,
    name: 'Yêu là cưới, là ai vô tình',
    singer: Singer.KieuTho,
    views: 300_000,
    likes: 290_000,
  },
];
function isMatched(song: Song, args: Array<number | string | Singer>) {
  if (args.length === 0) {
    return true;
  }
  // singer name is a string
  if (args.length === 1 && typeof args[0] === 'string') {
    return song.singer === args[0];
  }
  // filter by views
  if (args.length === 1 && typeof args[0] === 'number') {
    return song.views >= args[0];
  }
  // filter by views and likes
  if (args.length === 2) {
    return song.views >= args[0] && song.likes >= args[1];
  }
  // filter by singer, views and likes
  if (args.length === 3) {
    return (
      song.singer === args[0] && song.views >= args[1] && song.likes >= args[2]
    );
  }
  return true;
}
function findSongs(
  songs: Song[],
  singer: Singer,
  views: number,
  likes: number,
): Song[];
function findSongs(songs: Song[], views: number, likes: number): Song[];
function findSongs(songs: Song[], views: number): Song[];
function findSongs(songs: Song[], singer: Singer): Song[];
function findSongs(songs: Song[], ...args: any): Song[] {
  return songs.filter((s) => isMatched(s, args));
}

console.log(songs);
console.table(findSongs(songs, Singer.ThaoPham));
console.table(findSongs(songs, 500_000));
console.table(findSongs(songs, 500_000, 300_000));
console.table(findSongs(songs, Singer.HuongLy, 500_00, 300_00));
```

### Special types

> void, object, unknown, never, Function

**void**

> is a contextual function type with a void return type (type vf = () => void), when implemented, can return any other value, but it will be ignored.

```ts
type VoidFunc = () => void;
const vf1: VoidFunc = () => {
  return true;
};
const v1 = vf1(); //
// to allow this work
const src = [1, 2, 3];
const dst = [0];
src.forEach((el) => dst.push(el));
```

**object**

> The special type object refers to any value that isn’t a primitive (string, number, bigint, boolean, symbol, null, or undefined). This is different from the empty object type { }, and also different from the global type Object

```ts
const values = {}; // object => dto
console.log(typeof values); // object
```

**unknown**

> The unknown type represents any value. This is similar to the any type, but is safer because it’s not legal to do anything with an unknown value

```ts
function f1(a: any) {
  a.b(); // OK
}
function f2(a: unknown) {
  a.b();
} // NOT OK

function safeParse(s: string): unknown {
  return JSON.parse(s);
}

// Need to be careful with 'obj'!
const obj = safeParse(someRandomString);
```

**never**

```ts
function fail(msg: string): never {
  throw new Error(msg);
}
function fn(x: string | number) {
  if (typeof x === 'string') {
    // do something
  } else if (typeof x === 'number') {
    // do something else
  } else {
    x; // has type 'never'!
  }
}
```

**Function**

```ts
function doSomethingGreat(f: Function) {
  return f();
}
```

**bind**

```ts
class ExampleA {
  #name: string;

  constructor(name: string) {
    this.#name = name;
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    console.log(this);
    console.log(this.#name);
  }
  triggerOnClick(f: Function) {
    f();
  }
}

const exampleA = new ExampleA('Bind Example');
exampleA.triggerOnClick(exampleA.onClick);

// call
class ExampleA {
  #name: string;

  constructor(name: string) {
    this.#name = name;
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    console.log(this);
    console.log(this.#name);
  }
  onCall() {
    console.log(this.#name);
  }
  triggerOnClick(f: Function) {
    f();
  }
}

const exampleA = new ExampleA('Bind Example');
exampleA.triggerOnClick(exampleA.onClick);
const exampleB = new ExampleA('Call example');
exampleA.onCall.call(exampleB);

// apply
class ExampleA {
  #name: string;

  constructor(name: string) {
    this.#name = name;
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    console.log(this);
    console.log(this.#name);
  }
  onCall(hello: string = '', exclaimation = '') {
    console.log(`${hello} ${this.#name} ${exclaimation}`);
  }
  triggerOnClick(f: Function) {
    f();
  }
}

const exampleA = new ExampleA('Bind Example');
exampleA.triggerOnClick(exampleA.onClick);
const exampleB = new ExampleA('Call example');
exampleA.onCall.call(exampleB);
exampleA.onCall.apply(exampleB, ['Hi', '!']);
```

**Generator**

```ts
const randomNumber = (n: number = 100): number => {
  return Math.floor(Math.random() * n);
};
const randomLetter = (): string => {
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomIndex = randomNumber(possible.length);
  return possible[randomIndex];
};
// Generator
function* randomData(n: number): Generator {
  for (let i = 0; i < n; i++) {
    if (i % 3 === 0) {
      yield randomNumber();
    } else {
      yield randomLetter();
    }
  }
}
const iterator = randomData(10);
console.log(iterator.next().value);
console.log(iterator.next().value);
console.log(iterator.next().value);
```

### In JavaScript all functions are object methods.

> If a function is not a method of a JavaScript object, it is a function of the global object

> call: It can be used to invoke (call) a method with an owner object as an argument (parameter).

> With the apply() method, you can write a method that can be used on different objects.

> The call() method takes arguments separately.

> The apply() method takes arguments as an array.

### Rest arguments

```ts
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const a = multiply(10, 1, 2, 3, 4);

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2);

// Inferred type is number[] -- "an array with zero or more numbers",
// not specifically two numbers
const args = [8, 5];
const angle = Math.atan2(...args);

// Parameter Destructuring
function sum({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c);
}
```

### Generic Types

```ts
class Archer {
  fire() {
    console.log('fire');
  }
}
class Guardian {
  defend() {
    console.log('defend');
  }
}
class Knight {
  attack() {
    console.log('attack');
  }
}
// Generic object types
interface Hero<T> {
  character: T;
  health: number;
  stamina: number;
}

const heros: Hero<Archer | Guardian | Knight>[] = [];
const heroA: Hero<Archer> = {
  character: new Archer(),
  health: 100,
  stamina: 100,
};
const heroB: Hero<Guardian> = {
  character: new Guardian(),
  health: 100,
  stamina: 100,
};
const heroC: Hero<Knight> = {
  character: new Knight(),
  health: 100,
  stamina: 100,
};
heros.push(heroA, heroB, heroC);
for (const hero of heros) {
  console.log(hero);
  if (hero.character instanceof Archer) {
    hero.character.fire();
    continue;
  }
  if (hero.character instanceof Guardian) {
    hero.character.defend();
    continue;
  }
  if (hero.character instanceof Knight) {
    hero.character.attack();
    continue;
  }
}
```

### Array & Tuples

```ts
const colors: ReadonlyArray<string> = ['red', 'green', 'blue'];
for (const c of colors) {
  console.log(c);
}
// Tuples
type Pair = [string, number];
const p: Pair = ['action', 1];
console.log(p);
const [action, index] = p;
console.log(action, index);
// readonly
let point = [3, 4] as const;
console.log(point);
```

### Manipulate Types

```ts
// generic
function identity<T>(arg: T): T {
  return arg;
}
const id = identity<string>('abc');
console.log(id);
// generic constraints
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}
const obj = { a: 1, b: 2, c: 3 };
console.log(getProperty(obj, 'a'));

// key of operator
type Point = { x: number; y: number };
type P = keyof Point;
const x: P = 'x';
const y: P = 'y';
const p: Point = { x: 1, y: 2 };
console.log(p[x], p[y]);
// keyof same as "key1" | "key2"
If the type has a string or number index signature, keyof will return those types instead:
  type Arrayish = { [n: number]: unknown };
  type A = keyof Arrayish; // type A = number
  type Mapish = { [k: string]: boolean };
  type M = keyof Mapish;
  type M = string | number

  // key of operator
  type Point = { x: number; y: number };
  type P = keyof Point;
  const x: P = 'x';
  const y: P = 'y';
  const p: Point = { x: 1, y: 2 };
  console.log(p[x], p[y]);
  // keyof same as "key1" | "key2"
  function fnc() {
    return { x: 10, y: 3 };
  }
  // typeof type
  type P1 = ReturnType<typeof fnc>;
  const p1: P1 = { x: 1, y: 2 };
  console.log(p1);
  function isOk() {
    return true;
  }
  const isContinue: ReturnType<typeof isOk> = false;
  console.log(isContinue);
  // Conditional types
  interface Animal {
    live(): void;
  }
  interface Dog extends Animal {
    woof(): void;
  }

  type Example1 = Dog extends Animal ? number : string;
```

> SomeType extends OtherType ? TrueType : FalseType;

## References

- https://www.javascripttutorial.net/es-next/
- https://www.logicbig.com/tutorials/misc/typescript/class-decorators.html
- https://exploringjs.com/tackling-ts/ch_classes-as-values.html
- https://exploringjs.com/tackling-ts/toc.html
- https://www.npmjs.com/package/reflect-metadata
- https://www.javascripture.com/PropertyDescriptor
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty?retiredLocale=vi#try_it
- Immutable vs Immer : https://blog.joshsoftware.com/2021/05/03/native-vs-immutablejs-vs-immer-are-libraries-the-way-to-go-for-immutability-in-react/
- https://basarat.gitbook.io/typescript/main-1/typeinstantiation
- https://blog.logrocket.com/when-to-use-never-and-unknown-in-typescript-5e4d6c5799ad/
