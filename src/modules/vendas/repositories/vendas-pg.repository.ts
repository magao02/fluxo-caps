import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UpdateVendaDto } from '../dto/update-venda.dto';
import { Venda } from '../entities/venda.entity-pg';

import { VendasRepository } from './vendas.repository';

@Injectable()
export class VendasRepositoryTypeorm extends VendasRepository {

  constructor(
    @InjectRepository(Venda)
    private readonly repo: Repository<Venda>,
  ) {
    super();
  }

  create(venda: Venda): Promise<Venda> {
    const newVenda = this.repo.create(venda);
    return this.repo.save(newVenda);
  }
  findAll(empresaId: string): Promise<Venda[]> {
    return this.repo.find({
      where: { empresa: { id: empresaId } },
      relations: ['products'], 
    });
  }
  findOne(id: string): Promise<Venda> {
    return this.repo.findOne({
      where: { id },
      relations: ['products'], 
    });
  }
  update(id: string, produto: Partial<UpdateVendaDto>): Promise<Venda> {
    return this.repo.save({ ...produto, id });
  }
  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
    return undefined;
  }
  
}