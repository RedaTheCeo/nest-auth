import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersModule } from './api/user/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './api/user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './api/client/clients.module';
import { CommandsModule } from './api/commands/commands.module';
import { DatabaseConfig } from './config/dbConfig';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(DatabaseConfig),
    UsersModule,
    AuthModule,
    ClientsModule,
    CommandsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
