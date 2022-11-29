import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    JwtModule.register({
      secret: "123",
      signOptions: { expiresIn: '3600s' },
    }),
    PassportModule,
    UsersModule],
  providers: [AuthService,JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
