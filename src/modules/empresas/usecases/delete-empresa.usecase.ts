import { Injectable } from '@nestjs/common';

import { EmpresasRepository } from '../repositories/empresas.repository';

@Injectable()
export class DeleteEmpresaUseCase {
  constructor(private empresaRepository: EmpresasRepository) {}

  async execute(id: string): Promise<void> {
    const empresa = await this.empresaRepository.findOne(id);
    if (!empresa) {
      throw new Error('Empresa not found');
    }
    await this.empresaRepository.delete(id);
  }
}