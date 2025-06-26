import { UpdateProdutoDto } from '../dto/update-produto.dto';
import { Produto } from '../interfaces/produto.interface';

export abstract class ProdutosRepository {
  abstract create(produto: Produto): Promise<Produto>;
  abstract findAll(empresaId: string): Promise<Produto[]>;
  abstract findOne(id: string): Promise<Produto>;
  abstract update(id: string, produto: Partial<UpdateProdutoDto>): Promise<Produto>;
  abstract delete(id: string): Promise<void>;
}
