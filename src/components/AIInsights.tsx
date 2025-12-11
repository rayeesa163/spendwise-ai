import { Brain, Lightbulb, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

interface InsightCardProps {
  title: string;
  description: string;
  action: string;
  type: "opportunity" | "alert" | "recommendation";
  delay?: number;
}

const InsightCard = ({ title, description, action, type, delay = 0 }: InsightCardProps) => (
  <div 
    className="p-4 rounded-lg border border-border/60 bg-card hover:border-accent/30 transition-all duration-300 animate-slide-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-lg bg-accent/10 flex-shrink-0">
        <Lightbulb className="h-4 w-4 text-accent" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium mb-1">{title}</h4>
        <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
        <Button variant="link" size="sm" className="h-auto p-0 mt-2 text-accent">
          {action}
          <ArrowRight className="h-3 w-3 ml-1" />
        </Button>
      </div>
    </div>
  </div>
);

export const AIInsights = () => {
  const insights = [
    {
      title: "Contract Renegotiation Window",
      description: "CloudScale contract expires in 45 days. Based on market rates, you could save 15% on renewal.",
      action: "View Analysis",
      type: "opportunity" as const,
    },
    {
      title: "Vendor Consolidation",
      description: "3 vendors overlap in data analytics. Consolidating could reduce costs by $89K annually.",
      action: "Compare Vendors",
      type: "recommendation" as const,
    },
    {
      title: "Spend Anomaly Detected",
      description: "SupportHub spend increased 34% last month. Review usage patterns recommended.",
      action: "Review Details",
      type: "alert" as const,
    },
  ];

  return (
    <div className="glass-card rounded-xl p-6 animate-slide-up" style={{ animationDelay: "500ms" }}>
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-accent/10">
          <Brain className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h3 className="font-semibold">AI Insights</h3>
          <p className="text-xs text-muted-foreground">Powered by spend analysis</p>
        </div>
      </div>
      
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <InsightCard key={insight.title} {...insight} delay={600 + index * 100} />
        ))}
      </div>
    </div>
  );
};
