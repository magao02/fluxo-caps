import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

import { User } from '../interfaces/user.interface';

export class UpdateUserDto implements Partial<User> {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the User',
    required: true,
    type: String,
    format: 'string',
    minLength: 3,
    maxLength: 50,
  })
  @IsOptional()
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
  @IsOptional()
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
  @IsOptional()
  @IsInt()
  @Min(18)
  @Max(100)
  age: number;
}
