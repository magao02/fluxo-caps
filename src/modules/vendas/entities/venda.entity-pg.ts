import { Empresa } from "@modules/empresas/entities/empresa-pg.entity";
import { Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { PrimaryGeneratedColumn, Column } from "typeorm";

import { PaymentStatus, OrderStatus, DeliveryCompany } from '../enums/venda.enums';

import { VendaProduto } from "./venda-produto-pg.entity";

@Entity('vendas')
export class Venda {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  pedido: string;

  @Column({ type: 'varchar', length: 255 })
  cliente: string;

  @Column({ type: 'varchar', length: 20 })
  numero: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.FICHA_ENTREGUE
  })
  status: OrderStatus;

  @OneToMany(() => VendaProduto, (vp) => vp.venda, { cascade: true })
  products: VendaProduto[];

  @Column({ type: 'varchar', length: 50 })
  paymentMethod: string;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDENTE
  })
  paymentStatus: PaymentStatus;

  @Column({
    type: 'enum',
    enum: DeliveryCompany,
    default: DeliveryCompany.CORREIOS
  })
  deliveryCompany: DeliveryCompany;

  @Column({ type: 'date', nullable: true })
  deliveryDate?: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  deliveryAddress?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  trackingCode?: string;

  @ManyToOne(() => Empresa, empresa => empresa.vendas)
  @JoinColumn({ name: 'empresaId' })
  empresa: Empresa;
}