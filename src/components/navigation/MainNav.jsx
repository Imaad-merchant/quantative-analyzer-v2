import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Activity, Database, TrendingUp, Lightbulb, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Data Layer", icon: Database, color: "#3b82f6", page: "DataLayer" },
  { label: "Analysis Layer", icon: TrendingUp, color: "#8b5cf6", page: "AnalysisLayer" },
  { label: "Insight Layer", icon: Lightbulb, color: "#f59e0b", page: "InsightLayer" },
  { label: "Validation Layer", icon: CheckCircle, color: "#10b981", page: "ValidationLayer" }
];

export default function MainNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname.split('/').pop();

  return (
    <div className="border-b border-gray-800 bg-gray-900/95 backdrop-blur px-6 py-3 flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Activity className="w-6 h-6 text-yellow-400" />
        <h1 className="text-xl font-bold tracking-wide text-white">Quantitative Analyzer</h1>
      </div>

      <div className="flex items-center gap-2 ml-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.page;

          return (
            <Button
              key={item.label}
              variant="ghost"
              className={`gap-2 text-sm ${isActive ? 'bg-gray-800 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`}
              onClick={() => navigate(createPageUrl(item.page))}
            >
              <Icon className="w-4 h-4" style={{ color: item.color }} />
              {item.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}