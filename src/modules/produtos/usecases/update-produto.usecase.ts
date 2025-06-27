import { Injectable } from '@nestjs/common';

import { UpdateProdutoDto } from '../dto/update-produto.dto';
import { Produto } from '../interfaces/produto.interface';
import { ProdutosRepository } from '../repositories/produtos.repository';

@Injectable()
export class UpdateProdutoUseCase {
  constructor(private produtosRepository: ProdutosRepository) {}

  async execute(data: UpdateProdutoDto, id: string): Promise<Produto | null> {
    const produtoExistente = await this.produtosRepository.findOne(id);

    if (!produtoExistente) {
      return null;
    }

    const produtoAtualizado = await this.produtosRepository.update(id, {
      ...produtoExistente,
      ...data,
    });

    return produtoAtualizado;
  }
}
