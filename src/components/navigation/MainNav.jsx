import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Database, TrendingUp, Lightbulb, CheckCircle } from "lucide-react";
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
    <div className="fixed left-0 top-0 h-full w-16 border-r border-gray-800 bg-gray-900/95 backdrop-blur flex flex-col items-center py-6 gap-4 z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.page;

        return (
          <Button
            key={item.label}
            variant="ghost"
            size="icon"
            className={`w-12 h-12 ${isActive ? 'bg-gray-800' : 'hover:bg-gray-800'}`}
            onClick={() => navigate(createPageUrl(item.page))}
            title={item.label}
          >
            <Icon className="w-6 h-6" style={{ color: item.color }} />
          </Button>
        );
      })}
    </div>
  );
}