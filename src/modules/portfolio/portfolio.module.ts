import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { PortfolioHolding, PortfolioHoldingSchema } from './portfolio.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PortfolioHolding.name, schema: PortfolioHoldingSchema },
    ]),
  ],
  controllers: [PortfolioController],
  providers: [PortfolioService],
  exports: [PortfolioService],
})
export class PortfolioModule {}
