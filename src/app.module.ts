import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/users/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
      },
    ),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_URL,
      }),
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
