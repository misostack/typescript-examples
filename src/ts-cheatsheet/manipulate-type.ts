function manipulateTypeMain() {
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

  // Indexed Access Types
  type Person = { age: number; name: string; alive: boolean };
  type Age = Person['age'];
  const age: Age = 1;
  console.log(age);

  // Conditional Types
}

manipulateTypeMain();
