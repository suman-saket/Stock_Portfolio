import { ApiProperty } from '@nestjs/swagger';

export class CreatePortfolioHoldingDto {
  @ApiProperty({ example: '64d1e82fb8f123abc4567890', description: 'User ID' })
  userId: string;

  @ApiProperty({ example: 'Reliance Industries Ltd', description: 'Stock Name' })
  stockName: string;

  @ApiProperty({ example: 2850.5, description: 'Purchase Price' })
  purchasePrice: number;

  @ApiProperty({ example: 10, description: 'Quantity' })
  quantity: number;

  @ApiProperty({ example: 28505, description: 'Investment' })
  investment: number;

  @ApiProperty({ example: 1, description: 'Portfolio ID' })
  portfolio: number;

  @ApiProperty({ example: 'NSE', description: 'Exchange Code' })
  exchangeCode: string;

  @ApiProperty({ example: 'Conglomerate', description: 'Sector' })
  sector: string;
}
