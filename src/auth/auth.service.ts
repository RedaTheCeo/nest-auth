import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from "../users/users.service";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService,  private jwtService: JwtService) { }

    async login(username: string, pass: string) {
        const user = await this.usersService.findByUsername(username);
        if (user && user.password === pass) {
            const payload = { username: user.username, sub: user.id };
            return { access_token: this.jwtService.sign(payload) };
        } else {
            throw new HttpException("password inccorect", HttpStatus.FORBIDDEN);
        }
    }

}
