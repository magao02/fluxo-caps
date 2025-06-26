import { UUID } from 'crypto';

import { User } from '../interfaces/user.interface';

export abstract class UsersRepository {
  abstract create(user: User): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findOne(id: UUID): Promise<User>;
  abstract update(id: UUID, user: Partial<User>): Promise<User>;
}
