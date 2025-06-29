/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { Request } from 'express';

import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ProdutosService } from './produtos.service';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}
  @Post()
  create(@Body() createProdutoDto: CreateProdutoDto, @Req() req: Request & { user?: { empresaId?: string } }) {
    const empresaId = 'ce16b275-479c-46f4-8228-084ba51038be' //req.user?.empresaId; // Assuming the user object contains empresaId
    return this.produtosService.create(createProdutoDto, empresaId);
  }
  

  @Get()
  findAll(@Req() req: Request & { user?: { empresaId?: string } }) {
    const empresaId = 'ce16b275-479c-46f4-8228-084ba51038be' //req.user?.empresaId;
    return this.produtosService.findAll(empresaId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtosService.update(id, updateProdutoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtosService.remove(id);
  }
}
