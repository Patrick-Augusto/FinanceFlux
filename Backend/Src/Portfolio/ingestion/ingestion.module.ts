import { Module } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { CouchbaseModule } from '../couchbase/couchbase.module';

@Module({
  imports: [CouchbaseModule],
  providers: [IngestionService],
  exports: [IngestionService],
})
export class IngestionModule {}
