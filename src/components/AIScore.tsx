import { cn } from "@/lib/utils";

interface AIScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
}

export const AIScore = ({ score, size = "md" }: AIScoreProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-500 bg-emerald-500/10";
    if (score >= 60) return "text-amber-500 bg-amber-500/10";
    return "text-red-500 bg-red-500/10";
  };

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };

  return (
    <div
      className={cn(
        "rounded-lg font-semibold flex items-center justify-center",
        getScoreColor(score),
        sizeClasses[size]
      )}
    >
      {score}
    </div>
  );
};

interface PriorityBadgeProps {
  priority: "high" | "medium" | "low";
}

export const PriorityBadge = ({ priority }: PriorityBadgeProps) => {
  const priorityConfig = {
    high: { label: "High", className: "bg-accent/10 text-accent border-accent/20" },
    medium: { label: "Medium", className: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
    low: { label: "Low", className: "bg-muted text-muted-foreground border-border" },
  };

  const config = priorityConfig[priority];

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
      config.className
    )}>
      {config.label}
    </span>
  );
};
