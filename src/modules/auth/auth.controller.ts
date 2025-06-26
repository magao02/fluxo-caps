import { Controller, Get, Query, Req, Res, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) { }

    @Get('login')
    async login(@Res() res: Response) {
        const { url } = this.authService.initiateAuth();
        return res.redirect(url);
    }

    @Get('callback')
    async callback(
        @Query('code') code: string,
        @Query('error') error: string,
        @Req() req: Request,
        @Res() res: Response
    ) {
        try {

            await this.authService.handleCallback({
                code,
                error,
                session: req.session
            });

            const CLIENT_URL_REDIRECT = this.configService.get('CLIENT_URL_REDIRECT');
            return res.redirect(CLIENT_URL_REDIRECT);

        } catch (error) {
            console.error('Callback error:', error);
            throw new UnauthorizedException('Authentication failed');
        }
    }

    @Get('logout')
    async logout(@Req() req: Request) {
        req.session.destroy(() => { })
    }
}
