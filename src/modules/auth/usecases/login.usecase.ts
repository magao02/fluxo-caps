import { User } from '@modules/users/interfaces/user.interface';
import { FinndByEmailUsecase } from '@modules/users/usecases/findByEmail-user.usecase';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


import { LoginDto } from '../dto/login.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly findByEmailUser: FinndByEmailUsecase,
    private readonly jwtService: JwtService,
  ) { }
  
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.findByEmailUser.execute(email);
    if (!user) throw new UnauthorizedException('Credenciais inválidas');

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) throw new UnauthorizedException('Credenciais inválidas');

    return user;

   }

  async execute(loginDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    console.log(user.empresa);

    const empresaId = user.empresa.id
    const payload = { sub: user.id, email: user.email, empresaId: empresaId };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }
}
