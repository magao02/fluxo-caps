import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateEmpresaDto } from "../dto/create-empresa.dto";
import { UpdateEmpresaDto } from "../dto/update-empresa.dto";
import { Empresa } from "../entities/empresa-pg.entity";

import { EmpresasRepository } from "./empresas.repository";


@Injectable()
export class EmpresasRepositoryTypeorm extends EmpresasRepository {
  constructor(
    @InjectRepository(Empresa)
    private readonly repo: Repository<Empresa>,
  ) {
    super();
  }

  create(data: CreateEmpresaDto): Promise<Empresa> {
    const empresa = this.repo.create(data);
    return this.repo.save(empresa);
  }

  findAll(): Promise<Empresa[]> {
    return this.repo.find();
  }

  findOne(id: string): Promise<Empresa | null> {
    return this.repo.findOne({ where: { id } });
  }

  async findByCnpj(cnpj: string): Promise<Empresa | null> {
    return this.repo.findOne({ where: { cnpj } });
  }

  async update(id: string, data: UpdateEmpresaDto): Promise<Empresa> {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}