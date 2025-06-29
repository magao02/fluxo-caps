//import { AuthModule } from '@modules/auth/auth.module';
import { AuthModule } from '@modules/auth/auth.module';
import { Empresa } from '@modules/empresas/entities/empresa-pg.entity';
import { Produto } from '@modules/produtos/entities/produto-pg.entity';
import { ProdutosModule } from '@modules/produtos/produtos.module';
import { User } from '@modules/users/entities/user-pg.entity';
import { UserModule } from '@modules/users/user.module';
import { VendaProduto } from '@modules/vendas/entities/venda-produto-pg.entity';
import { Venda } from '@modules/vendas/entities/venda.entity-pg';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmpresasModule } from './modules/empresas/empresas.module';
import { VendasModule } from './modules/vendas/vendas.module';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
      },
    ),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'postgres',
      entities: [Produto, Empresa, User, Venda, VendaProduto],
      synchronize: true,
    }),
    ProdutosModule,
    EmpresasModule,
    UserModule,
    VendasModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
