import { UUID } from 'crypto';

import { User } from '@modules/users/interfaces/user.interface';
import { UsersRepository } from '@modules/users/repositories/users.repository';

import { UsersCache } from '../types/users-cache.types';

export class CacheUsersRepository implements UsersRepository {
  private users: UsersCache = {};

  constructor(initialUsers: UsersCache = {}) {
    this.users = initialUsers;
  }

  async create(user: User) {
    this.users[user.id] = user;
    return user;
  }

  async findAll(): Promise<User[]> {
    const users = Object.values(this.users);
    return users;
  }

  async findOne(id: UUID): Promise<User> {
    return this.users[id];
  }

  async update(id: UUID, user: Partial<User>): Promise<User> {
    const userToUpdate = this.users[id];
    const updatedUser = { ...userToUpdate, ...user };
    this.users[id] = updatedUser;
    return updatedUser;
  }

  // remove(id: UUID): User {
  //     const userToRemove = this.users[id];
  //     this.users[id] = { ...userToRemove, isDeleted: true };
  //     return userToRemove;
  // }
}
