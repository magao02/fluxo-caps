import { Empresa } from '@modules/empresas/interfaces/empresa.interface';
import { FindOneEmpresaUseCase } from '@modules/empresas/usecases/findOne-empresa.usecase';
import { FindOneProdutoUseCase } from '@modules/produtos/usecases/findOne-produto.usecase';
import { Injectable } from '@nestjs/common';

import { CreateVendaDto } from '../dto/create-venda.dto';
import { VendaProduto } from '../interfaces/venda-produto.interface';
import { Venda } from '../interfaces/venda.interface';
import { VendasRepository } from '../repositories/vendas.repository';

@Injectable()
export class CreateVendaUseCase {
  constructor(
    private readonly vendaRepository: VendasRepository,
    private readonly findOneEmpresaUseCase: FindOneEmpresaUseCase,
    private readonly findOneProduto: FindOneProdutoUseCase
  ) {}

  async execute(createVendaDto: CreateVendaDto, empresaId?: string ): Promise<Venda> {
    console.log(empresaId)
    let empresa: Empresa | null = null;
    empresa = await this.findOneEmpresaUseCase.execute(empresaId);
    if (!empresa) {
      throw new Error('Empresa não encontrada');
    }

    const products: VendaProduto[] = await Promise.all(
      createVendaDto.productsDto.map(async (produto) => {
        const produtoEncontrado = await this.findOneProduto.execute(produto.id);
        if (!produtoEncontrado) {
          throw new Error(`Produto com ID ${produto.id} não encontrado`);
        }
        return {
          quantidade: produto.quantidade,
          produto: produtoEncontrado,
        };
      })
    );

    const venda: Venda = {
      ...createVendaDto,
      id: crypto.randomUUID(),
      products,
      empresa,
    };

    return this.vendaRepository.create(venda);

    
  }
}