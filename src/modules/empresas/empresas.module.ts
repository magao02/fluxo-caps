import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmpresasController } from './empresas.controller';
import { EmpresasService } from './empresas.service';
import { Empresa } from './entities/empresa-pg.entity';
import { EmpresasRepositoryTypeorm } from './repositories/empresas-pg.repository';
import { EmpresasRepository } from './repositories/empresas.repository';
import { CreateEmpresaUseCase } from './usecases/create-empresa.usecase';
import { DeleteEmpresaUseCase } from './usecases/delete-empresa.usecase';
import { FindAllEmpresaUseCase } from './usecases/findAll-empresa.usecase';
import { FindOneEmpresaUseCase } from './usecases/findOne-empresa.usecase';
import { UpdateEmpresaUseCase } from './usecases/update-empresa.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Empresa])],
  controllers: [EmpresasController],
  providers: [EmpresasService,
    {
      provide: EmpresasRepository,
      useClass: EmpresasRepositoryTypeorm, // Assuming you have a class named EmpresasRepositoryTypeorm
    },
    // Use Cases
    CreateEmpresaUseCase,
    UpdateEmpresaUseCase,
    DeleteEmpresaUseCase,
    FindAllEmpresaUseCase,
    FindOneEmpresaUseCase,
    
  ],
  exports: [
    FindOneEmpresaUseCase, // Exportando para ser usado em outros módulos
    EmpresasRepository, // Exportando o repository também
  ],
})
export class EmpresasModule {}
