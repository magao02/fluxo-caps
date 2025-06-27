import { Injectable } from '@nestjs/common';

import { CreateEmpresaDto } from '../dto/create-empresa.dto';
import { Empresa } from '../interfaces/empresa.interface';
import { EmpresasRepository } from '../repositories/empresas.repository';

@Injectable()
export class CreateEmpresaUseCase {
  constructor(private empresaRepository: EmpresasRepository) {}

  async execute(data: CreateEmpresaDto): Promise<Empresa> {
    // Verifica se já existe uma empresa com o mesmo CNPJ
    const empresaExistente = await this.empresaRepository.findByCnpj(data.cnpj);
    if (empresaExistente) {
      throw new Error('Empresa com este CNPJ já existe.');
    }

    const empresa: Empresa = {
      id: crypto.randomUUID(), 
      ...data, 
      isDeleted: false, 
      createdAt: new Date(),
      updatedAt: new Date(), 
      deletedAt: null, 
    };

    return await this.empresaRepository.create(empresa);
  }
}