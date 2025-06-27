import { Empresa } from '@modules/empresas/entities/empresa-pg.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

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

}