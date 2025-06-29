import { Produto } from "@modules/produtos/interfaces/produto.interface";

export interface VendaProduto {
  quantidade: number;
  produto: Produto;
}