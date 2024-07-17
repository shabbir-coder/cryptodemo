import mongoose, { Schema, Document } from 'mongoose';

interface IPrice extends Document {
  symbol: string;
  price: number;
  priceChange: number;
  lastUpdatedAt: number;
  timestamp: Date;
}

const PriceSchema: Schema = new Schema({
  symbol: { type: String, required: true },
  price: { type: Number, required: true },
  priceChange: {type: Number, required: true},
  lastUpdatedAt :{type: Number},
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.Price || mongoose.model<IPrice>('Price', PriceSchema);
