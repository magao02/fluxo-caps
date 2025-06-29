import { Empresa } from '@modules/empresas/entities/empresa-pg.entity';
import { VendaProduto } from '@modules/vendas/entities/venda-produto-pg.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('produtos')
export class Produto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal')
  price: number;


  @ManyToOne(() => Empresa, empresa => empresa.produtos)
  @JoinColumn({ name: 'empresaId' })
  empresa: Empresa;

  @OneToMany(() => VendaProduto, (vp) => vp.produto)
  vendasProduto: VendaProduto[];

}