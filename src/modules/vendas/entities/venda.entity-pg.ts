import { Empresa } from "@modules/empresas/entities/empresa-pg.entity";
import { Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { PrimaryGeneratedColumn, Column } from "typeorm";

import { VendaProduto } from "./venda-produto-pg.entity";

@Entity('vendas')
export class Venda {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  client: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'varchar', length: 50 })
  status: string;

  @OneToMany(() => VendaProduto, (vp) => vp.venda, { cascade: true })
  products: VendaProduto[];

  @Column({ type: 'varchar', length: 20, nullable: true })
  paymentMethod: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  paymentStatus: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  deliveryStatus: string;

  @Column({ type: 'date', nullable: true })
  deliveryDate: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  deliveryAddress: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  deliveryTracking: string;

  @ManyToOne(() => Empresa, empresa => empresa.vendas)
  @JoinColumn({ name: 'empresaId' })
  empresa: Empresa;

}
