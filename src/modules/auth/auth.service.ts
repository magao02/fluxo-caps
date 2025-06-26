import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';

import { ExchangeTokenUsecase } from './usecases/exchange-token.usecase';
import { GetUserInfoUsecase } from './usecases/get-user-info.usecase';
import { InitiateAuthUsecase } from './usecases/initiate-auth.usecase';
import { ValidateTokenUsecase } from './usecases/validate-token.usecase';

@Injectable()
export class AuthService {
    constructor(
        private readonly initiateAuthUsecase: InitiateAuthUsecase,
        private readonly exchangeTokenUsecase: ExchangeTokenUsecase,
        private readonly getUserInfoUsecase: GetUserInfoUsecase,
        private readonly validateTokenUsecase: ValidateTokenUsecase,
    ) { }

    async validateUser(profile: any): Promise<any> {
        // Here you can implement your logic to validate the user
        // For example, you can check if the user exists in your database
        return profile;
    }

    initiateAuth(): { url: string } {
        return this.initiateAuthUsecase.execute();
    }

    async handleCallback(params: {
        code?: string;
        error?: string;
        session?: any;
    }): Promise<{
        message: string;
        user: any;
        tokens: {
            access_token: string;
            id_token?: string;
        };
    }> {
        const { code, error, session } = params;

        if (error) {
            throw new UnauthorizedException(`Authentication failed: ${error}`);
        }

        if (!code) {
            throw new UnauthorizedException('No authorization code received');
        }

        const tokens = await this.exchangeTokenUsecase.execute(code);
        const userInfo = await this.getUserInfoUsecase.execute(tokens.access_token);

        if (session) {
            session.accessToken = tokens.access_token;
            session.idToken = tokens.id_token;
            session.refreshToken = tokens.refresh_token;
            session.user = userInfo;
        }

        return {
            message: 'Autenticado com sucesso!',
            user: userInfo,
            tokens: {
                access_token: tokens.access_token,
                id_token: tokens.id_token,
            }
        };
    }

    async validateSessionToken(session: any): Promise<boolean> {

        if (!session?.accessToken) {
            return false
        }
        const isTokenValid = await this.validateTokenUsecase.execute(session.accessToken);

        return isTokenValid;
    }
}
