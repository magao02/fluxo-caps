import { Injectable } from '@nestjs/common';

import { VendasRepository } from '../repositories/vendas.repository';

@Injectable()
export class DeleteVendaUseCase {

  constructor(private vendasRepository: VendasRepository) { }

  async execute(id: string): Promise<void> {
    const venda = await this.vendasRepository.findOne(id);
    if (!venda) {
      throw new Error('Venda não encontrada');
    }
    await this.vendasRepository.delete(id);
  }
}