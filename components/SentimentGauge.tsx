
import React from 'react';
import { SentimentResult } from '../types';

interface SentimentGaugeProps {
  sentiment: SentimentResult | null;
}

const SentimentGauge: React.FC<SentimentGaugeProps> = ({ sentiment }) => {
  if (!sentiment) return <div className="animate-pulse h-64 bg-slate-800 rounded-2xl"></div>;

  const score = sentiment.score; // -100 to 100
  const normalizedPercentage = ((score + 100) / 200) * 100;
  
  const getLabelColor = (label: string) => {
    if (label === 'Positive') return 'text-green-400';
    if (label === 'Negative') return 'text-red-400';
    return 'text-slate-400';
  };

  const getBarColor = (label: string) => {
    if (label === 'Positive') return 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]';
    if (label === 'Negative') return 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]';
    return 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]';
  };

  return (
    <div className="glass p-6 rounded-2xl neon-border-blue h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <i className="fa-solid fa-brain text-cyan-400"></i>
        AI Sentiment Intel
      </h2>
      
      <div className="flex-grow flex flex-col justify-center">
        <div className="text-center mb-4">
          <span className={`text-4xl font-black ${getLabelColor(sentiment.label)}`}>
            {score > 0 ? '+' : ''}{score}
          </span>
          <p className="text-sm font-bold uppercase tracking-widest text-slate-500 mt-1">
            Overall Sentiment: <span className={getLabelColor(sentiment.label)}>{sentiment.label}</span>
          </p>
        </div>

        <div className="relative h-4 w-full bg-slate-900 rounded-full overflow-hidden mb-6">
          <div 
            className={`absolute top-0 left-0 h-full transition-all duration-1000 ease-out ${getBarColor(sentiment.label)}`}
            style={{ width: `${normalizedPercentage}%` }}
          />
        </div>

        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
          <p className="text-xs text-slate-300 italic">"{sentiment.explanation}"</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xs font-bold text-slate-500 uppercase mb-3">Recent Signals Analyzed</h3>
        <ul className="space-y-2">
          {sentiment.headlines.slice(0, 3).map((h, i) => (
            <li key={i} className="text-xs text-slate-400 truncate flex items-center gap-2">
              <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
              {h}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SentimentGauge;
