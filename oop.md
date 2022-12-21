# Learn OOP the right way

## The four pillars of Object Orientation

1. Abstraction
2. Encapsulation
3. Inheritance
4. Polymorphism

## Solid Principles

1. **S**ingle Responsibility

> A class should only have one responsibility. Furthermore, it should only have one reason to change

**Benefits**

- Testing - class have only one responsility wil have far fewer test cases
- Lower coupling - less funtionality in single class wil have fewer dependencies
- Organization - smaller, well-organized classes are easier to search than monolith ones

Example:

```ts
class UserService {
  findOne() {}
  find() {}
  updateOne() {}
  deleteOne() {}
}

// violation
class BadUserService {
  findOne() {}
  find() {}
  updateOne() {}
  deleteOne() {}
  exportToPdf() {}
}

interface ExportService {
  exportToPdf();
}

// good
class UserExportService implements ExportService {
  exportToPdf() {}
}
```

2. **O**pen for Extension, Closed for Modification

> open-closed principle. Classes should be open for extension but closed for modification. In doing so, we stop ourselves

```ts
enum FurnitureGroup {
  CLASSIC,
  MODERN,
}
class Furniture {
  furnitureGroup: FurnitureGroup;
  constructor() {}
  getCollection() {}
}

// Instead of modifing the base class, we're creating new 2 class for new business rule

class ClassicFurniture extends Furniture {
  constructor() {
    this.furnitureGroup = FurnitureGroup.CLASSIC;
  }
}

class ModernFurniture extends Furniture {
  constructor() {
    this.furnitureGroup = FurnitureGroup.MODERN;
  }
}
```

3. **L**iskov Substituation Principle

> The Liskov Substitution Principle states that subclasses should be substitutable for their base classes

> if class A is a subtype of class B, we should be able to replace B with A without disrupting the behavior of our program

```ts
// if we use only one type of class to take responsibility, in theory, we will violate
// 1- single responsibility
// 2- open for extension, closed for modification
// 3- Liskov substituation
class QueueJob {
  create() {}
  run() {}
}

// So we're going to refactoring this class, we can apply 2 patterns here
// 1. Creational Pattern: AbstractFactory or Factory
// 2. Behavior Pattern: Strategy

// jobs: sendNotification:email, sms,
class NotificationQueueJob extends QueueJob {}
```

4. **I**nterface Segregation

> Larger interfaces should be split into smaller ones. By doing so, we can ensure that implementing classes only need to be concerned about the methods that are of interest to them

```ts
// instead of creating an interface that
interface Soldier {
  fire(); // only archer can fire
  shieldUp(); // only phalanx can create shieldWall
  shieldDown(); // only phalanx can create shieldWall
  attack(); // only knight/swordman/phalanx can attack
  chase(); // only knight/swordman/phalanx can attack
}

// we should segregate the large interface into smaller interfaces
class Soldier{}

interface SoldierCanFire {
  fire(); // only archer can fire
}
interface SoldierCanMakeShieldWall {
  shieldUp(); // only phalanx can create shieldWall
  shieldDown(); // only phalanx can create shieldWall
}
interface SoldierCanAttackAndChaseEnemy(){
    attack();
    chase();
}

class Archer extend Soldier implements SoldierCanFire{}
class Phalanx extend Soldier implements SoldierCanMakeShieldWall, SoldierCanAttackAndChaseEnemy{}
class Swordman extend Soldier implements SoldierCanMakeShieldWall, SoldierCanAttackAndChaseEnemy{}
class Knight extend Soldier implements SoldierCanAttackAndChaseEnemy{}
```

5. **D**ependency Inversion

> The principle of dependency inversion refers to the decoupling of software modules. This way, instead of high-level modules depending on low-level modules, both will depend on abstractions

The typical example that demonstrate the violation of this principle is the Controller-Model

```ts
class User {
  id: number;
  name: string;
  username: string;

  toModel(model: Model): Model {
    return newModelInstance(Model, this);
  }
}

class UserResponseModel {
  id: number;
  name: string;
}

class UserRepository {
  constructor(private dbInstance: DBInstance) {
    this.dbInstance = dbInstance;
  }
  findById(id: number): User {
    return this.dbInstance
      .query(`SELECT * from users where id = ${id}`)
      .toEntity(User);
  }
}

class UserController {
  constructor(private userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  findUser(id: number): UserResponseModel {
    return this.userRepository.findById(id).toModel(UserResponseModel);
  }
}

// in this case userController in application layer (high level module) depends on persistence layer ( lower level module), apply DI we will create an interface

interface IUserRepository {
  findById(id: number): User;
}
class UserRepository implements IUserRepository {
  constructor(private dbInstance: DBInstance) {
    this.dbInstance = dbInstance;
  }
  findById(id: number): User {
    return this.dbInstance
      .query(`SELECT * from users where id = ${id}`)
      .toEntity(User);
  }
}

class UserController {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  findUser(id: number): UserResponseModel {
    return this.userRepository.findById(id).toModel(UserResponseModel);
  }
}
```
