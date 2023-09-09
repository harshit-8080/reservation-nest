import { Module } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestJsConfigModule,
} from '@nestjs/config';

@Module({
  imports: [NestJsConfigModule.forRoot()],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
