import type { NextApiResponse } from 'next';
import dbConnect from '../../lib/mongodb';
import Price from '../../models/Price';
import axios from 'axios';

const symbols = ['bitcoin', 'ethereum', 'tether', 'solana', 'usd-coin', 'binancecoin', 'ripple', 'dogecoin', 'shiba'];
const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price';

async function fetchData() {
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
  console.log('priceData', priceData)
  return priceData;
}


async function updatePrices() {
  console.log('Updating prices...');
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

export const fetchPrices = async (coin: string) => {
  await dbConnect();
  await updatePrices();

  if (!coin) {
    return { status: 404, success: false, error: 'Coin name is required' };
  }

  try {
    const prices = await Price.find({ symbol: coin })
      .sort({ timestamp: -1 })
      .limit(20);
    return { status: 200, success: true, prices };
  } catch (error: any) {
    return { status:500, success: false, error: error.message };
  }
};

