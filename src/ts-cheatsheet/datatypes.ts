// Strategy Pattern: Favor composition over inheritance.

// calculate time when user go from A to B by:
// Walking : 5km/hour
// Cars: 80km/hour
// Buses: 40km/hour

enum TransportationMode {
  Walking = 'Walking',
  Car = 'Car',
  Bus = 'Bus',
  Unknown = 'Unknown',
}

const TransportationModeVelocity = {
  Unknown: 0,
  Walking: 5,
  Car: 80,
  Bus: 40,
};

interface UserDTO {
  id: number;
  firstName: string;
  lastName: string;
}

type ID = number | string;

class User {
  id!: ID;
  firstName!: string;
  lastName?: string;
  movingStrategy!: MovingStrategy;
  constructor(payload: UserDTO, movingStrategy: MovingStrategy) {
    Object.assign(this, { ...payload, movingStrategy });
  }

  public get movingVelocity() {
    return this.movingStrategy.getVelocity();
  }
}

interface MovingStrategy {
  getTransportationMode(): TransportationMode;
  getVelocity(): number;
}

class UnknownStrategy implements MovingStrategy {
  getTransportationMode(): TransportationMode {
    return TransportationMode.Unknown;
  }
  getVelocity(): number {
    return TransportationModeVelocity.Unknown;
  }
}

class WalkingStrategy implements MovingStrategy {
  getTransportationMode(): TransportationMode {
    return TransportationMode.Walking;
  }
  getVelocity(): number {
    return TransportationModeVelocity.Walking;
  }
}

class CarStrategy implements MovingStrategy {
  getTransportationMode(): TransportationMode {
    return TransportationMode.Car;
  }
  getVelocity(): number {
    return TransportationModeVelocity.Car;
  }
}

class BusStrategy implements MovingStrategy {
  getTransportationMode(): TransportationMode {
    return TransportationMode.Bus;
  }
  getVelocity(): number {
    return TransportationModeVelocity.Bus;
  }
}

abstract class TransportationModeFactory {
  public static createTransportationStrategy(mode: TransportationMode) {
    if (mode === TransportationMode.Walking) {
      return new WalkingStrategy();
    }
    if (mode === TransportationMode.Bus) {
      return new BusStrategy();
    }
    if (mode === TransportationMode.Car) {
      return new CarStrategy();
    }
    // default walking
    return new UnknownStrategy();
  }
}

abstract class UserFactory {
  public static createUser(
    userData: UserDTO,
    transportationMode: TransportationMode,
  ): User {
    return new User(
      userData,
      TransportationModeFactory.createTransportationStrategy(
        transportationMode,
      ),
    );
  }
}

const randomTransportationMode = (): TransportationMode => {
  const modes = [
    TransportationMode.Bus,
    TransportationMode.Car,
    TransportationMode.Walking,
  ];
  const randomModeIndex = Math.min(Math.floor(Math.random() * 3), 2);
  return modes[randomModeIndex];
};

export const main = () => {
  // random data
  const userDataset: Array<{
    userData: UserDTO;
    transportationMode: TransportationMode;
  }> = [];
  for (let i = 0; i < 100; i++) {
    userDataset.push({
      userData: { id: i + 1, firstName: `User ${i + 1}`, lastName: 'Test' },
      transportationMode: randomTransportationMode(),
    });
  }
  // create User
  const users: Array<User> = userDataset.map((u) =>
    UserFactory.createUser(u.userData, u.transportationMode),
  );
  console.log(TransportationMode);
  console.table(
    users.map((u) => {
      return {
        id: u.id,
        firstName: u.firstName,
        lastName: u.lastName,
        movingStrategy: u.movingStrategy,
        movingVelocity: u.movingVelocity,
      };
    }),
  );
};

main();
