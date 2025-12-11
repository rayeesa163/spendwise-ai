import { SpendTrendChart } from "@/components/charts/SpendTrendChart";
import { CategoryPieChart } from "@/components/charts/CategoryPieChart";
import { AIRecommendations } from "@/components/AIRecommendations";
import { useVendors } from "@/context/VendorContext";
import { calculatePriorityScore, formatCurrency } from "@/lib/vendorData";
import { TrendingUp, TrendingDown, Target, Zap, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Insights = () => {
  const { vendors } = useVendors();

  const totalSpend = vendors.reduce((sum, v) => sum + v.spend, 0);
  const avgQuality = Math.round(vendors.reduce((sum, v) => sum + v.quality, 0) / vendors.length);
  const avgDelivery = Math.round(vendors.reduce((sum, v) => sum + v.deliveryReliability, 0) / vendors.length);
  const avgCost = Math.round(vendors.reduce((sum, v) => sum + v.costEfficiency, 0) / vendors.length);

  const highPriorityCount = vendors.filter((v) => calculatePriorityScore(v) >= 75).length;
  const atRiskCount = vendors.filter((v) => calculatePriorityScore(v) < 50).length;

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Page Header */}
      <div className="animate-fade-in">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          AI Insights & Analytics
        </h1>
        <p className="text-muted-foreground mt-1">
          Deep dive into vendor performance and optimization opportunities
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up">
        <div className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <Target className="h-5 w-5 text-primary" />
            <span className="text-xs text-emerald-500 font-medium">+{highPriorityCount}</span>
          </div>
          <p className="text-sm text-muted-foreground">High Priority Vendors</p>
          <p className="text-2xl font-semibold">{highPriorityCount}</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <span className="text-xs text-amber-500 font-medium">Review needed</span>
          </div>
          <p className="text-sm text-muted-foreground">At-Risk Vendors</p>
          <p className="text-2xl font-semibold">{atRiskCount}</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <Zap className="h-5 w-5 text-primary" />
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="text-sm text-muted-foreground">Total Annual Spend</p>
          <p className="text-2xl font-semibold">{formatCurrency(totalSpend)}</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            <span className="text-xs text-emerald-500 font-medium">Healthy</span>
          </div>
          <p className="text-sm text-muted-foreground">Portfolio Health</p>
          <p className="text-2xl font-semibold">{Math.round((highPriorityCount / vendors.length) * 100)}%</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpendTrendChart />
        <CategoryPieChart />
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 animate-slide-up">
          <h3 className="font-semibold mb-6">Average Performance Metrics</h3>
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Quality Score</span>
                <span className="text-sm font-medium">{avgQuality}%</span>
              </div>
              <Progress value={avgQuality} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Delivery Reliability</span>
                <span className="text-sm font-medium">{avgDelivery}%</span>
              </div>
              <Progress value={avgDelivery} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Cost Efficiency</span>
                <span className="text-sm font-medium">{avgCost}%</span>
              </div>
              <Progress value={avgCost} className="h-2" />
            </div>
          </div>
        </div>

        <AIRecommendations />
      </div>
    </div>
  );
};

export default Insights;
