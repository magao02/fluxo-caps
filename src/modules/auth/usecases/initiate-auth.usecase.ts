import * as querystring from 'querystring';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InitiateAuthUsecase {
    constructor(private readonly configService: ConfigService) { }

    execute(): { url: string } {
        const params = {
            response_type: 'code',
            client_id: this.configService.get<string>('OIDC_CLIENT_ID'),
            redirect_uri: this.configService.get<string>('OIDC_CALLBACK_URL'),
            scope: 'openid email profile',
        };

        const authUrl = `${this.configService.get<string>('OIDC_AUTH_URL')}?${querystring.stringify(params)}`;
        return { url: authUrl };
    }
}
