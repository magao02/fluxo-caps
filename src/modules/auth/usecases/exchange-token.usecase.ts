import * as querystring from 'querystring';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class ExchangeTokenUsecase {
    constructor(private readonly configService: ConfigService) { }

    async execute(code: string): Promise<{
        access_token: string;
        id_token?: string;
        refresh_token?: string;
    }> {
        const tokenEndpoint = this.configService.get<string>('OIDC_TOKEN_URL');
        const params = {
            grant_type: 'authorization_code',
            client_id: this.configService.get<string>('OIDC_CLIENT_ID'),
            client_secret: this.configService.get<string>('OIDC_CLIENT_SECRET'),
            code: code,
            redirect_uri: this.configService.get<string>('OIDC_CALLBACK_URL'),
        };

        try {
            const response = await axios.post(
                tokenEndpoint,
                querystring.stringify(params),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );

            return response.data;
        } catch (error) {
            console.error('Error exchanging code for tokens:', error.response?.data || error.message);
            throw error;
        }
    }
}
