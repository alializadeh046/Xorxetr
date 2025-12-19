
import React from 'react';
import { CoinData } from '../types';

interface PriceCardProps {
  coins: CoinData[];
}

const PriceCard: React.FC<PriceCardProps> = ({ coins }) => {
  return (
    <div className="glass p-6 rounded-2xl neon-border-blue h-full">
      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <i className="fa-solid fa-chart-line text-cyan-400"></i>
        Market Pulse
      </h2>
      <div className="space-y-4">
        {coins.map((coin) => (
          <div key={coin.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors border border-transparent hover:border-cyan-500/30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs uppercase text-cyan-400">
                {coin.symbol}
              </div>
              <div>
                <p className="font-medium text-slate-200">{coin.name}</p>
                <p className="text-xs text-slate-500">Vol: ${(coin.market_cap / 1e9).toFixed(1)}B</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-mono text-slate-200">${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
              <p className={`text-xs font-semibold ${coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {coin.price_change_percentage_24h >= 0 ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceCard;
