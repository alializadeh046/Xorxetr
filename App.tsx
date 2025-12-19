
import React, { useState, useEffect, useCallback } from 'react';
import { DashboardState, CoinData, SentimentResult } from './types';
import { fetchTopCoins } from './services/coinService';
import { analyzeSentiment } from './services/geminiService';
import Header from './components/Header';
import PriceCard from './components/PriceCard';
import SentimentGauge from './components/SentimentGauge';
import SignalPanel from './components/SignalPanel';
import TradingChart from './components/TradingChart';

const App: React.FC = () => {
  const [state, setState] = useState<DashboardState>({
    prices: [],
    sentiment: null,
    signal: 'Neutral',
    lastUpdated: new Date(),
    loading: true,
    error: null,
  });

  const refreshData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      const [prices, sentiment] = await Promise.all([
        fetchTopCoins(),
        analyzeSentiment()
      ]);

      setState({
        prices,
        sentiment,
        signal: 'Neutral', // Computed in component
        lastUpdated: new Date(),
        loading: false,
        error: null,
      });
    } catch (err) {
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: 'Failed to update dashboard. Please check your connection.' 
      }));
    }
  }, []);

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 60000); // Auto-refresh every 60 seconds
    return () => clearInterval(interval);
  }, [refreshData]);

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
      <Header />

      {state.error && (
        <div className="mb-6 bg-red-500/20 border border-red-500/50 text-red-200 p-4 rounded-xl flex items-center justify-between">
          <p><i className="fa-solid fa-circle-exclamation mr-2"></i> {state.error}</p>
          <button onClick={refreshData} className="text-sm font-bold underline">RETRY</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Prices & Signals */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
          <div className="flex-1">
            <PriceCard coins={state.prices} />
          </div>
          <div className="flex-1">
            <SignalPanel prices={state.prices} sentiment={state.sentiment} />
          </div>
        </div>

        {/* Center/Right - Charts & Sentiment */}
        <div className="lg:col-span-8 space-y-6">
          <TradingChart />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            <SentimentGauge sentiment={state.sentiment} />
            <div className="glass p-6 rounded-2xl neon-border-purple h-full">
              <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <i className="fa-solid fa-bell text-purple-400"></i>
                Sentinel Alerts
              </h2>
              <div className="space-y-4">
                <div className="p-3 bg-slate-900/50 rounded-xl border-l-4 border-cyan-400">
                  <p className="text-xs text-slate-500 mb-1">Alert ID: #29401</p>
                  <p className="text-sm text-slate-200 font-medium">BTC breaking $90k resistance level. Watch for volatility.</p>
                </div>
                <div className="p-3 bg-slate-900/50 rounded-xl border-l-4 border-purple-400">
                  <p className="text-xs text-slate-500 mb-1">Alert ID: #29402</p>
                  <p className="text-sm text-slate-200 font-medium">Sentiment Shift: Flash news surge in bearish mentions.</p>
                </div>
                <div className="p-3 bg-slate-900/50 rounded-xl border-l-4 border-emerald-400 opacity-50">
                  <p className="text-xs text-slate-500 mb-1">2 hours ago</p>
                  <p className="text-sm text-slate-200 font-medium">Daily candle close confirmed above EMA20.</p>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Telegram Status</span>
                  <span className="flex items-center gap-1 text-green-400">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
                    ACTIVE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-12 text-center text-slate-600 text-sm">
        <p>© 2024 Crypto Sentinel Dashboard • Powered by Gemini AI & CoinGecko</p>
      </footer>
    </div>
  );
};

export default App;
