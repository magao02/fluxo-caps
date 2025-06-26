import { Injectable } from '@nestjs/common';

import { ProdutosRepository } from '../repositories/produtos.repository';

@Injectable()
export class DeleteProdutoUseCase {
  constructor(private produtosRepository: ProdutosRepository) {}

  async execute(id: string): Promise<void> {
    const produto = await this.produtosRepository.findOne(id);
    if (!produto) {
      throw new Error('Produto não encontrado');
    }
    await this.produtosRepository.delete(id);
  }
}