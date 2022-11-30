import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private dataSource: DataSource
  ) { }

  async create(user: User) {
    const { password } = user
    const hash = await bcrypt.hash(password, 10);
    return await this.usersRepository.save({...user, password:hash});
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async findByUsername(username: string): Promise<User> {
    const list = await this.usersRepository.find();
    const user = list.find(user => user.username === username);
    if (!user) {
      throw new HttpException("user not found", HttpStatus.NOT_FOUND);
    }
    return user;
  }

  update(id: string, user: User) {
    return this.usersRepository.update(id, user);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}