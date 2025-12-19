
export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

export interface SentimentResult {
  score: number; // -100 to 100
  label: 'Positive' | 'Neutral' | 'Negative';
  explanation: string;
  headlines: string[];
}

export type TradingSignal = 'Strong Buy' | 'Buy' | 'Neutral' | 'Sell' | 'Strong Sell';

export interface DashboardState {
  prices: CoinData[];
  sentiment: SentimentResult | null;
  signal: TradingSignal;
  lastUpdated: Date;
  loading: boolean;
  error: string | null;
}
