import { Controller, Get, Param, Post, Body, UsePipes, ValidationPipe, HttpStatus } from '@nestjs/common';
import { Types } from 'mongoose';
import { PortfolioService } from './portfolio.service';
import { LiveFinanceService } from './live-finance.service';
import { PortfolioHolding } from './portfolio.schema';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePortfolioHoldingDto } from './dto/create-portfolio-holding.dto';

@Controller('portfolio')
@ApiTags('Portfolio')
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
  @ApiOperation({ summary: 'Create a new portfolio holding' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The holding has been successfully created.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data.' })
  @ApiBody({ type: CreatePortfolioHoldingDto })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async createHolding(@Body() data: CreatePortfolioHoldingDto) {
    try {
      return await this.portfolioService.createHolding(data);
    } catch (error) {
      throw new Error(`Failed to create holding: ${error.message}`);
    }
  }
}
