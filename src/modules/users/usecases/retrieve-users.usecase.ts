import { Injectable } from '@nestjs/common';

import { User } from '../interfaces/user.interface';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class RetrieveUsersUsecase {
  constructor(private readonly userRepository: UsersRepository) { }

  async execute(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    const filteredUsers = users.filter((user) => !user.isDeleted);
    return filteredUsers;
  }
}
