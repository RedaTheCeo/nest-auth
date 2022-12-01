import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(); // obligatory to use pipes in the project
  await app.listen(3000);
}
bootstrap();
