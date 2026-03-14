import React from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";

export default function Landing() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    base44.auth.redirectToLogin(createPageUrl("QuantHome"));
  };

  const handleCreateAccount = () => {
    base44.auth.redirectToLogin(createPageUrl("QuantHome"));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white rounded-full" />
            </div>
            <span className="text-xl font-bold text-gray-900">QUANTCONNECT</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a href="#" className="hover:text-gray-900">Pricing</a>
            <a href="#" className="hover:text-gray-900">Research</a>
            <a href="#" className="hover:text-gray-900">Strategies</a>
            <a href="#" className="hover:text-gray-900">Data</a>
            <a href="#" className="hover:text-gray-900">Documentation</a>
            <a href="#" className="hover:text-gray-900">Algorithm Lab</a>
          </nav>

          <Button 
            onClick={handleSignIn}
            variant="ghost" 
            className="text-gray-700 hover:text-gray-900"
          >
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Quantitative Trading<br />Made Simple
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Power your quantitative research with a cutting-edge, unified API for research, backtesting, and live trading on the world's leading algorithmic trading platform.
            </p>
            <Button 
              onClick={handleCreateAccount}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg font-semibold rounded-lg"
            >
              Create Free Account
            </Button>
          </div>

          {/* Right Content - Platform Preview */}
          <div className="relative">
            <div className="relative transform perspective-1000 rotate-y-12">
              <div className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden border border-gray-700">
                <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-800 rounded p-3 h-20" />
                    <div className="bg-gray-800 rounded p-3 h-20" />
                    <div className="bg-gray-800 rounded p-3 h-20" />
                  </div>
                  <div className="bg-gray-800 rounded p-4 h-32" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800 rounded p-4 h-24" />
                    <div className="bg-gray-800 rounded p-4 h-24" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 pt-12 border-t border-gray-200">
          <div>
            <div className="text-xs text-gray-500 mb-2">AWARD WINNING QUANT ANALYTICS PLATFORM</div>
            <div className="text-4xl font-bold text-gray-900">475K</div>
            <div className="text-sm text-gray-600">QUANT<br />COMMUNITY</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-gray-900">500K+</div>
            <div className="text-sm text-gray-600">BACKTESTS<br />PER MONTH</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-gray-900">$45B</div>
            <div className="text-sm text-gray-600">VOL UMF<br />PER MONTH</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-gray-900">+7%</div>
            <div className="text-sm text-gray-600">RETURNS<br />OVER MARKET</div>
          </div>
        </div>

        {/* As Seen On */}
        <div className="mt-16">
          <div className="text-xs text-gray-500 mb-6 text-center">AS SEEN ON</div>
          <div className="flex items-center justify-center gap-12 flex-wrap opacity-60">
            <div className="text-2xl font-serif font-bold">FINANCIAL TIMES</div>
            <div className="text-2xl font-serif">WSJ</div>
            <div className="text-xl font-bold">BUSINESS INSIDER</div>
            <div className="text-2xl font-bold">with.</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center text-sm text-gray-500">
            © 2026 QuantConnect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}