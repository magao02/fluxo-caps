import { Injectable } from '@nestjs/common';

import { User } from '../interfaces/user.interface';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class CreateUserUsecase {
  constructor(private readonly userRepository: UsersRepository) { }

  async execute(user: User): Promise<User> {
    return this.userRepository.create(user);
  }
}
