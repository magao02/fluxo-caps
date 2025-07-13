/* eslint-disable @typescript-eslint/no-unused-vars */
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ProdutosService } from './produtos.service';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) { }
  
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProdutoDto: CreateProdutoDto, @Req() req: Request & { user?: { empresaId?: string } }) {
    
    const empresaId =  req.user?.empresaId;
    return this.produtosService.create(createProdutoDto, empresaId);
  }
  

  @Get()
  findAll(@Req() req: Request & { user?: { empresaId?: string } }) {
    const empresaId = req.user?.empresaId;
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
