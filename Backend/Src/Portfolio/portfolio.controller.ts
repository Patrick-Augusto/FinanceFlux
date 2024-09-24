import { Controller, Get, Post, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get(':id')
  async getPortfolio(@Param('id') id: string, @Res() res) {
    try {
      const portfolio = await this.portfolioService.getInvestorPortfolio(id);
      res.status(HttpStatus.OK).json(portfolio);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao obter portfólio',
        error: error.message,
      });
    }
  }

  @Post()
  async createPortfolio(@Body() createPortfolioDto: CreatePortfolioDto, @Res() res) {
    try {
      const result = await this.portfolioService.createPortfolioEntry(createPortfolioDto);
      res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao criar entrada de portfólio',
        error: error.message,
      });
    }
  }

  @Get(':id/risk-analysis')
  async getRiskAnalysis(@Param('id') id: string, @Res() res) {
    try {
      const analysis = await this.portfolioService.getRiskAnalysis(id);
      res.status(HttpStatus.OK).json(analysis);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro na análise de risco',
        error: error.message,
      });
    }
  }
}
