
import { GoogleGenAI, Type } from "@google/genai";
import { SentimentResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const mockHeadlines = [
  "Bitcoin Institutional Interest Hits All-Time High as ETFs See Massive Inflows",
  "New Regulatory Concerns Emerge Over Crypto Privacy Features",
  "Leading Analyst Predicts $100k BTC by End of Quarter",
  "Global Tech Giant Explores Lightning Network Integration for Payments",
  "Minor Flash Crash Liquidation Hits Leveraged Traders",
  "Solana Network Upgrades Expected to Solve Recent Congestion Issues",
  "Ethereum Deflationary Supply Continues as Burn Rate Increases"
];

export const analyzeSentiment = async (): Promise<SentimentResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the sentiment of the following crypto headlines and provide a numerical score from -100 to 100 where -100 is extremely bearish and 100 is extremely bullish. 
      Headlines: ${JSON.stringify(mockHeadlines)}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER, description: "Numerical sentiment score from -100 to 100" },
            label: { type: Type.STRING, enum: ["Positive", "Neutral", "Negative"] },
            explanation: { type: Type.STRING, description: "Brief explanation of why this sentiment score was given" }
          },
          required: ["score", "label", "explanation"]
        }
      }
    });

    const result = JSON.parse(response.text);
    return {
      ...result,
      headlines: mockHeadlines
    };
  } catch (error) {
    console.error("Sentiment analysis failed:", error);
    // Fallback in case of API failure
    return {
      score: 15,
      label: "Neutral",
      explanation: "Analysis failed, defaulting to neutral data.",
      headlines: mockHeadlines
    };
  }
};
