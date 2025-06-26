import { Injectable } from '@nestjs/common';

import { CreateProdutoDto } from '../dto/create-produto.dto';
import { Produto } from '../interfaces/produto.interface';
import { ProdutosRepository } from '../repositories/produtos.repository';

@Injectable()
export class CreateProdutoUseCase {
  constructor(private readonly produtosRepo: ProdutosRepository) {}

  execute(dto: CreateProdutoDto, empresaId: string): Promise<Produto> {
    const produto: Produto = {
      ...dto,
      empresaId,
      id: crypto.randomUUID(),
    }
    return this.produtosRepo.create(produto);
  }
}