import { Module } from '@nestjs/common';
import { CouchbaseService } from './couchbase.service';

@Module({
  providers: [CouchbaseService],
  exports: [CouchbaseService],
})
export class CouchbaseModule {}
