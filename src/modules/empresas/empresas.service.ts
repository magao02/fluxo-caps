import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';

import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { CreateEmpresaUseCase } from './usecases/create-empresa.usecase';
import { DeleteEmpresaUseCase } from './usecases/delete-empresa.usecase';
import { FindAllEmpresaUseCase } from './usecases/findAll-empresa.usecase';
import { FindOneEmpresaUseCase } from './usecases/findOne-empresa.usecase';
import { UpdateEmpresaUseCase } from './usecases/update-empresa.usecase';

@Injectable()
export class EmpresasService {
  constructor(
    @Inject(CreateEmpresaUseCase)
    private readonly createEmpresaUseCase: CreateEmpresaUseCase,
    @Inject(FindAllEmpresaUseCase)
    private readonly findAllEmpresasUseCase: FindAllEmpresaUseCase,
    @Inject(FindOneEmpresaUseCase)
    private readonly findOneEmpresaUseCase: FindOneEmpresaUseCase,
    @Inject(UpdateEmpresaUseCase)
    private readonly updateEmpresaUseCase: UpdateEmpresaUseCase,
    @Inject(DeleteEmpresaUseCase)
    private readonly removeEmpresaUseCase: DeleteEmpresaUseCase,
  ) {}

  async create(createEmpresaDto: CreateEmpresaDto) {
    return this.createEmpresaUseCase.execute(createEmpresaDto);
  }

  async findAll() {
    return this.findAllEmpresasUseCase.execute();
  }

  async findOne(id: string) {
    return this.findOneEmpresaUseCase.execute(id);
  }

  async update(id: string, updateEmpresaDto: UpdateEmpresaDto) {
    return this.updateEmpresaUseCase.execute(updateEmpresaDto, id);
  }

  async remove(id: string) {
    return this.removeEmpresaUseCase.execute(id);
  }
}