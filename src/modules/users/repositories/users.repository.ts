import { User } from '../interfaces/user.interface';

export abstract class UsersRepository {
  abstract create(user: User): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findOne(id: string): Promise<User>;
  abstract update(id: string, user: Partial<User>): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
}
