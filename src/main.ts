import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors:true})
  /* Version API */
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ["1"]
  });
  await app.listen(3000);
  console.log(`Server on at: ${process.env.HOST}:${process.env.PORT}`)
  
}
bootstrap();