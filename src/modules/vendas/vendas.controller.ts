/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';

import { CreateVendaDto } from './dto/create-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';
import { VendasService } from './vendas.service';

@Controller('vendas')
export class VendasController {
  constructor(private readonly vendasService: VendasService) {}

  @Post()
  create(@Body() createVendaDto: CreateVendaDto) {
    return this.vendasService.create(createVendaDto);
  }

  @Get()
  findAll(@Req() req: Request & { user?: { empresaId?: string } }) {
    const empresaId = 'ce16b275-479c-46f4-8228-084ba51038be' //req.user?.empresaId; // Assuming the user object contains empresaId
    return this.vendasService.findAll(empresaId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vendasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVendaDto: UpdateVendaDto) {
    return this.vendasService.update(id, updateVendaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vendasService.remove(id);
  }
}
