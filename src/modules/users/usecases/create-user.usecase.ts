import { Empresa } from '@modules/empresas/interfaces/empresa.interface';
import { FindOneEmpresaUseCase } from '@modules/empresas/usecases/findOne-empresa.usecase';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../interfaces/user.interface';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class CreateUserUsecase {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly findOneEmpresaUseCase: FindOneEmpresaUseCase
  ) { }

  async execute(dto: CreateUserDto, empresaId?: string): Promise<User> {
    const userExists = await this.userRepository.findByEmail(dto.email);
    if (userExists) {
      throw new Error('User already exists');
    }

    let empresa: Empresa | null = null;
    
    // Se foi fornecido um empresaId, busca a empresa
    if (empresaId) {
      empresa = await this.findOneEmpresaUseCase.execute(empresaId);
      if (!empresa) {
        throw new Error('Empresa not found');
      }
    }

    const passwordHash = await bcrypt.hash(dto.password, 8); 

    const user : User = {
      ...dto,
      password: passwordHash,
      id: crypto.randomUUID(),
      empresa
    };

    return this.userRepository.create(user);
  }
}
