import { MoreHorizontal, ExternalLink, TrendingUp, TrendingDown } from "lucide-react";
import { AIScore, PriorityBadge } from "./AIScore";
import { Button } from "./ui/button";

interface Vendor {
  id: string;
  name: string;
  category: string;
  spend: string;
  spendTrend: "up" | "down";
  aiScore: number;
  priority: "high" | "medium" | "low";
  contract: string;
  savings: string;
}

const vendors: Vendor[] = [
  {
    id: "1",
    name: "CloudScale Technologies",
    category: "Cloud Infrastructure",
    spend: "$485,200",
    spendTrend: "up",
    aiScore: 94,
    priority: "high",
    contract: "Dec 2025",
    savings: "$42,300",
  },
  {
    id: "2",
    name: "DataFlow Systems",
    category: "Data Analytics",
    spend: "$312,800",
    spendTrend: "down",
    aiScore: 87,
    priority: "high",
    contract: "Mar 2025",
    savings: "$28,500",
  },
  {
    id: "3",
    name: "SecureNet Solutions",
    category: "Security",
    spend: "$198,400",
    spendTrend: "up",
    aiScore: 72,
    priority: "medium",
    contract: "Jun 2025",
    savings: "$15,200",
  },
  {
    id: "4",
    name: "DevOps Pro",
    category: "Development Tools",
    spend: "$156,000",
    spendTrend: "down",
    aiScore: 68,
    priority: "medium",
    contract: "Sep 2025",
    savings: "$12,800",
  },
  {
    id: "5",
    name: "SupportHub Inc",
    category: "Customer Support",
    spend: "$89,600",
    spendTrend: "up",
    aiScore: 45,
    priority: "low",
    contract: "Jan 2026",
    savings: "$5,400",
  },
  {
    id: "6",
    name: "MarketingCloud",
    category: "Marketing",
    spend: "$234,500",
    spendTrend: "up",
    aiScore: 81,
    priority: "high",
    contract: "Apr 2025",
    savings: "$19,700",
  },
];

export const VendorTable = () => {
  return (
    <div className="glass-card rounded-xl overflow-hidden animate-slide-up" style={{ animationDelay: "400ms" }}>
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Vendor Prioritization</h2>
            <p className="text-sm text-muted-foreground mt-0.5">AI-ranked by spend optimization potential</p>
          </div>
          <Button variant="glass" size="sm">
            View All
            <ExternalLink className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50 bg-muted/30">
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Vendor</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Category</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Spend</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">AI Score</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Priority</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Contract End</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Est. Savings</th>
              <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {vendors.map((vendor, index) => (
              <tr 
                key={vendor.id} 
                className="hover:bg-muted/30 transition-colors duration-150"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center text-sm font-semibold text-foreground">
                      {vendor.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                    </div>
                    <span className="font-medium text-sm">{vendor.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-muted-foreground">{vendor.category}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{vendor.spend}</span>
                    {vendor.spendTrend === "up" ? (
                      <TrendingUp className="h-3.5 w-3.5 text-red-500" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5 text-emerald-500" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <AIScore score={vendor.aiScore} size="sm" />
                </td>
                <td className="px-6 py-4">
                  <PriorityBadge priority={vendor.priority} />
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-muted-foreground">{vendor.contract}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-emerald-600">{vendor.savings}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
