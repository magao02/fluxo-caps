import { Injectable } from '@nestjs/common';

import { Empresa } from '../interfaces/empresa.interface';
import { EmpresasRepository } from '../repositories/empresas.repository';

@Injectable()
export class FindOneEmpresaUseCase {
  constructor(private readonly empresasRepository: EmpresasRepository) {}

  async execute(id: string): Promise<Empresa | null> {
    const empresa = await this.empresasRepository.findOne(id);
    return empresa;
  }
}