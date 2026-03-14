import React, { useState, useEffect, useRef } from "react";
import { Activity, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function FootprintChart() {
  const navigate = useNavigate();
  const [trades, setTrades] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const wsRef = useRef(null);

  useEffect(() => {
    // Connect to WebSocket
    const ws = new WebSocket("ws://localhost:8765");
    wsRef.current = ws;

    ws.onopen = () => {
      setConnectionStatus("connected");
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "trade") {
        setTrades(prev => [...prev.slice(-99), data]); // Keep last 100 trades
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setConnectionStatus("error");
    };

    ws.onclose = () => {
      setConnectionStatus("disconnected");
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.close();
    };
  }, []);

  // Group trades by price level and time bucket
  const candles = {};
  trades.forEach(trade => {
    const timeBucket = new Date(trade.timestamp).toISOString().slice(0, 16); // minute buckets
    const priceLevel = Math.floor(trade.price / 0.25) * 0.25; // 0.25 tick size
    
    const key = `${timeBucket}_${priceLevel}`;
    if (!candles[key]) {
      candles[key] = {
        timeBucket,
        priceLevel,
        bidVolume: 0,
        askVolume: 0,
        delta: 0,
        trades: []
      };
    }
    candles[key].bidVolume += trade.bid_volume || 0;
    candles[key].askVolume += trade.ask_volume || 0;
    candles[key].delta += trade.delta || 0;
    candles[key].trades.push(trade);
  });

  const candleArray = Object.values(candles);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/80 backdrop-blur px-6 py-4 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(createPageUrl("Terminal"))}
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Activity className="w-6 h-6 text-yellow-400" />
        <h1 className="text-xl font-bold tracking-wide text-white">Footprint Chart</h1>
        <div className="ml-auto flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            connectionStatus === "connected" ? "bg-green-500" : 
            connectionStatus === "error" ? "bg-red-500" : "bg-gray-500"
          }`} />
          <span className="text-sm text-gray-400 capitalize">{connectionStatus}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {connectionStatus === "disconnected" && (
          <div className="text-center py-12 text-gray-500">
            <p className="mb-2">Attempting to connect to ws://localhost:8765...</p>
            <p className="text-xs">Make sure your WebSocket server is running</p>
          </div>
        )}

        {connectionStatus === "error" && (
          <div className="text-center py-12 text-red-400">
            <p className="mb-2">Connection failed</p>
            <p className="text-xs">Check if WebSocket server is running on port 8765</p>
          </div>
        )}

        {connectionStatus === "connected" && candleArray.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>Connected. Waiting for trade data...</p>
          </div>
        )}

        {connectionStatus === "connected" && candleArray.length > 0 && (
          <div className="overflow-auto">
            <div className="grid grid-cols-1 gap-4">
              {/* Footprint Chart */}
              <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
                <h3 className="text-sm font-semibold mb-4 text-gray-300">Footprint Chart</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-gray-800">
                        <th className="px-2 py-2 text-left text-gray-400">Time</th>
                        <th className="px-2 py-2 text-left text-gray-400">Price</th>
                        <th className="px-2 py-2 text-center text-gray-400">Bid Vol</th>
                        <th className="px-2 py-2 text-center text-gray-400">Ask Vol</th>
                        <th className="px-2 py-2 text-right text-gray-400">Delta</th>
                      </tr>
                    </thead>
                    <tbody>
                      {candleArray.slice(-50).map((candle, idx) => {
                        const isAskDominant = candle.askVolume > candle.bidVolume;
                        const bgColor = isAskDominant ? "bg-green-900/30" : "bg-red-900/30";
                        
                        return (
                          <tr key={idx} className={`border-b border-gray-800 ${bgColor}`}>
                            <td className="px-2 py-2 text-gray-300">
                              {new Date(candle.timeBucket).toLocaleTimeString()}
                            </td>
                            <td className="px-2 py-2 font-mono text-yellow-400">
                              {candle.priceLevel.toFixed(2)}
                            </td>
                            <td className="px-2 py-2 text-center font-mono text-red-400">
                              {candle.bidVolume}
                            </td>
                            <td className="px-2 py-2 text-center font-mono text-green-400">
                              {candle.askVolume}
                            </td>
                            <td className={`px-2 py-2 text-right font-mono ${
                              candle.delta > 0 ? "text-green-400" : "text-red-400"
                            }`}>
                              {candle.delta > 0 ? "+" : ""}{candle.delta}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Cumulative Delta Summary */}
              <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
                <h3 className="text-sm font-semibold mb-2 text-gray-300">Cumulative Delta</h3>
                <div className="text-2xl font-mono">
                  {candleArray.reduce((sum, c) => sum + c.delta, 0) > 0 ? (
                    <span className="text-green-400">
                      +{candleArray.reduce((sum, c) => sum + c.delta, 0)}
                    </span>
                  ) : (
                    <span className="text-red-400">
                      {candleArray.reduce((sum, c) => sum + c.delta, 0)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}