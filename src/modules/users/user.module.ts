import { AuthModule } from '@modules/auth/auth.module';
import { MongooseUsersRepository } from '@modules/users/repositories/users-mongoose.repository';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User as UserMongo, UserMongoSchema } from './repositories/user-mongo.schema';
import { UsersRepository } from './repositories/users.repository';
import {
  CreateUserUsecase,
  RemoveUserUsecase,
  RetrieveUserUsecase,
  RetrieveUsersUsecase,
  UpdateUserUsecase,
} from './usecases/usecases';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: UserMongo.name, schema: UserMongoSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    CreateUserUsecase,
    RetrieveUsersUsecase,
    RetrieveUserUsecase,
    UpdateUserUsecase,
    RemoveUserUsecase,
    {
      provide: UsersRepository,
      useClass: MongooseUsersRepository,
    },
  ],
})
export class UserModule { }
