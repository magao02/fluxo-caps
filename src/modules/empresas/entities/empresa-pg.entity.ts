import { Produto } from '@modules/produtos/entities/produto-pg.entity';
import { User } from '@modules/users/entities/user-pg.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('empresas')
export class Empresa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('varchar')
  cnpj: string;

  @Column('varchar')
  plano: string;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  IncicioPlano?: Date;

  @Column({ type: 'timestamp', nullable: true })
  FimPlano?: Date;

  @OneToMany(() => Produto, produto => produto.empresa)
  produtos: Produto[];

  @OneToMany(() => User, user => user.empresa)
  users: User[];
 }
