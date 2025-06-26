import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class GetUserInfoUsecase {
    constructor(private readonly configService: ConfigService) { }

    async execute(accessToken: string): Promise<any> {
        const userinfoEndpoint = this.configService.get<string>('OIDC_USERINFO_URL');

        try {
            const response = await axios.get(userinfoEndpoint, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching user info:', error.response?.data || error.message);
            throw error;
        }
    }
}
