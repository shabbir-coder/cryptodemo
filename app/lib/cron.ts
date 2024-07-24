// pages/api/pollData.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import dbConnect from './mongodb';
import Price from '../models/Price';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price';

interface PriceData {
  symbol: string;
  price: number;
  priceChange: number;
  lastUpdatedAt: number;
  timestamp: Date;
}

async function fetchData() {
  const symbols = ['bitcoin', 'ethereum', 'tether', 'solana', 'usd-coin', 'binancecoin', 'ripple', 'dogecoin', 'shiba'];
  const response = await axios.get(COINGECKO_API_URL, {
    params: {
      ids: symbols.join(','),
      vs_currencies: 'usd',
      include_24hr_change: true,
      include_last_updated_at: true,
    },
  });

  const prices = response.data;
  const priceData = symbols.map((symbol) => ({
    symbol,
    price: prices[symbol].usd,
    priceChange: prices[symbol].usd_24h_change,
    lastUpdatedAt: prices[symbol].last_updated_at,
    timestamp: new Date(),
  }));

  return priceData;
}

async function pollData() {
  console.log('Polling data...');
  await dbConnect();

  const prices = await fetchData();
  console.log('Fetched prices:', prices);
  for (const price of prices) {
    const existingPrice = await Price.findOne({ symbol: price.symbol }).sort({ timestamp: -1 });

    if (!existingPrice || existingPrice.lastUpdatedAt !== price.lastUpdatedAt) {
      await Price.create(price);
      console.log(`Data for ${price.symbol} added:`, price);
    } else {
      console.log(`No new data for ${price.symbol}`);
    }
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await pollData();
  res.status(200).json({ message: 'Data polled successfully' });
}
