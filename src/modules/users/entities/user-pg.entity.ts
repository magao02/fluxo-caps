import { Empresa } from '@modules/empresas/entities/empresa-pg.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => Empresa, empresa => empresa.users)
  @JoinColumn({ name: 'empresaId' })
  empresa: Empresa;

}