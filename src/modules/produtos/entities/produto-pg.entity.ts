import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('produtos')
export class Produto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column('varchar')
  empresaId: string;

}