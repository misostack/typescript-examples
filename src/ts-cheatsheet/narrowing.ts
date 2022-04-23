const narrowingMain = () => {
  class NarrowExample {
    #id: number = 0;
    #name: string = '';
    constructor(name: string) {
      this.#id = Date.now();
      this.#name = name;
    }
    get name() {
      return this.#name;
    }
    set name(value: string) {
      this.#name = value;
    }
    toJSON() {
      return {
        id: this.#id,
        name: this.#name,
      };
    }
  }
  const aString: string = 'a string';
  const aNumber: number = 1.2;
  const aBigint: BigInt = 1000n;
  const aBoolean: boolean = false;
  const aSymbol1 = Symbol('a');
  const aSymbol2 = Symbol('a');
  const anUndefined: any = undefined;
  const object: any = {};
  const narrowExample = new NarrowExample('example');
  console.log(`typeof ${aString} is ${typeof aString}`);
  console.log(`typeof ${aNumber} is ${typeof aNumber}`);
  console.log(`typeof ${aBigint} is ${typeof aBigint}`);
  console.log(`typeof ${aBoolean} is ${typeof aBoolean}`);
  console.log(`typeof ${anUndefined} is ${typeof anUndefined}`);
  console.log(`typeof ${aSymbol1.toString()} is ${typeof aSymbol1}`);
  console.log(`typeof ${object} is ${typeof object}`);
  console.log(`typeof ${narrowExample} is ${typeof narrowExample}`);
  console.log(
    `typeof ${narrowExample.toJSON} is ${typeof narrowExample.toJSON}`,
  );
  console.log(`typeof ${narrowExample.name} is ${typeof narrowExample.name}`);
  console.log(
    `narrowExample instanceof NarrowExample : ${
      narrowExample instanceof NarrowExample
    }`,
  );

  object[aSymbol1] = '1';
  object[aSymbol2] = '2';
  console.log(object[aSymbol1], object[aSymbol2]);

  // Falsy
  console.log(
    Boolean(''),
    Boolean(NaN),
    Boolean(undefined),
    Boolean(false),
    Boolean(0),
    Boolean(null),
  );
  // in
  type Fish = { swim: () => void };
  type Bird = { fly: () => void };
  type Human = { swim?: () => void; fly?: () => void };
  const things = [];
  const fish: Fish = {
    swim: () => {
      console.log('Fish can swim');
    },
  };
  const bird: Bird = {
    fly: () => {
      console.log('Bird can fly');
    },
  };
  const human: Human = {
    swim: () => {
      console.log('Human can swim');
    },
  };
  function move(animal: Fish | Bird | Human) {
    if ('swim' in animal) {
      return animal.swim && animal.swim();
    }
    return animal.fly && animal.fly();
  }
  things.push(fish);
  things.push(bird);
  things.push(human);
  things.forEach((obj) => {
    move(obj);
  });
  function isString(s: any): s is String {
    return typeof s === 'string';
  }
  function toUpperCase(x: unknown): any {
    if (isString(x)) {
      return x.toUpperCase();
    }
    return x;
  }
  console.log(toUpperCase('s'));
  console.log(toUpperCase(123));

  function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
  }
  function getSmallPet(): Fish | Bird {
    if (Math.floor(Math.random() * 10) % 2 === 0) {
      return fish;
    }
    return bird;
  }
  const pet = getSmallPet();
  if (isFish(pet)) {
    // (pet as Fish).swim();
    pet.swim();
  } else {
    // (pet as Bird).fly();
    pet.fly();
  }
  interface Job {
    type: 'email' | 'sms';
    payload: any;
  }
  class Queue {
    public run(job: Job) {
      console.log(job);
    }
  }
  class Notification {
    protected queue;
    constructor(queue: any) {
      this.queue = queue;
    }
    protected enqueue(job: Job) {
      this.queue.run(job);
      console.log('Enqueue', job.type, job.payload);
    }
    isEmail(): this is EmailNoti {
      return this instanceof EmailNoti;
    }
    isSms(): this is SmsNoti {
      return this instanceof SmsNoti;
    }
  }

  class EmailNoti extends Notification {
    #email: string = '';
    #content: string = '';
    constructor(queue: Queue, email: string, content: string) {
      super(queue);
      this.#email = email;
      this.#content = content;
    }
    public sendEmail() {
      console.log(`Send email to ${this.#email}: ${this.#content}`);
      this.enqueue({
        type: 'email',
        payload: {
          email: this.#email,
          content: this.#content,
        },
      });
    }
  }

  class SmsNoti extends Notification {
    #phoneNumber: string = '';
    #message: string = '';

    constructor(queue: Queue, phoneNumber: string, message: string) {
      super(queue);
      this.#phoneNumber = phoneNumber;
      this.#message = message;
    }
    public sendMessage() {
      console.log(`Send message to ${this.#phoneNumber}: ${this.#message}`);
      this.enqueue({
        type: 'sms',
        payload: {
          phoneNumber: this.#phoneNumber,
          message: this.#message,
        },
      });
    }
  }

  const notiQueue = new Queue();
  const notications: Array<Notification> = [];
  notications.push(
    new EmailNoti(notiQueue, 'example@sonnm.com', 'welcome email'),
  );
  notications.push(
    new EmailNoti(notiQueue, 'example1@sonnm.com', 'transaction email'),
  );
  notications.push(new SmsNoti(notiQueue, '+937590123', 'Secure Code: 779963'));
  notications.push(
    new EmailNoti(notiQueue, 'example2@sonnm.com', 'reset password email'),
  );
  notications.push(new SmsNoti(notiQueue, '+937590111', 'Secure Code: 779963'));
  notications.push(
    new EmailNoti(notiQueue, 'example2@sonnm.com', 'transaction email'),
  );
  for (const notification of notications) {
    if (notification.isEmail()) {
      notification.sendEmail();
    } else if (notification.isSms()) {
      notification.sendMessage();
    }
    // and more
  }

  // Discriminated unions
  // Exhaustiveness checking
  interface Circle {
    kind: 'circle';
    radius: number;
  }

  interface Square {
    kind: 'square';
    sideLength: number;
  }

  interface Rect {
    kind: 'rect';
    width: number;
    height: number;
  }

  type Shape = Circle | Square | Rect;

  function getArea(shape: Shape) {
    if (shape.kind === 'circle') {
      return Math.PI * shape.radius ** 2; // pi*r*r
    }
    if (shape.kind === 'square') {
      return shape.sideLength ** 2; // d*d
    }
    if (shape.kind === 'rect') {
      return shape.width * shape.height;
    }
    // ensure all cases are handler
    const _exhaustiveCheck: never = shape;
    return _exhaustiveCheck || 0;
    // switch (shape.kind) {
    //   case 'circle':

    //   case 'square':
    //     return shape.sideLength ** 2; // d*d
    //   default:
    //     return 0;
    // }
  }
  console.log(getArea({ kind: 'square', sideLength: 5 }));
  console.log(getArea({ kind: 'circle', radius: 2.5 }));
  console.log(getArea({ kind: 'rect', height: 5, width: 8 }));
};

narrowingMain();
