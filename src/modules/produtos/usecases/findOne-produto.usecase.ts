import { Injectable } from '@nestjs/common';

import { Produto } from '../interfaces/produto.interface';
import { ProdutosRepository } from '../repositories/produtos.repository';

@Injectable()
export class FindOneProdutoUseCase {
  constructor(private readonly produtosRepository: ProdutosRepository) {}

  async execute(id: string): Promise<Produto | null> {
    const produto = await this.produtosRepository.findOne(id);
    return produto;
  }
}