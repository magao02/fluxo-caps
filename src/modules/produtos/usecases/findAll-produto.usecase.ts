import { Injectable } from '@nestjs/common';

import { Produto } from '../interfaces/produto.interface';
import { ProdutosRepository } from '../repositories/produtos.repository';

@Injectable()
export class FindAllProdutosUseCase {
  constructor(private produtosRepository: ProdutosRepository) {}

  async execute(empresaId: string): Promise<Produto[]> {
    const produtos = await this.produtosRepository.findAll(empresaId);
    return produtos;
  }
}