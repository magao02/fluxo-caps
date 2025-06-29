import { Injectable } from '@nestjs/common';

import { Venda } from '../interfaces/venda.interface';
import { VendasRepository } from '../repositories/vendas.repository';

@Injectable()
export class FindOneVendaUseCase {
  constructor(private vendasRepository: VendasRepository) { }

  async execute(id: string): Promise<Venda | null> {
    const venda = await this.vendasRepository.findOne(id);
    if (!venda) {
      throw new Error('Venda não encontrada');
    }
    return venda;
  }
}