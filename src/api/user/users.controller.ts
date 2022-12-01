import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtGuard } from 'src/auth/jwt.guard';

@Controller('api/')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post("user")
  create(@Body() user: User) {
    return this.usersService.create(user);
  }

  @Get("users")
  findAll() {
    return this.usersService.findAll();
  }

  @Get('user/:id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Put('user/:id')
  update(@Param('id') id: string, @Body() user: User) {
    return this.usersService.update(id, user);
  }

  @Delete('user/:id')
  @UseGuards(JwtGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
