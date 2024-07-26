
import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import dbConnect from '../../lib/mongodb';
import Price from '../../models/Price';

const symbols = ['bitcoin', 'ethereum', 'tether', 'solana', 'usd-coin', 'binancecoin', 'ripple', 'dogecoin', 'shiba'];
const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price';
const INTERVAL = 30 * 1000; // 10 seconds

let intervalId: NodeJS.Timeout | null = null;


export const GET = async (req: NextRequest, res: NextApiResponse) => {
    try {
        startBackgroundTask();
        return new NextResponse('Done', {status:200})

      } catch (error: any) {
        console.log('error', error)
        return new Response('Error')
    }

}

async function startBackgroundTask() {
    if (!intervalId) {
      await updatePrices();
      console.log(INTERVAL)
      intervalId = setInterval(updatePrices, INTERVAL);
      console.log('Background task started.');
    } else {
      console.log('Background task is already running.');
    }
  }

async function fetchData() {
  try {
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
    console.log('Fetched price data:', priceData);
    return priceData;
  } catch (error) {
    console.error('Error fetching data from CoinGecko:', error);
    return [];
  }
}

async function updatePrices() {
  console.log('Updating prices...');
  await dbConnect();

  const prices = await fetchData();
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

