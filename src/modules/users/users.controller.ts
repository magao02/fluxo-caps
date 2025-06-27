import { UUID } from 'crypto';

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,

} from '@nestjs/common';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';



import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';
@Controller('users')

export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @ApiResponse({
    status: 200,
    schema: {
      type: 'array',
      items: {
        type: 'object',
        $ref: getSchemaPath(CreateUserDto),
      },
    },
  })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(CreateUserDto),
    },
  })
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(CreateUserDto),
    },
  })
  @UsePipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
      transform: true,
    }),
  )
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {

    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(CreateUserDto),
    },
  })
  @UsePipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  )
  async update(@Param('id') id: UUID, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'User deleted',
  })
  @HttpCode(204)
  async remove(@Param('id') id: UUID): Promise<void> {
    await this.usersService.remove(id);
    return;
  }
}
