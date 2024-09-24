import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CouchbaseModule } from './couchbase/couchbase.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { IngestionModule } from './ingestion/ingestion.module';

@Module({
  imports: [CouchbaseModule, PortfolioModule, IngestionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
