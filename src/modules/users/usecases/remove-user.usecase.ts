import { Injectable } from '@nestjs/common';

import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class RemoveUserUsecase {
  constructor(private readonly usersRepository: UsersRepository) { }

  async execute(id: string) {
    await this.usersRepository.update(id, { isDeleted: true });
  }
}
