import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UpdateProdutoDto } from '../dto/update-produto.dto';
import { Produto } from '../entities/produto-pg.entity';

import { ProdutosRepository } from './produtos.repository';

@Injectable()
export class ProdutosRepositoryTypeorm extends ProdutosRepository {
  constructor(
    @InjectRepository(Produto)
    private readonly repo: Repository<Produto>,
  ) {
    super();
  }

  create(data: Produto): Promise<Produto> {
    const produto = this.repo.create(data);
    return  this.repo.save(produto);
  }

  findAll(empresaId: string): Promise<Produto[]> {
    return this.repo.find({ 
      where: { empresa: { id: empresaId } },
      relations: ['empresa']
    });
  }

  findOne(id: string): Promise<Produto | null> {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: string, data: UpdateProdutoDto): Promise<Produto> {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
