import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PortfolioHolding } from './portfolio.schema';
import { LiveFinanceService } from './live-finance.service';
import { CreatePortfolioHoldingDto } from './dto/create-portfolio-holding.dto';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectModel(PortfolioHolding.name)
    private readonly portfolioModel: Model<PortfolioHolding>,
    private readonly liveFinanceService: LiveFinanceService,
  ) {}

  async getPortfolioWithLiveData(userId: string): Promise<any[]> {
    const holdings = await this.portfolioModel.find({ userId }).exec();
    const enriched = await Promise.all(
      holdings.map(async (holding) => {
        const tickerObj = this.liveFinanceService.getTicker(holding.stockName, holding.exchangeCode);
        let liveData: { cmp: number | null; peRatio: string | null; earnings: string | null } = { cmp: null, peRatio: null, earnings: null };
        try {
          liveData = await this.liveFinanceService.getLiveData(tickerObj);
        } catch (e) {
          console.error(`Error fetching live data for ${holding.stockName}:`, e);
        }
        return {
          ...holding.toObject(),
          ...liveData,
        };
      })
    );
    return enriched;
  }

  async createHolding(data: CreatePortfolioHoldingDto): Promise<PortfolioHolding> {
    const created = new this.portfolioModel({
      ...data,
      userId: new Types.ObjectId(data.userId)
    });
    return created.save();
  }
}
