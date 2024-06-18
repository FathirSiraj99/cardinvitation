import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(6969);
  return console.log ('welcome to cardinvitation')
 
}
bootstrap();
