
import React from 'react';
import { TradingSignal, CoinData, SentimentResult } from '../types';

interface SignalPanelProps {
  prices: CoinData[];
  sentiment: SentimentResult | null;
}

const SignalPanel: React.FC<SignalPanelProps> = ({ prices, sentiment }) => {
  const getSignal = (): { signal: TradingSignal; color: string; description: string } => {
    if (!sentiment || prices.length === 0) return { signal: 'Neutral', color: 'text-slate-400', description: 'Awaiting market data...' };

    const btc = prices.find(c => c.symbol === 'btc');
    const btcChange = btc?.price_change_percentage_24h || 0;
    const score = sentiment.score;

    // Logic: Combined weight of sentiment (60%) and price action (40%)
    const combinedFactor = (score * 0.6) + (btcChange * 5); // btcChange is often small, so weight it

    if (combinedFactor > 50) return { signal: 'Strong Buy', color: 'text-emerald-400', description: 'Bullish convergence detected across price and sentiment.' };
    if (combinedFactor > 15) return { signal: 'Buy', color: 'text-green-400', description: 'Positive sentiment outweighing minor price fluctuations.' };
    if (combinedFactor < -50) return { signal: 'Strong Sell', color: 'text-rose-500', description: 'Major bearish trend confirmed by AI sentiment analysis.' };
    if (combinedFactor < -15) return { signal: 'Sell', color: 'text-red-400', description: 'Sentiment turning negative amidst selling pressure.' };
    
    return { signal: 'Neutral', color: 'text-amber-400', description: 'Market in consolidation. No clear direction found.' };
  };

  const { signal, color, description } = getSignal();

  return (
    <div className="glass p-6 rounded-2xl neon-border-purple h-full flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <i className="fa-solid fa-shield-halved text-purple-400"></i>
          Signal Commander
        </h2>

        <div className="text-center py-8 bg-slate-900/40 rounded-3xl border-2 border-dashed border-slate-800">
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-2">Automated Execution Advice</p>
          <h3 className={`text-5xl font-black uppercase tracking-tighter ${color} drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
            {signal}
          </h3>
        </div>
      </div>

      <div className="mt-6 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
        <p className="text-sm text-slate-300 text-center">
          {description}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <button className="py-3 px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 font-bold text-sm transition-all border border-emerald-500/30">
          LONG ORDER
        </button>
        <button className="py-3 px-4 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 font-bold text-sm transition-all border border-rose-500/30">
          SHORT ORDER
        </button>
      </div>
    </div>
  );
};

export default SignalPanel;
