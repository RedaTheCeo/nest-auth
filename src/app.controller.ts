import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from "./auth/auth.service";
import { User } from './users/entities/user.entity';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  login(@Body() user:any): any {
    return this.authService.login(user.username,user.password);
  }
}
