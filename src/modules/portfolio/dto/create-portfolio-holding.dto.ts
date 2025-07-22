import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsMongoId, Min } from 'class-validator';

export class CreatePortfolioHoldingDto {
  @ApiProperty({ example: '64d1e82fb8f123abc4567890', description: 'User ID' })
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: 'Reliance Industries Ltd', description: 'Stock Name' })
  @IsString()
  @IsNotEmpty()
  stockName: string;

  @ApiProperty({ example: 2850.5, description: 'Purchase Price' })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  purchasePrice: number;

  @ApiProperty({ example: 10, description: 'Quantity' })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  quantity: number;

  @ApiProperty({ example: 28505, description: 'Investment' })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  investment: number;

  @ApiProperty({ example: 1, description: 'Portfolio ID' })
  @IsNumber()
  @IsNotEmpty()
  portfolio: number;

  @ApiProperty({ example: 'NSE', description: 'Exchange Code' })
  @IsString()
  @IsNotEmpty()
  exchangeCode: string;

  @ApiProperty({ example: 'Conglomerate', description: 'Sector' })
  @IsString()
  @IsNotEmpty()
  sector: string;
}
