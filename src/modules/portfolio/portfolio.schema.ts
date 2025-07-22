import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({ collection: 'portfolio', timestamps: true,versionKey: false })
export class PortfolioHolding extends Document {
   @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  stockName: string;

  @Prop({ required: true })
  purchasePrice: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  investment: number;

  @Prop({ required: true })
  portfolio: number;

  @Prop({ required: true })
  exchangeCode: string;

  @Prop({ required: true })
  sector: string;
}

export const PortfolioHoldingSchema = SchemaFactory.createForClass(PortfolioHolding);
