import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class ValidateTokenUsecase {
    constructor(private readonly configService: ConfigService) { }

    async execute(accessToken: string): Promise<boolean> {
        if (!accessToken) {
            throw new UnauthorizedException('Token não fornecido');
        }
        try {
            const introspectionUrl = this.configService.get<string>('OIDC_INTROSPECTION_URL');
            const clientId = this.configService.get<string>('OIDC_CLIENT_ID');
            const clientSecret = this.configService.get<string>('OIDC_CLIENT_SECRET');
            const response = await axios.post(
                introspectionUrl,
                new URLSearchParams({
                    token: accessToken,
                    token_type_hint: 'access_token'
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
                    }
                }
            );
            return response.data.active === true;
        } catch (error) {
            console.error('Erro ao validar token:', error.response?.data || error.message);
            return false;
        }
    }
}
