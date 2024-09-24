import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cluster, connect, Bucket, Collection } from 'couchbase';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class CouchbaseService implements OnModuleInit {
  private cluster: Cluster;
  private bucket: Bucket;
  private collection: Collection;

  async onModuleInit() {
    const clusterConnStr = process.env.COUCHBASE_CONNECTION_STRING || 'couchbase://couchbase';
    const username = process.env.COUCHBASE_USERNAME || 'admin';
    const password = process.env.COUCHBASE_PASSWORD || 'password';
    const bucketName = process.env.COUCHBASE_BUCKET || 'investment_portfolio';

    try {
      this.cluster = await connect(clusterConnStr, {
        username: username,
        password: password,
      });
      this.bucket = this.cluster.bucket(bucketName);
      this.collection = this.bucket.defaultCollection();
      console.log('Conectado ao Couchbase com sucesso.');
    } catch (error) {
      console.error('Erro ao conectar ao Couchbase:', error);
    }
  }

  getCluster(): Cluster {
    return this.cluster;
  }

  getBucket(): Bucket {
    return this.bucket;
  }

  getCollection(): Collection {
    return this.collection;
  }
}
