function objectTypesMain() {
  interface Person {
    name: string;
    age: number;
  }

  type Member = {
    name: string;
    age: number;
  };

  function greet(person: Person | Member) {
    return 'Hello ' + person.name;
  }

  console.log(greet({ name: 'Any', age: 30 }));

  enum Shape {
    Circle,
    Rectangle,
    Square,
  }

  interface PaintOptions {
    shape: Shape;
    xPos?: number;
    yPos?: number;
  }

  function paintShape({ shape, xPos, yPos }: PaintOptions) {
    // ...
    console.log(shape, (xPos ||= 0), (yPos ||= 0));
  }

  const shape = Shape.Rectangle;
  paintShape({ shape });
  paintShape({ shape, xPos: 100 });
  paintShape({ shape, yPos: 100 });
  paintShape({ shape, xPos: 100, yPos: 100 });

  interface ReadonlyPerson {
    readonly name: string;
    readonly age: number;
  }

  const writablePerson: Person = {
    name: 'Person McPersonface',
    age: 42,
  };

  // works
  const readonlyPerson: ReadonlyPerson = writablePerson;

  console.log(readonlyPerson.age); // prints '42'
  writablePerson.age++;
  console.log(readonlyPerson.age); // prints '43'

  // Index signatures
  interface CustomObject {
    [index: string]: string;
  }
  const customObj: CustomObject = {};
  customObj[1] = '1';
  customObj['tada'] = 'tdo';
  console.log(customObj);
  // Extending Types
  interface BasicAddress {
    name?: string;
    street: string;
    city: string;
    country: string;
    postalCode: string;
  }

  interface AddressWithUnit extends BasicAddress {
    unit?: string;
  }

  const addr: AddressWithUnit = {
    name: 'A1',
    street: 'Tran Quoc Toan',
    city: 'Ho Chi Minh',
    country: 'Viet Nam',
    postalCode: '76000',
    unit: 'block',
  };

  console.log(addr);

  interface Colorful {
    color: string;
  }

  interface Circle {
    radius: number;
  }

  interface ColorfulCircle extends Colorful, Circle {}

  const cc: ColorfulCircle = {
    color: 'red',
    radius: 42,
  };

  console.log(cc);

  // Intersection Types
  interface Colorful {
    color: string;
  }
  interface Circle {
    radius: number;
  }

  function draw(circle: Colorful & Circle) {
    console.log(`Color was ${circle.color}`);
    console.log(`Radius was ${circle.radius}`);
  }

  // okay
  draw({ color: 'blue', radius: 42 });

  type NumberToStringConverter = {
    convert: (value: number) => string;
  };

  type BidirectionalStringNumberConverter = NumberToStringConverter & {
    convert: (value: string) => number;
  };

  const converter: BidirectionalStringNumberConverter = {
    convert: (value: string | number) => {
      return (
        typeof value === 'string' ? Number(value) : String(value)
      ) as string & number; // type assertion is an unfortunately necessary hack.
    },
  };

  const s: string = converter.convert(0); // `convert`'s call signature comes from `NumberToStringConverter`

  const n: number = converter.convert('a'); // `convert`'s call signature comes from `BidirectionalStringNumberConverter`

  console.log(s, n);
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
  // Array Types
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
  const point = [3, 4] as const;
  console.log(point);
}

objectTypesMain();
