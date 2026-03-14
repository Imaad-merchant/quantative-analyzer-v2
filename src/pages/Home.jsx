import React from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Activity, TrendingUp, Zap, BarChart3, CheckCircle, ArrowRight } from "lucide-react";
import MainNav from "../components/navigation/MainNav";

export default function Home() {
  const navigate = useNavigate();

  const stats = [
    { value: "475K", label: "QUANT COMMUNITY", sublabel: "active traders" },
    { value: "500K+", label: "BACKTESTS", sublabel: "per month" },
    { value: "$45B", label: "VOLUME", sublabel: "per month" },
    { value: "+7%", label: "RETURNS", sublabel: "over market" }
  ];

  const features = [
    {
      title: "Cloud Research",
      description: "Access terabytes of market data with powerful analysis tools and machine learning libraries.",
      icon: TrendingUp,
      items: ["Train ML Models", "Visualize Data", "Fast Cloud Cores"],
      page: "Terminal"
    },
    {
      title: "Backtesting",
      description: "Point-in-time, fee and slippage-adjusted backtesting on lightning-fast infrastructure.",
      icon: BarChart3,
      items: ["Multi-Asset Testing", "Realistic Modeling", "Battle-Tested Tech"],
      page: "Backtests"
    },
    {
      title: "AI Assistance",
      description: "Leverage AI to design, optimize and deploy quantitative strategies automatically.",
      icon: Zap,
      items: ["Natural Language", "Auto Backtesting", "Smart Optimization"],
      page: "AIPatterns"
    },
    {
      title: "Live Trading",
      description: "Deploy strategies to institutional-grade infrastructure with direct market access.",
      icon: Activity,
      items: ["Low Latency", "20+ Integrations", "Co-Located Servers"],
      page: "FootprintChart"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 pl-16">
      <MainNav />
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full">
                <span className="text-yellow-400 text-sm font-semibold">AWARD WINNING QUANT PLATFORM</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                The World's Leading
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Algorithmic Trading
                </span>
                Platform
              </h1>

              <p className="text-xl text-gray-400 leading-relaxed">
                Power your quantitative research with cutting-edge tools for data analysis, backtesting, 
                and live trading on institutional-grade infrastructure.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-yellow-500 hover:bg-yellow-600 text-gray-950 font-semibold px-8 h-12"
                  onClick={() => navigate(createPageUrl("Terminal"))}
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-700 text-white hover:bg-gray-800 px-8 h-12"
                  onClick={() => navigate(createPageUrl("FootprintChart"))}
                >
                  View Live Demo
                </Button>
              </div>
            </div>

            {/* Hero Graphic */}
            <div className="relative">
              <div className="relative z-10 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur border border-gray-700 rounded-2xl p-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Live Market Analysis</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-green-400">Active</span>
                    </div>
                  </div>
                  <div className="h-48 bg-gray-950/50 rounded-lg flex items-center justify-center border border-gray-800">
                    <svg className="w-full h-full p-4" viewBox="0 0 400 200">
                      <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" style={{stopColor: '#10b981', stopOpacity: 0.8}} />
                          <stop offset="100%" style={{stopColor: '#3b82f6', stopOpacity: 0.8}} />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 0 150 Q 50 120, 100 100 T 200 80 T 300 60 T 400 50"
                        fill="none"
                        stroke="url(#grad1)"
                        strokeWidth="3"
                        className="animate-pulse"
                      />
                      <circle cx="100" cy="100" r="6" fill="#10b981" />
                      <circle cx="200" cy="80" r="6" fill="#3b82f6" />
                      <circle cx="300" cy="60" r="6" fill="#f59e0b" />
                    </svg>
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">+12.4%</div>
                      <div className="text-xs text-gray-500">Return</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">1.8</div>
                      <div className="text-xs text-gray-500">Sharpe</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">8.2%</div>
                      <div className="text-xs text-gray-500">Max DD</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500/20 to-blue-500/20 rounded-2xl blur-2xl -z-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-900/50 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">{stat.label}</div>
                <div className="text-xs text-gray-600">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="text-yellow-400 text-sm font-semibold uppercase tracking-wide mb-4">
            THE PLATFORM: CLOUD AND ON-PREMISE
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Unified Quant Infrastructure</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A complete suite of tools for research, backtesting, optimization, and live deployment
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur border border-gray-700 rounded-2xl p-8 hover:border-yellow-500/50 transition-all duration-300 cursor-pointer"
                onClick={() => navigate(createPageUrl(feature.page))}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-yellow-500/20 transition-colors">
                    <Icon className="w-6 h-6 text-yellow-400" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 mb-6">{feature.description}</p>
                  
                  <div className="space-y-2">
                    {feature.items.map((item, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-yellow-400 font-semibold group-hover:gap-3 transition-all">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-yellow-500/10 border-y border-yellow-500/20">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Quant Journey?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of traders building profitable strategies
          </p>
          <Button
            size="lg"
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-950 font-semibold px-10 h-14 text-lg"
            onClick={() => navigate(createPageUrl("Terminal"))}
          >
            Get Started Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}