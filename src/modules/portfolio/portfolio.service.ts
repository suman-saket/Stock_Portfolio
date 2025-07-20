import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PortfolioHolding } from './portfolio.schema';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectModel(PortfolioHolding.name)
    private readonly portfolioModel: Model<PortfolioHolding>,
  ) {}

  async getPortfolio(userId: string): Promise<PortfolioHolding[]> {
    const result = await this.portfolioModel.find({ userId }).exec();
    return result;
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
