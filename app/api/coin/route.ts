
import { NextApiResponse } from 'next';
import {fetchPrices} from '../../pages/api/coin'
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, res: NextApiResponse) => {
    const url = new URL(req.url)
    const searchParams = new URLSearchParams(url.searchParams)
    const coin  = searchParams.get('coin') as any
    try {
        const result = await fetchPrices(coin as string) as any;
        return new NextResponse(JSON.stringify(result), {status:200})
      } catch (error: any) {
        console.log('error', error)
        return new Response('Error')
    }

}