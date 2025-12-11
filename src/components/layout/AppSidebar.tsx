import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Lightbulb, Settings, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Vendors", href: "/vendors", icon: Users },
  { title: "Insights", href: "/insights", icon: Lightbulb },
  { title: "Settings", href: "/settings", icon: Settings },
];

export const AppSidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
        <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
          <Zap className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-semibold text-sidebar-foreground">LeadSort AI</h1>
          <p className="text-xs text-sidebar-foreground/60">Vendor Intelligence</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                "sidebar-item",
                isActive && "active"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-sidebar-border">
        <div className="glass-card p-4 bg-sidebar-accent/50">
          <p className="text-xs text-sidebar-foreground/70 mb-2">AI-Powered Analytics</p>
          <p className="text-sm text-sidebar-foreground font-medium">Ready for backend integration</p>
        </div>
      </div>
    </aside>
  );
};
