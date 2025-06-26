import { UUID } from 'crypto';

import { Injectable } from '@nestjs/common';

import { User } from '../interfaces/user.interface';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UpdateUserUsecase {
  constructor(private readonly userRepository: UsersRepository) { }

  async execute(id: UUID, newUserData: Partial<User>): Promise<User> {
    return this.userRepository.update(id, newUserData);
  }
}
