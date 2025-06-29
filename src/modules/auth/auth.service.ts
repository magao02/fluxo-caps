import { Injectable } from '@nestjs/common';

import { LoginDto } from './dto/login.dto';
import { LoginUseCase } from './usecases/login.usecase';


@Injectable()
export class AuthService {
    constructor(

        private readonly loginUseCase: LoginUseCase
    ) { }



    async login(loginDto: LoginDto): Promise<{ access_token: string }> {
        return this.loginUseCase.execute(loginDto);
    }
}
