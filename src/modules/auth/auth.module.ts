
import { UserModule } from '@modules/users/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LoginUseCase } from './usecases/login.usecase';


@Module({
    imports: [
        ConfigModule,
        PassportModule.register({ session: true }),
        JwtModule.register({
            secret: 'default',
            signOptions: { expiresIn: '86400s' },
        }),
        UserModule
        
    ],
    providers: [
        AuthService,
        LoginUseCase,
        JwtStrategy
    ],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule { }
