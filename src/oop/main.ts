import 'reflect-metadata';
import { injectable, inject, container } from 'tsyringe';

type ID = string | number;
interface Repository<T> {
  findOne(id: ID): T;
}
interface CrudService<Model> {
  findOne(id: ID): Model;
}

class User {
  id!: ID;
  firstName!: string;
  lastName!: string;
  constructor(payload: Partial<User>) {
    Object.assign(this, payload);
  }
}

class Role {
  id!: ID;
  name!: string;
  permissions: string[] = [];
  constructor(payload: Partial<Role>) {
    Object.assign(this, payload);
  }
}

class UserRepository implements Repository<User> {
  findOne(id: ID): User {
    const user = new User({
      id,
      firstName: 'Typescript',
      lastName: 'Master Class',
    });
    return user;
  }
}

class RoleRepository implements Repository<Role> {
  findOne(id: ID): Role {
    const role = new Role({
      id,
      name: 'Admin',
      permissions: ['CreateUser', 'EditUser', 'RetrieveUser', 'DeleteUser'],
    });
    return role;
  }
}

abstract class BaseService<M, R extends Repository<M>>
  implements CrudService<M>
{
  constructor(private repository: R) {}
  findOne(id: ID): M {
    return this.repository.findOne(id);
  }
}

@injectable()
class UserService extends BaseService<User, UserRepository> {
  constructor(
    @inject(UserRepository.name) userRepository: UserRepository,
    @inject(RoleRepository.name) private roleRepository: RoleRepository,
  ) {
    super(userRepository);
  }

  retrievePermission(user: User) {
    return this.roleRepository.findOne(user.id);
  }
}

const main = () => {
  container.register('UserRepository', {
    useClass: UserRepository,
  });
  container.register('RoleRepository', {
    useClass: RoleRepository,
  });
  const userService = container.resolve(UserService);
  const user = userService.findOne(1);
  const permissions = userService.retrievePermission(user);
  console.log(user, permissions);
};

main();
