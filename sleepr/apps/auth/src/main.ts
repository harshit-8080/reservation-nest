import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: { host: '0.0.0.0', port: 3002 },
  });

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));

  // const configService = app.use(ConfigService);

  // // console.log(configService.get('MONGODB_URI'));
  // console.log(configService);

  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
