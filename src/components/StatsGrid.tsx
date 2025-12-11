import { ArrowDown, ArrowUp, DollarSign, Package, TrendingUp, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

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
      <div className="p-2.5 rounded-lg bg-accent/10">
        {icon}
      </div>
      <div className={cn(
        "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
        changeType === "positive" && "text-emerald-600 bg-emerald-50",
        changeType === "negative" && "text-red-600 bg-red-50",
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
  const stats: StatCardProps[] = [
    {
      title: "Total Spend",
      value: "$2.4M",
      change: "+12.5%",
      changeType: "positive",
      icon: <DollarSign className="h-5 w-5 text-accent" />,
    },
    {
      title: "Active Vendors",
      value: "147",
      change: "+8 this month",
      changeType: "positive",
      icon: <Package className="h-5 w-5 text-accent" />,
    },
    {
      title: "AI Savings",
      value: "$342K",
      change: "+24.3%",
      changeType: "positive",
      icon: <Zap className="h-5 w-5 text-accent" />,
    },
    {
      title: "Efficiency Score",
      value: "94.2%",
      change: "-1.2%",
      changeType: "negative",
      icon: <TrendingUp className="h-5 w-5 text-accent" />,
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
