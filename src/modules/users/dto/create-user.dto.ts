import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsString,
  Length,
  IsOptional
} from 'class-validator';



export class CreateUserDto {
  
  @IsString()
  empresaId: string;
  
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

  @IsOptional()
  @IsBoolean()
  isDeleted: boolean;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the User',
    required: true,
    type: String,
    format: 'string',
    minLength: 6,
  })
  @IsString()
  @Length(6, 100)
  password: string;
}
