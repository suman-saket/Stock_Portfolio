import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PortfolioHolding } from './portfolio.schema';
import { LiveFinanceService } from './live-finance.service';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectModel(PortfolioHolding.name)
    private readonly portfolioModel: Model<PortfolioHolding>,
    private readonly liveFinanceService: LiveFinanceService,
  ) {}

  async getPortfolio(userId: string): Promise<PortfolioHolding[]> {
    const result = await this.portfolioModel.find({ userId }).exec();
    return result;
  }

  async getPortfolioWithLiveData(userId: string): Promise<any[]> {
    const holdings = await this.portfolioModel.find({ userId }).exec();
    const enriched = await Promise.all(
      holdings.map(async (holding) => {
        const tickerObj = this.liveFinanceService.getTicker(holding.stockName, holding.exchangeCode);
        let liveData: { cmp: number | null; peRatio: string | null; earnings: string | null } = { cmp: null, peRatio: null, earnings: null };
        try {
          liveData = await this.liveFinanceService.getLiveData(tickerObj);
        } catch (e) {
          // Handle error, fallback to nulls
        }
        return {
          ...holding.toObject(),
          ...liveData,
        };
      })
    );
    return enriched;
  }

  // async createHolding(data: Partial<PortfolioHolding>): Promise<PortfolioHolding> {
  //   const created = new this.portfolioModel(data);
  //   return created.save();
  // }

  // async updateHolding(id: string, data: Partial<PortfolioHolding>): Promise<PortfolioHolding | null> {
  //   return this.portfolioModel.findByIdAndUpdate(id, data, { new: true }).exec();
  // }

  // async deleteHolding(id: string): Promise<{ deleted: boolean }> {
  //   const result = await this.portfolioModel.deleteOne({ _id: id }).exec();
  //   return { deleted: result.deletedCount === 1 };
  // }
}
