import { Injectable } from '@nestjs/common';
import { CouchbaseService } from '../couchbase/couchbase.service';
import { CreatePortfolioDto } from '../portfolio/dto/create-portfolio.dto';

@Injectable()
export class IngestionService {
  constructor(private readonly couchbaseService: CouchbaseService) {}

  async fetchRealTimeData(): Promise<CreatePortfolioDto> {
   
    return {
      investorId: '1',
      stockSymbol: 'AAPL',
      quantity: Math.floor(Math.random() * 100) + 1, // Quantidade aleatória
      price: parseFloat((Math.random() * 150 + 100).toFixed(2)), // Preço aleatório
      timestamp: new Date(),
    };
  }


  async ingestData() {
    const data = await this.fetchRealTimeData();
    const collection = this.couchbaseService.getCollection();
    const documentKey = `portfolio::${data.investorId}::${data.stockSymbol}::${data.timestamp.getTime()}`;

    try {
      await collection.upsert(documentKey, data);
      console.log(`Dados inseridos: ${documentKey}`);
    } catch (error) {
      console.error('Erro ao inserir dados:', error);
    }
  }

  
  startDataIngestion(intervalInSeconds: number) {
    setInterval(() => this.ingestData(), intervalInSeconds * 1000);
  }
}
