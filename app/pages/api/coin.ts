import type { NextApiResponse } from 'next';
import dbConnect from '../../lib/mongodb';
import Price from '../../models/Price';


export const fetchPrices = async (coin: string) => {
  await dbConnect();

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

