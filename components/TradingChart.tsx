
import React, { useEffect, useRef } from 'react';

const TradingChart: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (container.current && (window as any).TradingView) {
        new (window as any).TradingView.widget({
          "autosize": true,
          "symbol": "BINANCE:BTCUSDT",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "toolbar_bg": "#f1f3f6",
          "enable_publishing": false,
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "container_id": "tradingview_chart"
        });
      }
    };
    document.head.appendChild(script);
  }, []);

  return (
    <div className="glass p-6 rounded-2xl neon-border-purple h-[450px] flex flex-col">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <i className="fa-solid fa-wave-square text-purple-400"></i>
        BTC/USDT Analysis
      </h2>
      <div id="tradingview_chart" ref={container} className="flex-grow w-full rounded-xl overflow-hidden border border-slate-800" />
    </div>
  );
};

export default TradingChart;
