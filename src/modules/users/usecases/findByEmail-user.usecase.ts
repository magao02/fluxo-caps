import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from '../interfaces/user.interface';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class FinndByEmailUsecase {
  constructor(private readonly userRepository: UsersRepository) { }

  async execute(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    const isDeleted = user?.isDeleted;

    if (!user || isDeleted) {
      throw new NotFoundException(`User with ID ${email} not found`);
    }

    return user;
  }
}
