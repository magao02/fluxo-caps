//import { AuthModule } from '@modules/auth/auth.module';
import { Empresa } from '@modules/empresas/entities/empresa-pg.entity';
import { Produto } from '@modules/produtos/entities/produto-pg.entity';
import { ProdutosModule } from '@modules/produtos/produtos.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmpresasModule } from './modules/empresas/empresas.module';

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
      entities: [Produto, Empresa],
      synchronize: true,
    }),
    ProdutosModule,
    EmpresasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
