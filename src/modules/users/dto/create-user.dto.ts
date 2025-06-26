import { UUID } from 'crypto';

import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
  IsOptional
} from 'class-validator';

import { User } from '../interfaces/user.interface';

export class CreateUserDto implements User {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the User',
    required: true,
    type: String,
    format: 'string',
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @Length(3, 50)
  name: string;

  @ApiProperty({
    example: 'JohnDoe@example.com',
    description: 'The email of the User',
    required: true,
    type: String,
    format: 'email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 18,
    description: 'The age of the User',
    required: true,
    type: Number,
    format: 'number',
    minimum: 18,
    maximum: 100,
  })
  @IsInt()
  @Min(18)
  @Max(100)
  age: number;

  @IsOptional()
  @IsUUID()
  id: UUID;

  @IsOptional()
  @IsBoolean()
  isDeleted: boolean;
}
