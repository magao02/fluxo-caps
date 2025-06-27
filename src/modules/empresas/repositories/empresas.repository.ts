import { UpdateEmpresaDto } from '../dto/update-empresa.dto';
import { Empresa } from '../interfaces/empresa.interface';

export abstract class EmpresasRepository {
  abstract create(produto: Empresa): Promise<Empresa>;
  abstract findAll(): Promise<Empresa[]>;
  abstract findOne(id: string): Promise<Empresa>;
  abstract findByCnpj(cnpj: string): Promise<Empresa | null>;
  abstract update(id: string, produto: Partial<UpdateEmpresaDto>): Promise<Empresa>;
  abstract delete(id: string): Promise<void>;
}
