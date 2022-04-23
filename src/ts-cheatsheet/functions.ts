const WALK_SPEED = 5;
const BUS_SPEED = 40;
type TransportStrategy = (distance: number) => number;
const walkStrategy: TransportStrategy = (distance: number): number => {
  return distance / WALK_SPEED;
};
const busStrategy: TransportStrategy = (distance: number): number => {
  return distance / BUS_SPEED;
};

const transportStrategy = (fn: TransportStrategy, distance: number) => {
  // function as type
  return fn(distance);
};

const functionsMain = () => {
  const distance = 100; // km
  console.log(
    `Walking ${distance} km take ${transportStrategy(
      walkStrategy,
      distance,
    )} hours!`,
  );
  console.log(
    `Going by bus ${distance} km take ${transportStrategy(
      busStrategy,
      distance,
    )} hours!`,
  );
  // Call Signatures
  type DescribableFunction = {
    description?: string;
    (someArg: number): boolean;
  };
  function doSomething(fn: DescribableFunction) {
    console.log(fn.description + ' returned ' + fn(6));
  }
  const isEven: DescribableFunction = (n: number): boolean => n % 2 == 0;
  isEven.description = '[TEST FUNCTION]';

  doSomething(isEven);
  class Example {
    #id: number;
    #title: string;
    constructor(title: string) {
      this.#id = Math.random();
      this.#title = title;
    }
    toJSON() {
      return {
        id: this.#id,
        title: this.#title,
      };
    }
    toString() {
      return `Example ${this.#id} - ${this.#title}`;
    }
  }
  // Construct Signatures
  type ExampleConstructor = {
    new (s: string): Example;
  };
  function createNewExample(Ctor: ExampleConstructor) {
    return new Ctor('title');
  }
  const example = createNewExample(Example);
  console.log(Example);
  console.log(example.toJSON());

  // Generic functions and Inference and Constraints
  const firstElement = <Type extends { toJSON: Function }>(
    arr: Type[],
  ): Type | undefined => {
    return arr[0].toJSON();
  };
  // const s = firstElement(['a', 'b', 'c']); // can not passed constraint
  // console.log(s);
  const e = firstElement([new Example('title2'), new Example('title 3')]);
  console.log('first Ele', e);

  function map<Input, Output>(
    arr: Input[],
    func: (arg: Input) => Output,
  ): Output[] {
    return arr.map(func);
  }
  const parsed = map([new Example('title2'), new Example('title 3')], (e) =>
    e.toJSON(),
  );
  console.log(parsed);

  // Specifying Type Arguments
  function combine<Type>(arr1: Type[], arr2: Type[], arr3: Type[]): Type[] {
    return arr1.concat(arr2).concat(arr3);
  }
  const arr = combine<number | string | Example>(
    [1, 2, 3],
    ['hello'],
    [new Example('title1')],
  );
  console.log(arr.map((e) => e.toString()));

  // Optional Parameters
  function toFixed(n?: number) {
    if (n) {
      console.log(n.toFixed()); // 0 arguments
    }
  }
  toFixed(5);
  toFixed();
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
        song.singer === args[0] &&
        song.views >= args[1] &&
        song.likes >= args[2]
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

  type VoidFunc = () => void;
  const vf1: VoidFunc = () => {
    return true;
  };
  const v1 = vf1();
  console.log(typeof v1);

  const src = [1, 2, 3];
  const dst = [0];
  src.forEach((el) => dst.push(el));
  const values = {}; // object => dto

  console.log(typeof vf1, typeof values);

  // function f1(a: any) {
  //   a.b(); // OK
  // }
  // function f2(a: unknown) {
  //   a.b();
  // } // NOT OK

  // function doSomethingGreat(f: Function){
  //   return f()
  // }
  // bind
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

  // Inferred as 2-length tuple
  const args = [8, 5] as const;
  // OK
  const angle = Math.atan2(...args);
  console.log(angle);

  // Parameter Destructuring
  // function sum({ a, b, c }: { a: number; b: number; c: number }) {
  //   console.log(a + b + c);
  // }
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
};

functionsMain();

// for (const key in globalThis) {
//   if (Object.prototype.hasOwnProperty.call(globalThis, key)) {
//     if( typeof (globalThis as any)[key] === 'function'){
//       console.log(key);
//     }
//   }
// }
