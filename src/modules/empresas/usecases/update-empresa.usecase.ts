import { Injectable } from '@nestjs/common';

import { UpdateEmpresaDto } from '../dto/update-empresa.dto';
import { Empresa } from '../interfaces/empresa.interface';
import { EmpresasRepository } from '../repositories/empresas.repository';


@Injectable()
export class UpdateEmpresaUseCase {
  constructor(private empresaRepository: EmpresasRepository) {}

  async execute(data: UpdateEmpresaDto, id: string): Promise<Empresa | null> {
    const empresa = await this.empresaRepository.findOne(id);

    if (!empresa) {
      return null;
    }

    // Atualiza apenas os campos fornecidos
    Object.assign(empresa, {
      ...data,
      id: empresa.id // garante que o id não será alterado
    });

    await this.empresaRepository.update(id,empresa);

    return empresa;
  }
}