async function mainEs2020() {
  // A bigint primitive is directly created by appending n suffix to an integer literal:
  console.log(Number.MAX_SAFE_INTEGER, '9 quadrillion', '9 trieu ti');
  console.log(
    BigInt(Number.MAX_SAFE_INTEGER * 1e6),
    '9 million quadrillion',
    '9 trieu trieu ti',
  );

  const sum = 3n + 2n;
  console.log(sum);
  console.log(3n + BigInt(2)); // 5n
  // console.log(3n == 3); // true
  // console.log(3n == '3'); // true
  // console.log(BigInt(3) == Number(3)); // true
  // console.log(0n == false); // true
  // console.log(3n > '2'); // true
  // console.log(BigInt(3) <= 2); // false
  // console.log(3n === 3); // false
  // console.log(3n === '3'); // false
  // console.log(BigInt(3) === Number(3)); // false
  // console.log(0n === false); // false

  // dynamic import
  const randomNumber = Math.floor(Math.random() * 10);
  console.log('randomNumber', randomNumber);
  // Dynamic import
  if (randomNumber % 2 === 0) {
    const datatypeModule = await import('./datatypes');
    datatypeModule.main();
  }

  // Nullish Coalescing
  // nullist : null/undefined
  // falsy: null/undefined/emptyString/false,0/NaN
  console.log(false ?? 'a string');
  console.log(undefined ?? 'a string instead of undefined');
  console.log(null ?? 'a string instead of null');
  console.log(NaN ?? 'a string');

  // Optional Chaining
  const x = { y: { z: 100 } } as any;
  console.log('x.y.z', x.y.z);
  console.log('x.y.z.a', x.y.z?.a);

  // Promise.allSettled
  const myPromiseArray = [
    Promise.resolve(10),
    Promise.resolve(100),
    Promise.reject(new Error('Something went wrong!')),
  ];
  Promise.all(myPromiseArray).then(
    (values) => {
      console.log(values);
    },
    (error) => {
      console.error(error);
    },
  );
  Promise.allSettled(myPromiseArray).then((values) => {
    values.map((v) => console.log(v));
    // {status: 'fulfilled', value: 10}
    // {status: 'rejected', reason: Error: Something went wrong!}
  });

  const regexp = /t(e)(st(\d?))/g;
  const str = 'test1test2';

  const array = [...str.matchAll(regexp)];

  console.log(array[0]);
  // expected output: Array ["test1", "e", "st1", "1"]

  console.log(array[1]);
  // expected output: Array ["test2", "e", "st2", "2"]

  // window for browsers, global for Node, and self for web worker
  // es 2020 brings to us "globalThis"
  console.log(globalThis);

  // Well defined for-in order
  const numbers = [1, 9, 6, 3];
  for (const n in numbers) {
    if (numbers[n]) {
      console.log(numbers[n]);
    }
  }
  // nodenext, esnext, es2020
  // console.log(import.meta);

  // promise any
  const promiseArray2 = [
    new Promise((resolve) => {
      setTimeout(() => {
        console.log('promise 1 runned');
        resolve('promise 1');
      }, 500);
    }),
    new Promise((resolve) => {
      setTimeout(() => {
        console.log('promise 3 runned');
        resolve('promise 3');
      }, 600);
    }),
    new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('promise 2 runned');
        reject(new Error('promise 2 failed'));
      }, 200);
    }),
  ];

  Promise.any(promiseArray2).then(
    (v) => console.log('Fullfilled', v),
    (error) => console.error('Error', error),
  );

  // es2021 :readable
  const budget = 1_000_000_000;
  console.log('budget', budget);

  // JavaScript Logical Assignment Operators
  // falsy check assignment
  let title = '';
  title ||= 'New title';
  console.error(title);
  let x1 = 0;
  const y = 5;
  x1 ||= y;
  console.log(x1);
  // truthy check assignment
  const config = { PORT: 3000 } as any;
  // changed default PORT
  config.PORT &&= 3001;
  console.log(config);
  // null coalesing assignment
  config.APP_NAME ??= 'APPTITLE';
  console.log(config);
  const prefix = 'Example';

  class Example {
    static #counter: number = 0;
    #id: number; // private field
    #status: string;
    title: string;
    constructor(title: string) {
      Example.#counter++;
      this.#id = Example.#counter;
      this.title = title;
      this.#status = 'Pending';
    }
    toJSON() {
      return {
        id: this.#id,
        title: this.title,
        status: this.#status,
      };
    }
    get id() {
      return this.#id;
    }
    get status() {
      return this.#status;
    }
    set status(value) {
      this.#status = value;
    }

    static hasStatus(object: Example) {
      return #status in object;
    }

    static getCount(): number {
      return Example.#counter;
    }

    static [prefix] = 'Typescript Example';
    [prefix] = 'Example Typescript';
  }
  const ex = new Example('title');
  const ex1 = new Example('title1');
  const ex2 = new Example('title2');
  console.log('Example[prefix]', Example[prefix]);
  ex.status = 'active';
  console.log(ex.toJSON(), ex.id, ex.status, ex[prefix]);
  console.log(Example.hasStatus(ex));
  console.log(ex.toJSON(), ex1.toJSON(), ex2.toJSON());
  console.log(Example.getCount());
  // Array.at
  console.log([9, 6, 3, 1].at(0));
  // Map
  const colors = new Map<number, string>([[1, 'red']]);
  colors.set(2, 'green');
  colors.set(3, 'blue');
  colors.set(4, 'yellow');
  colors.set(5, 'gray');
  for (const c of colors) {
    const [id, name] = c;
    console.log({ id, name });
  }
  const itr = colors.keys();
  while (true) {
    const c = itr.next();
    if (c.done) {
      break;
    }
    console.log(colors.get(c.value));
  }
  const colorSet = new Set(['Green', 'Red', 'Orange', 'Yellow', 'Red']);
  console.log(colorSet.size);
  colorSet.forEach((c) => console.log(c));
}

// top level await
// const dataTypeModule = await import('./datatypes');

mainEs2020();
