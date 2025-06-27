import { Injectable } from '@nestjs/common';

import { Empresa } from '../interfaces/empresa.interface';
import { EmpresasRepository } from '../repositories/empresas.repository';

@Injectable()
export class FindAllEmpresaUseCase {
  constructor(private readonly empresaRepository: EmpresasRepository) {}

  async execute(): Promise<Empresa[]> {
    return this.empresaRepository.findAll();
  }
}