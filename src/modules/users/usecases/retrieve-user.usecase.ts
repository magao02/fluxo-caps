import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from '../interfaces/user.interface';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class RetrieveUserUsecase {
  constructor(private readonly userRepository: UsersRepository) { }

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    const isDeleted = user?.isDeleted;

    if (!user || isDeleted) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }
}
