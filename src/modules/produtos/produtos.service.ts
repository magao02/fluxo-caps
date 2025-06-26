import { Injectable } from '@nestjs/common';


import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { CreateProdutoUseCase } from './usecases/create-produto.usecase';
import { DeleteProdutoUseCase } from './usecases/delete-produto.usecase';
import { FindAllProdutosUseCase } from './usecases/findAll-Produto.usecase';
import { FindOneProdutoUseCase } from './usecases/findOne-produto.usecase';
import { UpdateProdutoUseCase } from './usecases/update-produto.usecase';

@Injectable()
export class ProdutosService {
  constructor(
    private readonly createUseCase: CreateProdutoUseCase,
    private readonly findAllUseCase: FindAllProdutosUseCase,
    private readonly findOneUseCase: FindOneProdutoUseCase,
    private readonly updateUseCase: UpdateProdutoUseCase,
    private readonly deleteUseCase: DeleteProdutoUseCase,
  ) {}

  create(dto: CreateProdutoDto, empresaId: string) {
    return this.createUseCase.execute(dto, empresaId);
  }

  findAll(empresaId: string) {
    return this.findAllUseCase.execute(empresaId);
  }

  findOne(id: string) {
    return this.findOneUseCase.execute(id);
  }

  update(id: string, dto: UpdateProdutoDto) {
    return this.updateUseCase.execute(dto,id);
  }

  remove(id: string) {
    return this.deleteUseCase.execute(id);
  }
}
