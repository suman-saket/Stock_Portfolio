import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { Types } from 'mongoose';
import { PortfolioService } from './portfolio.service';
import { LiveFinanceService } from './live-finance.service';
import { PortfolioHolding } from './portfolio.schema';
import { ApiBody } from '@nestjs/swagger';
import { CreatePortfolioHoldingDto } from './dto/create-portfolio-holding.dto';

@Controller('portfolio')
export class PortfolioController {
  constructor(
    private readonly portfolioService: PortfolioService,
    private readonly liveFinanceService: LiveFinanceService,
  ) {}

  @Get('live/:userId')
  async getPortfolioWithLiveData(@Param('userId') userId: string) {
    return await this.portfolioService.getPortfolioWithLiveData(userId);
  }

  @Post('add')
  @ApiBody({ type: CreatePortfolioHoldingDto })
  async createHolding(@Body() data: CreatePortfolioHoldingDto) {
    // Pass raw data, let service handle ObjectId conversion
    return await this.portfolioService.createHolding(data);
  }
}
