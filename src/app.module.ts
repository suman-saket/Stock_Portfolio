import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/db/database.config';
import { PortfolioModule } from './modules/portfolio/portfolio.module';

@Module({
  imports: [DatabaseModule, PortfolioModule],
})
export class AppModule {}
