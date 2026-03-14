import React, { useState, useEffect, useRef } from "react";
import { Activity, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

const WS_URL = "wss://elsa-censureless-joyce.ngrok-free.dev";
const TICK_SIZE = 0.25;
const MAX_CANDLES = 15;

export default function FootprintChart() {
  const navigate = useNavigate();
  const [candles, setCandles] = useState({});
  const [ohlc, setOhlc] = useState({});
  const [status, setStatus] = useState("disconnected");
  const wsRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;
    ws.onopen = () => setStatus("connected");
    ws.onerror = () => setStatus("error");
    ws.onclose = () => setStatus("disconnected");
    ws.onmessage = (e) => {
      const d = JSON.parse(e.data);
      if (d.type !== "trade") return;
      const bucket = new Date(d.timestamp).toISOString().slice(0, 16);
      const pl = Math.round(d.price / TICK_SIZE) * TICK_SIZE;
      setCandles(prev => {
        const c = { ...prev };
        if (!c[bucket]) c[bucket] = {};
        if (!c[bucket][pl]) c[bucket][pl] = { b: 0, a: 0 };
        c[bucket][pl].b += d.bid_volume || 0;
        c[bucket][pl].a += d.ask_volume || 0;
        return c;
      });
      setOhlc(prev => {
        const o = { ...prev };
        if (!o[bucket]) o[bucket] = { o: d.price, h: d.price, l: d.price, c: d.price };
        o[bucket].h = Math.max(o[bucket].h, d.price);
        o[bucket].l = Math.min(o[bucket].l, d.price);
        o[bucket].c = d.price;
        return o;
      });
    };
    return () => ws.close();
  }, []);

  const buckets = Object.keys(candles).sort().slice(-MAX_CANDLES);
  const allPrices = new Set();
  buckets.forEach(b => Object.keys(candles[b]).forEach(p => allPrices.add(parseFloat(p))));
  const prices = Array.from(allPrices).sort((a, b) => b - a);
  const minP = prices.length ? Math.min(...prices) : 0;
  const maxP = prices.length ? Math.max(...prices) : 1;
  const range = maxP - minP || 1;

  const volProfile = {};
  buckets.forEach(b => {
    Object.entries(candles[b]).forEach(([p, v]) => {
      volProfile[p] = (volProfile[p] || 0) + v.b + v.a;
    });
  });
  const maxVol = Math.max(...Object.values(volProfile), 1);

  const cellH = 20;

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "#e0e0e0", fontFamily: "monospace" }}>
      <div style={{ borderBottom: "1px solid #1e1e2e", background: "#0f0f1a", padding: "12px 20px", display: "flex", alignItems: "center", gap: 12 }}>
        <Button variant="ghost" size="icon" onClick={() => navigate(createPageUrl("Terminal"))} style={{ color: "#666" }}>
          <ArrowLeft size={16} />
        </Button>
        <Activity size={18} color="#f59e0b" />
        <span style={{ fontWeight: 500, fontSize: 15, fontFamily: "sans-serif" }}>NQM5 Footprint</span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: status === "connected" ? "#22c55e" : status === "error" ? "#ef4444" : "#555" }} />
          <span style={{ color: "#888" }}>{status}</span>
        </div>
      </div>

      {status !== "connected" || buckets.length === 0 ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 300, color: "#555", fontSize: 13, fontFamily: "sans-serif" }}>
          {status === "connected" ? "Waiting for data..." : "Connecting to " + WS_URL + "..."}
        </div>
      ) : (
        <div style={{ overflowX: "auto", overflowY: "auto", padding: 16 }}>
          <div style={{ display: "flex", alignItems: "flex-start" }}>

            {/* Volume profile */}
            <div style={{ display: "flex", flexDirection: "column", marginRight: 4 }}>
              {prices.map(p => {
                const v = volProfile[p] || 0;
                const w = Math.round((v / maxVol) * 40);
                return (
                  <div key={p} style={{ height: cellH, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                    <div style={{ height: 12, width: w, background: "#1d4e89", borderRadius: 1 }} />
                  </div>
                );
              })}
            </div>

            {/* Price axis */}
            <div style={{ display: "flex", flexDirection: "column", marginRight: 8, minWidth: 60 }}>
              {prices.map(p => (
                <div key={p} style={{ height: cellH, display: "flex", alignItems: "center", justifyContent: "flex-end", fontSize: 10, color: "#666", paddingRight: 4 }}>
                  {p.toFixed(2)}
                </div>
              ))}
            </div>

            {/* Candle columns */}
            {buckets.map(bucket => {
              const bar = ohlc[bucket] || {};
              const isGreen = bar.c >= bar.o;
              const bodyTop = maxP - Math.max(bar.o, bar.c);
              const bodyH = Math.abs(bar.c - bar.o);
              const wickTop = maxP - bar.h;
              const wickH = bar.h - bar.l;
              const delta = Object.values(candles[bucket] || {}).reduce((s, v) => s + (v.a - v.b), 0);
              const totalVol = Object.values(candles[bucket] || {}).reduce((s, v) => s + v.a + v.b, 0);

              return (
                <div key={bucket} style={{ display: "flex", flexDirection: "column", marginRight: 2 }}>

                  {/* Candlestick */}
                  <div style={{ position: "relative", width: 56, height: prices.length * cellH * 0.3, marginBottom: 4, minHeight: 60 }}>
                    <div style={{
                      position: "absolute", left: "50%", transform: "translateX(-50%)",
                      top: `${(wickTop / range) * 100}%`,
                      height: `${(wickH / range) * 100}%`,
                      width: 1, background: isGreen ? "#22c55e" : "#ef4444", minHeight: 2
                    }} />
                    <div style={{
                      position: "absolute", left: "50%", transform: "translateX(-50%)",
                      top: `${(bodyTop / range) * 100}%`,
                      height: `${Math.max((bodyH / range) * 100, 1)}%`,
                      width: 10, background: isGreen ? "#16a34a" : "#dc2626", borderRadius: 1
                    }} />
                  </div>

                  {/* Footprint cells */}
                  {prices.map(p => {
                    const cell = (candles[bucket] || {})[p] || { b: 0, a: 0 };
                    const total = cell.b + cell.a;
                    const askDom = cell.a >= cell.b;
                    const imbalance = total > 0 && ((cell.b > 0 ? cell.a / cell.b >= 3 : false) || (cell.a > 0 ? cell.b / cell.a >= 3 : false));
                    const intensity = total > 0 ? Math.min((Math.max(cell.b, cell.a) / 200), 1) : 0;
                    const bg = total === 0 ? "#0d0d14" :
                      askDom ? `rgba(22,163,74,${0.12 + intensity * 0.45})` : `rgba(220,38,38,${0.12 + intensity * 0.45})`;

                    return (
                      <div key={p} style={{
                        height: cellH, width: 56,
                        background: bg,
                        border: imbalance ? "1px solid #fff" : "1px solid #1a1a2e",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 9, fontWeight: 600,
                        color: total === 0 ? "transparent" : askDom ? "#86efac" : "#fca5a5"
                      }}>
                        {total > 0 ? `${cell.b} × ${cell.a}` : ""}
                      </div>
                    );
                  })}

                  {/* Delta row */}
                  <div style={{ height: 20, width: 56, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, borderTop: "1px solid #1e1e2e", color: delta >= 0 ? "#60a5fa" : "#f472b6" }}>
                    {delta > 0 ? "+" : ""}{delta}
                  </div>

                  {/* Volume row */}
                  <div style={{ height: 18, width: 56, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#555", borderTop: "1px solid #111" }}>
                    {totalVol}
                  </div>

                  {/* Time label */}
                  <div style={{ height: 18, width: 56, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#444", borderTop: "1px solid #111" }}>
                    {bucket.slice(11, 16)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
