import { FindOneEmpresaUseCase } from '@modules/empresas/usecases/findOne-empresa.usecase';
import { Injectable } from '@nestjs/common';

import { CreateProdutoDto } from '../dto/create-produto.dto';
import { Produto } from '../interfaces/produto.interface';
import { ProdutosRepository } from '../repositories/produtos.repository';


@Injectable()
export class CreateProdutoUseCase {
  constructor(private readonly produtosRepo: ProdutosRepository,
    private readonly findOneEmpresaUseCase: FindOneEmpresaUseCase, 

  ) {}

  async execute(dto: CreateProdutoDto, empresaId: string): Promise<Produto> {

    const empresa = await this.findOneEmpresaUseCase.execute(empresaId);

    if (!empresa) {
      throw new Error('Empresa não encontrada');
    }

    const produto: Produto = {
      ...dto,
      empresa,
      id: crypto.randomUUID(),
    }
    return this.produtosRepo.create(produto);
  }
}