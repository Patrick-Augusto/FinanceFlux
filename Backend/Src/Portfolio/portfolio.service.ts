import { Injectable } from '@nestjs/common';
import { CouchbaseService } from '../couchbase/couchbase.service';
import { Portfolio } from './interfaces/portfolio.interface';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';

@Injectable()
export class PortfolioService {
  constructor(private readonly couchbaseService: CouchbaseService) {}

  async createPortfolioEntry(createPortfolioDto: CreatePortfolioDto): Promise<any> {
    const collection = this.couchbaseService.getCollection();
    const documentKey = `portfolio::${createPortfolioDto.investorId}::${createPortfolioDto.stockSymbol}::${createPortfolioDto.timestamp.getTime()}`;

    try {
      await collection.upsert(documentKey, createPortfolioDto);
      return { message: 'Entrada de portfólio criada com sucesso' };
    } catch (error) {
      console.error('Erro ao criar entrada de portfólio:', error);
      throw error;
    }
  }

  async getInvestorPortfolio(investorId: string): Promise<Portfolio[]> {
    const cluster = this.couchbaseService.getCluster();
    const query = `
      SELECT *
      FROM \`${process.env.COUCHBASE_BUCKET}\`
      WHERE investorId = $investorId
    `;
    try {
      const result = await cluster.query(query, {
        parameters: { investorId },
      });
      return result.rows.map(row => row[process.env.COUCHBASE_BUCKET]);
    } catch (error) {
      console.error('Erro ao obter portfólio:', error);
      throw error;
    }
  }



  async getRiskAnalysis(investorId: string): Promise<any> {
    const cluster = this.couchbaseService.getCluster();
    const query = `
      SELECT 
        SUM(price * quantity) AS totalValue,
        STDDEV(price) AS priceVolatility
      FROM \`${process.env.COUCHBASE_BUCKET}\`
      WHERE investorId = $investorId
      GROUP BY stockSymbol
    `;
    try {
      const result = await cluster.query(query, {
        parameters: { investorId },
      });
      return result.rows;
    } catch (error) {
      console.error('Erro na análise de risco:', error);
      throw error;
    }
  }
}
