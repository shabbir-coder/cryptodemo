import cron from 'node-cron';
import axios from 'axios';
import dbConnect from './mongodb';
import Price from '../models/Price';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price';

interface PriceData {
  symbol: string;
  price: number;
  change: number;
  lastUpdatedAt: number;
  timestamp: Date;
}

async function fetchData() {
  const symbols = ['bitcoin', 'ethereum', 'cardano', 'solana', 'ripple'];
  const response = await axios.get(COINGECKO_API_URL, {
    params: {
      ids: symbols.join(','),
      vs_currencies: 'usd',
      include_24hr_change: true,
      include_last_updated_at: true
    },
  });

  const prices = response.data;
  const priceData : any = symbols.map((symbol) => ({
    symbol,
    price: prices[symbol].usd,
    priceChange: prices[symbol].usd_24h_change,
    lastUpdatedAt: prices[symbol].last_updated_at,
    timestamp: new Date(),
  }));

  return priceData;
}

async function pollData() {
  await dbConnect();

  const prices = await fetchData();

  for (const price of prices) {
    const existingPrice = await Price.findOne({ symbol: price.symbol }).sort({ timestamp: -1 });
    console.log('existingPrice',existingPrice)

    if (!existingPrice || existingPrice.lastUpdatedAt !== price.lastUpdatedAt) {
      console.log('called')
      console.log('price', price)
      await Price.create(price);
      console.log(`Data for ${price.symbol} added:`, price);
    } else {
      console.log(`No new data for ${price.symbol}`);
    }
  }
}

// Schedule the task to run every 5 seconds
cron.schedule('*/2* * * * *', pollData);
