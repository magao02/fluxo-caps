import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Produto } from './entities/produto-pg.entity';
import { ProdutosController } from './produtos.controller';
import { ProdutosService } from './produtos.service';
import { ProdutosRepositoryTypeorm } from './repositories/produtos-pg.repository';
import { ProdutosRepository } from './repositories/produtos.repository';
import { CreateProdutoUseCase } from './usecases/create-produto.usecase';
import { DeleteProdutoUseCase } from './usecases/delete-produto.usecase';
import { FindAllProdutosUseCase } from './usecases/findAll-Produto.usecase';
import { FindOneProdutoUseCase } from './usecases/findOne-produto.usecase';
import { UpdateProdutoUseCase } from './usecases/update-produto.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Produto])],
  controllers: [ProdutosController],
  providers: [ProdutosService,
    {
      provide: ProdutosRepository,
      useClass: ProdutosRepositoryTypeorm,
    },
    // Use Cases
    CreateProdutoUseCase,
    DeleteProdutoUseCase,
    FindAllProdutosUseCase,
    FindOneProdutoUseCase,
    UpdateProdutoUseCase,
  ],
  exports: [
    FindOneProdutoUseCase, // Exportando para ser usado em outros módulos
    ProdutosRepository, // Exportando o repository também
  ],
})
export class ProdutosModule {}
