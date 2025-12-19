
# Crypto Sentinel Dashboard 🛰

A professional real-time cryptocurrency trading intelligence dashboard with AI-driven sentiment analysis and automated Telegram alerting.

## Features
- **Live Prices**: Top 5 cryptocurrencies via CoinGecko.
- **AI Sentiment**: Bitcoin sentiment analyzed via Gemini 3 Flash.
- **Smart Signals**: Trading advice generated from combined technical and sentiment data.
- **Interactive Chart**: Full BTC/USDT candlestick chart integration.
- **Telegram Bot**: Python script for automated mobile notifications.

## Dashboard Setup (Web App)
1. Ensure your `API_KEY` (Gemini API) is configured in your environment.
2. The dashboard automatically refreshes every 60 seconds.
3. Pricing data is fetched from public CoinGecko endpoints (No key required).

## Telegram Bot Setup (Python)
1. Install Python 3.8+.
2. Install the required library:
   ```bash
   pip install python-telegram-bot requests
   ```
3. Edit `telegram_bot.py`:
   - Replace `YOUR_BOT_TOKEN_HERE` with your token from @BotFather.
   - Replace `YOUR_CHAT_ID_HERE` with your ID from @userinfobot.
4. Run the bot:
   ```bash
   python telegram_bot.py
   ```

## Technical Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS.
- **AI**: Gemini API (`gemini-3-flash-preview`) for real-time news sentiment.
- **Charts**: TradingView Lightweight/Widget.
- **Alerting**: Python + `python-telegram-bot`.
