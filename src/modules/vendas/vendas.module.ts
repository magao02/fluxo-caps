import { EmpresasModule } from '@modules/empresas/empresas.module';
import { ProdutosModule } from '@modules/produtos/produtos.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Venda } from './entities/venda.entity-pg';
import { VendasRepositoryTypeorm } from './repositories/vendas-pg.repository';
import { VendasRepository } from './repositories/vendas.repository';
import { CreateVendaUseCase } from './usecases/create-venda.usecase';
import { DeleteVendaUseCase } from './usecases/delete-venda.usecase';
import { FindAllVendasUseCase } from './usecases/findAll-venda.usecase';
import { FindOneVendaUseCase } from './usecases/findOne-venda.usecase';
import { UpdateVendaUseCase } from './usecases/update-venda.usecase';
import { VendasController } from './vendas.controller';
import { VendasService } from './vendas.service';

@Module({
   imports: [EmpresasModule, ProdutosModule, TypeOrmModule.forFeature([Venda])],
  controllers: [VendasController],
  providers: [VendasService,
    {
      provide: VendasRepository,
      useClass: VendasRepositoryTypeorm,
    },
    // Use Cases
    CreateVendaUseCase,
    DeleteVendaUseCase,
    FindAllVendasUseCase,
    FindOneVendaUseCase,
    UpdateVendaUseCase,

  ],
})
export class VendasModule {}
