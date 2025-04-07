import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  try {
    await app.listen(process.env.PORT ?? 3030);
    console.log('서버 3030포트 연결');
  } catch (error) {
    console.log('서버 에러 발생', error);
  }
}
bootstrap();
