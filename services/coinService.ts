
import { CoinData } from '../types';

export const fetchTopCoins = async (): Promise<CoinData[]> => {
  const coinIds = 'bitcoin,ethereum,solana,binancecoin,ripple';
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&per_page=5&page=1&sparkline=false&price_change_percentage=24h`
    );
    if (!response.ok) throw new Error('Failed to fetch price data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching prices:', error);
    throw error;
  }
};
