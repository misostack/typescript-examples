/* eslint-disable new-cap */
// decorator is an expression which returns a function and can take a target, name and property descriptor as arguments

import 'reflect-metadata';
const context = Symbol('context');
function SetMetaData(key: string, value: any) {
  return Reflect.metadata(context, { [key]: value });
}
function GetMetaData(target: any, propertyKey: any) {
  return Reflect.getMetadata(context, target, propertyKey);
}

function Guard() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    console.log('target', target);
    console.log('propertyKey', propertyKey);
    console.log('descriptor', descriptor);
    console.log('Guard(): called');
    const ctx = GetMetaData(target, propertyKey);
    console.log('ctx', ctx);
  };
}
interface ControllerOptions {
  route: string;
}
const handlers: { [key: string]: any } = {};
const controller = (options: ControllerOptions) => {
  return (constructor: Function) => {
    handlers[options.route] = {
      class: constructor,
      actions: [],
    };
  };
};

const Get = (route: string) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    return {
      get() {
        const wrapperFn = (...args: any[]) => {
          console.log('function will handle route matched: ', route);
          descriptor.value.apply(this, args);
        };
        Object.defineProperty(this, propertyKey, {
          value: wrapperFn,
          configurable: true,
          writable: true,
        });
        return wrapperFn;
      },
    };
  };
};

@controller({ route: '/example' })
class Example {
  constructor() {
    console.log('main constructor');
  }
  @Guard()
  @SetMetaData('roles', ['admin'])
  @Get('/execute')
  execute(message: string = '') {
    console.log('example route execute run', message);
  }
}
interface Class<T> {
  new (...args: any[]): T;
}
function createInstance<T>(AnyClass: Class<T>, ...args: any[]): T {
  return new AnyClass(...args);
}
const controllers = [Example];
function mainDecorator() {
  console.error(controllers);
  const requestRoute = '/example';
  Object.keys(handlers).map((k) => {
    console.log(k, handlers[k]);
    if (requestRoute === k) {
      const instance = createInstance<any>(handlers[k].class as any);
      instance.execute();
    }
  });
  // Object
  const object1 = {
    name: '',
  } as any;
  Object.defineProperty(object1, 'hello', {
    value: () => {
      console.log('hello object define property');
    },
    writable: false,
    configurable: false,
    enumerable: true, // defines whether the property is picked by Object.keys(), Object.assign or spread
  });
  object1?.hello();
  console.log(Object.getOwnPropertyDescriptor(object1, 'hello'));
  console.log(Object.keys(object1));
  const obj2 = { ...object1 };
  obj2.name = 'Object 2';
  obj2?.hello();
  // redefine hello method object 1
  const ob1 = { ...object1 };
  ob1.name = 'a';
  ob1?.hello();
  try {
    Object.defineProperty(object1, 'hello', {
      value: function () {
        console.log(`Hello ${this.name}`);
      },
    });
  } catch (error) {
    console.error(error);
  }
  // Object.seal: non-configurable
  // method seals an object, preventing new properties from being added to it and marking all existing properties as non-configurable
  // Object.freeze: prevents changing the enumerability, configurability, or writability of existing properties, and prevents the values of existing properties from being changed
  // Object.preventExtensions: allow changing, not allow add new property
}

mainDecorator();
