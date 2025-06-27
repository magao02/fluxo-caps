import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateEmpresaDto {
  
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  cnpj: string;

  @IsString()
  plano: string;

  @IsDate()
  InicioPlano?: Date;

  @IsDate()
  FimPlano?: Date;
}
