import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederService } from './seeder/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug'],
  });
  const seederService = app.get(SeederService);
  await seederService.seed();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
