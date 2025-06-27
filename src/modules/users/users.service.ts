import { FindOneEmpresaUseCase } from '@modules/empresas/usecases/findOne-empresa.usecase';
import {  Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
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
    private readonly findOneEmpresaUseCase: FindOneEmpresaUseCase,
  ) { }

  async create(user: CreateUserDto): Promise<User> {
    
    return this.createUserUsecase.execute(user, user.empresaId);
  }

  async findAll(): Promise<User[]> {
    return this.retrieveUsersUsecase.execute();
  }

  async findOne(id: string): Promise<User> {
    return this.retrieveUserUsecase.execute(id);
  }

  async update(id: string, user: Partial<User>) {
    await this.retrieveUserUsecase.execute(id);
    return this.updateUserUsecase.execute(id, user);
  }

  async remove(id: string) {
    await this.retrieveUserUsecase.execute(id);
    return this.removeUserUsecase.execute(id);
  }
}
