import { UUID } from 'crypto';

import { Injectable } from '@nestjs/common';

import { User } from './interfaces/user.interface';
import {
  CreateUserUsecase,
  RemoveUserUsecase,
  RetrieveUserUsecase,
  RetrieveUsersUsecase,
  UpdateUserUsecase,
} from './usecases/usecases';

@Injectable()
export class UsersService {
  constructor(
    private readonly createUserUsecase: CreateUserUsecase,
    private readonly retrieveUsersUsecase: RetrieveUsersUsecase,
    private readonly retrieveUserUsecase: RetrieveUserUsecase,
    private readonly updateUserUsecase: UpdateUserUsecase,
    private readonly removeUserUsecase: RemoveUserUsecase,
  ) { }

  async create(user: User): Promise<User> {
    return this.createUserUsecase.execute(user);
  }

  async findAll(): Promise<User[]> {
    return this.retrieveUsersUsecase.execute();
  }

  async findOne(id: UUID): Promise<User> {
    return this.retrieveUserUsecase.execute(id);
  }

  async update(id: UUID, user: Partial<User>) {
    await this.retrieveUserUsecase.execute(id);
    return this.updateUserUsecase.execute(id, user);
  }

  async remove(id: UUID) {
    await this.retrieveUserUsecase.execute(id);
    return this.removeUserUsecase.execute(id);
  }
}
