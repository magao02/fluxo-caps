import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class CreateProdutoDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  price: number;

}
