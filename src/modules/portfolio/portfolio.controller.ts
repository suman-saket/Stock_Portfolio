import { Controller, Get,Param } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { LiveFinanceService } from './live-finance.service';

@Controller('portfolio')
export class PortfolioController {
  constructor(
    private readonly portfolioService: PortfolioService,
    private readonly liveFinanceService: LiveFinanceService,
  ) {}

  @Get(':userId')
  async getPortfolio(@Param('userId') userId: string) {
    return await this.portfolioService.getPortfolio(userId);
  }

  @Get('live/:userId')
  async getPortfolioWithLiveData(@Param('userId') userId: string) {
    return await this.portfolioService.getPortfolioWithLiveData(userId);
  }
}
