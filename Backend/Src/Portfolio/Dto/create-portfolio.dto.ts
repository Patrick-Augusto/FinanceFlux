export class CreatePortfolioDto {
    readonly investorId: string;
    readonly stockSymbol: string;
    readonly quantity: number;
    readonly price: number;
    readonly timestamp: Date;
  }