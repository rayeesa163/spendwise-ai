import { Brain, LayoutDashboard, Package, Settings, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon, label, active, onClick }: NavItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
      active
        ? "bg-accent/10 text-accent"
        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
    )}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2.5">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
              <Brain className="h-5 w-5 text-accent-foreground" />
              <div className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-accent animate-pulse-soft" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              Lead<span className="gradient-text">Sort</span> AI
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-1">
            <NavItem icon={<LayoutDashboard className="h-4 w-4" />} label="Dashboard" active />
            <NavItem icon={<Package className="h-4 w-4" />} label="Vendors" />
            <NavItem icon={<TrendingUp className="h-4 w-4" />} label="Analytics" />
            <NavItem icon={<Settings className="h-4 w-4" />} label="Settings" />
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-medium">
            <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            AI Active
          </div>
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-sm font-medium text-accent-foreground">
            JS
          </div>
        </div>
      </div>
    </header>
  );
};
