import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStategy } from './stategy/local.stategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStategy } from './stategy/jwt.stategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: 'secretttttkeyyyyyyyyyyy',
        signOptions: {
          expiresIn: 3600,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStategy, JwtStategy],
})
export class AuthModule {}
