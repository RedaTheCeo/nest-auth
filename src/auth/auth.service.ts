import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from "../users/users.service";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService,  private jwtService: JwtService) { }

    async login(username: string, pass: string) {
        const user = await this.usersService.findByUsername(username);
        const passMatched = await bcrypt.compare(pass, user.password);
        console.log(passMatched);
        if (user && passMatched) {
            const payload = { username: user.username, sub: user.id };
            return { access_token: this.jwtService.sign(payload) };
        } else {
            throw new HttpException("password inccorect", HttpStatus.FORBIDDEN);
        }
    }
}
