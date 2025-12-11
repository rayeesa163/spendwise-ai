import { ArrowDown, ArrowUp, DollarSign, Package, TrendingUp, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useVendors } from "@/context/VendorContext";
import { formatCurrency } from "@/lib/vendorData";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ReactNode;
  delay?: number;
}

const StatCard = ({ title, value, change, changeType, icon, delay = 0 }: StatCardProps) => (
  <div 
    className="stat-card animate-slide-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-start justify-between mb-4">
      <div className="p-2.5 rounded-lg bg-primary/10">
        {icon}
      </div>
      <div className={cn(
        "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
        changeType === "positive" && "text-emerald-500 bg-emerald-500/10",
        changeType === "negative" && "text-destructive bg-destructive/10",
        changeType === "neutral" && "text-muted-foreground bg-muted"
      )}>
        {changeType === "positive" && <ArrowUp className="h-3 w-3" />}
        {changeType === "negative" && <ArrowDown className="h-3 w-3" />}
        {change}
      </div>
    </div>
    <p className="text-sm text-muted-foreground mb-1">{title}</p>
    <p className="text-2xl font-semibold tracking-tight">{value}</p>
  </div>
);

export const StatsGrid = () => {
  const { vendors } = useVendors();
  
  const totalSpend = vendors.reduce((sum, v) => sum + v.spend, 0);
  const estimatedSavings = Math.round(totalSpend * 0.14);
  const avgEfficiency = Math.round(vendors.reduce((sum, v) => sum + v.costEfficiency, 0) / vendors.length);

  const stats: StatCardProps[] = [
    {
      title: "Total Spend",
      value: formatCurrency(totalSpend),
      change: "+12.5%",
      changeType: "positive",
      icon: <DollarSign className="h-5 w-5 text-primary" />,
    },
    {
      title: "Active Vendors",
      value: vendors.length.toString(),
      change: "+8 this month",
      changeType: "positive",
      icon: <Package className="h-5 w-5 text-primary" />,
    },
    {
      title: "AI Savings",
      value: formatCurrency(estimatedSavings),
      change: "+24.3%",
      changeType: "positive",
      icon: <Zap className="h-5 w-5 text-primary" />,
    },
    {
      title: "Efficiency Score",
      value: `${avgEfficiency}%`,
      change: "-1.2%",
      changeType: "negative",
      icon: <TrendingUp className="h-5 w-5 text-primary" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard key={stat.title} {...stat} delay={index * 100} />
      ))}
    </div>
  );
};
