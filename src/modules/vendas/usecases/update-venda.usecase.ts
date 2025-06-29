import { Injectable } from '@nestjs/common';

import { UpdateVendaDto } from '../dto/update-venda.dto';
import { Venda } from '../interfaces/venda.interface';
import { VendasRepository } from '../repositories/vendas.repository';


@Injectable()
export class UpdateVendaUseCase {
  constructor(private vendasRepository: VendasRepository) {}

  async execute(id: string, venda: Partial<UpdateVendaDto>): Promise<Venda> {
    const existingVenda = await this.vendasRepository.findOne(id);
    if (!existingVenda) {
      throw new Error('Venda não encontrada');
    }

    const vendaAtualizada = await this.vendasRepository.update(id, { ...existingVenda, ...venda });
    return vendaAtualizada
  }
}