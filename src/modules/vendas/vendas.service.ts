import { Injectable } from '@nestjs/common';


import { CreateVendaDto } from './dto/create-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';
import { CreateVendaUseCase } from './usecases/create-venda.usecase';
import { DeleteVendaUseCase } from './usecases/delete-venda.usecase';
import { FindAllVendasUseCase } from './usecases/findAll-venda.usecase';
import { FindOneVendaUseCase } from './usecases/findOne-venda.usecase';
import { UpdateVendaUseCase } from './usecases/update-venda.usecase';

@Injectable()
export class VendasService {
  constructor(
    private readonly createVendaUseCase: CreateVendaUseCase,
    private readonly findAllVendasUseCase: FindAllVendasUseCase,
    private readonly findOneVendaUseCase: FindOneVendaUseCase,
    private readonly updateVendaUseCase: UpdateVendaUseCase,
    private readonly removeVendaUseCase: DeleteVendaUseCase,
  ) {}

  create(createVendaDto: CreateVendaDto, empresaId: string) {
    return this.createVendaUseCase.execute(createVendaDto, empresaId);
  }

  findAll(empresaId: string) {
    return this.findAllVendasUseCase.execute(empresaId);
  }

  findOne(id: string) {
    return this.findOneVendaUseCase.execute(id);
  }

  update(id: string, updateVendaDto: UpdateVendaDto) {
    return this.updateVendaUseCase.execute(id, updateVendaDto);
  }

  remove(id: string) {
    return this.removeVendaUseCase.execute(id);
  }
}

