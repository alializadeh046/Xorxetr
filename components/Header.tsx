
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="flex flex-col md:flex-row justify-between items-center p-6 mb-8 border-b border-slate-800 glass rounded-2xl neon-border-blue">
      <div className="flex items-center space-x-4">
        <div className="bg-cyan-500/20 p-3 rounded-xl">
          <i className="fa-solid fa-satellite-dish text-cyan-400 text-2xl animate-pulse"></i>
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Crypto Sentinel Dashboard
          </h1>
          <p className="text-slate-400 text-sm">Real-time Trading Intel</p>
        </div>
      </div>
      <div className="mt-4 md:mt-0 text-right">
        <div className="text-xl font-mono text-cyan-400">
          {time.toLocaleTimeString()}
        </div>
        <div className="text-xs text-slate-500">
          {time.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>
    </header>
  );
};

export default Header;
