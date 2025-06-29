import { UpdateVendaDto } from '../dto/update-venda.dto';
import { Venda } from '../interfaces/venda.interface';

export abstract class VendasRepository {
  abstract create(venda: Venda): Promise<Venda>;
  abstract findAll(empresaId: string): Promise<Venda[]>;
  abstract findOne(id: string): Promise<Venda>;
  abstract update(id: string, produto: Partial<UpdateVendaDto>): Promise<Venda>;
  abstract delete(id: string): Promise<void>;
}
