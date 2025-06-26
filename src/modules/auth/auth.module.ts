import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ExchangeTokenUsecase } from './usecases/exchange-token.usecase';
import { GetUserInfoUsecase } from './usecases/get-user-info.usecase';
import { InitiateAuthUsecase } from './usecases/initiate-auth.usecase';
import { ValidateTokenUsecase } from './usecases/validate-token.usecase';

@Module({
    imports: [
        ConfigModule,
        PassportModule.register({ session: true }),
    ],
    providers: [
        AuthService,
        InitiateAuthUsecase,
        ExchangeTokenUsecase,
        GetUserInfoUsecase,
        ValidateTokenUsecase,
    ],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule { }
