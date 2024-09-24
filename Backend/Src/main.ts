import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IngestionService } from './ingestion/ingestion.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const ingestionService = app.get(IngestionService);
  ingestionService.startDataIngestion(10); 

  await app.listen(3000);
  console.log(`Servidor rodando na porta ${await app.getUrl()}`);
}
bootstrap();
