import { Injectable } from '@nestjs/common';

import { Venda } from '../interfaces/venda.interface';
import { VendasRepository } from '../repositories/vendas.repository';


@Injectable()
export class FindAllVendasUseCase {
  constructor(private vendasRepository: VendasRepository) {}

  async execute(empresaId: string): Promise<Venda[]> {
    const vendas = await this.vendasRepository.findAll(empresaId);
    return vendas;
  }
 }