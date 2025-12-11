import { Sparkles, ArrowRight, TrendingUp, Shield, DollarSign } from "lucide-react";
import { useVendors } from "@/context/VendorContext";
import { calculatePriorityScore, formatCurrency } from "@/lib/vendorData";
import { Button } from "./ui/button";

export const AIRecommendations = () => {
  const { vendors } = useVendors();

  // Get top 3 vendors by priority score
  const topVendors = [...vendors]
    .map((v) => ({ ...v, score: calculatePriorityScore(v) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const insights = [
    {
      icon: TrendingUp,
      title: "Optimize CloudScale Contract",
      description: "Renegotiate before Dec 2025 for potential 15% savings based on market rates.",
      type: "opportunity" as const,
    },
    {
      icon: Shield,
      title: "Security Vendor Review",
      description: "SecureNet Solutions showing declining reliability. Consider alternatives.",
      type: "warning" as const,
    },
    {
      icon: DollarSign,
      title: "Consolidation Opportunity",
      description: "Merge HR and Finance tools to save $45K annually.",
      type: "savings" as const,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Vendors Recommendation */}
      <div className="glass-card p-6 animate-slide-up">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">AI-Recommended Vendors</h3>
            <p className="text-xs text-muted-foreground">Top performers for Q1 2025</p>
          </div>
        </div>

        <div className="space-y-3">
          {topVendors.map((vendor, index) => (
            <div
              key={vendor.id}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-sm">{vendor.name}</p>
                  <p className="text-xs text-muted-foreground">{vendor.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-primary">{vendor.score}</p>
                <p className="text-xs text-muted-foreground">Priority Score</p>
              </div>
            </div>
          ))}
        </div>

        <Button variant="ghost" className="w-full mt-4 text-primary hover:text-primary">
          View Full Analysis
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* AI Insights */}
      <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
        <h3 className="font-semibold mb-4">AI Insights</h3>
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="p-3 rounded-lg bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                  insight.type === "opportunity" ? "bg-primary/10 text-primary" :
                  insight.type === "warning" ? "bg-amber-500/10 text-amber-500" :
                  "bg-emerald-500/10 text-emerald-500"
                }`}>
                  <insight.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-sm">{insight.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{insight.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
