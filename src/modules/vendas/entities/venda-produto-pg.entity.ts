import { Produto } from "@modules/produtos/entities/produto-pg.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Venda } from "./venda.entity-pg";

@Entity('vendas_produtos')
export class VendaProduto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Venda, (venda) => venda.products, { onDelete: 'CASCADE' })
  venda: Venda;

  @ManyToOne(() => Produto, (produto) => produto.vendasProduto, { eager: true })
  produto: Produto;

  @Column('int')
  quantidade: number;
}
