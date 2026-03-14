import React from "react";
import { Building2, CheckCircle2, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const firmLogos = {
  "TopStep": "🎯",
  "Tradovate": "📊",
  "Apex": "🔺",
  "Alpha Futures": "⚡",
  "FTMO": "💎",
  "Earn2Trade": "📈",
  "The5ers": "🏆",
  "Bulenox": "🌟",
  "My Forex Funds": "💰"
};

export default function PropFirmCard({ firm, onConnect, onDisconnect }) {
  const logo = firmLogos[firm.name] || "🏢";
  const isConnected = firm.status === "connected";
  const isPending = firm.status === "pending";

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{logo}</div>
          <div>
            <h3 className="text-lg font-semibold text-white">{firm.name}</h3>
            {firm.account_id && (
              <p className="text-xs text-gray-500">Account: {firm.account_id}</p>
            )}
          </div>
        </div>
        
        {isConnected && <CheckCircle2 className="w-5 h-5 text-green-500" />}
        {isPending && <Clock className="w-5 h-5 text-yellow-500" />}
        {!isConnected && !isPending && <XCircle className="w-5 h-5 text-gray-600" />}
      </div>

      {isConnected && firm.last_sync && (
        <p className="text-xs text-gray-500 mb-4">
          Last sync: {new Date(firm.last_sync).toLocaleString()}
        </p>
      )}

      <Button
        onClick={() => isConnected ? onDisconnect(firm) : onConnect(firm)}
        variant={isConnected ? "outline" : "default"}
        className={isConnected ? "w-full border-gray-700" : "w-full bg-blue-600 hover:bg-blue-700"}
      >
        {isConnected ? "Disconnect" : isPending ? "Pending..." : "Connect"}
      </Button>
    </div>
  );
}