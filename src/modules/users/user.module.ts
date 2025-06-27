import { EmpresasModule } from '@modules/empresas/empresas.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user-pg.entity';
import { UsersRepositoryTypeorm } from './repositories/users-pg.repository';
import { UsersRepository } from './repositories/users.repository';
import {
  CreateUserUsecase,
  RemoveUserUsecase,
  RetrieveUserUsecase,
  RetrieveUsersUsecase,
  UpdateUserUsecase,
} from './usecases/usecases';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    // AuthModule,
    EmpresasModule, // Importando o módulo de empresas
    TypeOrmModule.forFeature([User]) // Usando a entidade User correta
    
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    CreateUserUsecase,
    RetrieveUsersUsecase,
    RetrieveUserUsecase,
    UpdateUserUsecase,
    RemoveUserUsecase,
    // FindOneEmpresaUseCase será injetado através do EmpresasModule
    {
      provide: UsersRepository,
      useClass: UsersRepositoryTypeorm,
    }
  ],
})
export class UserModule { }
