import { Link, useLocation } from "react-router-dom";
import { Activity, LayoutDashboard, Terminal, Shield, DollarSign, MessageSquare, Settings, Zap } from "lucide-react";

const navItems = [
  { to: "/", icon: Activity, label: "Overview" },
  { to: "/findings", icon: Shield, label: "Findings" },
  { to: "/cost", icon: DollarSign, label: "Cost Analysis" },
  { to: "/copilot", icon: MessageSquare, label: "AI Copilot" },
  { to: "/logs", icon: Terminal, label: "Logs" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

const AppSidebar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="w-60 border-r border-border flex flex-col p-4 gap-8 bg-sidebar shrink-0">
      <div className="flex items-center gap-2.5 px-2 pt-2">
        <div className="w-7 h-7 bg-primary rounded flex items-center justify-center">
          <Zap size={14} className="text-primary-foreground fill-current" />
        </div>
        <span className="font-bold tracking-tight text-lg text-foreground">CLOUDGUARD</span>
      </div>

      <div className="flex flex-col gap-0.5">
        {navItems.map(({ to, icon: Icon, label }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-150 text-sm font-medium ${
                active
                  ? "bg-secondary text-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-auto px-3 py-3 border border-border rounded-md bg-secondary/30">
        <div className="flex items-center gap-2 mb-1">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-medium text-foreground">System Online</span>
        </div>
        <p className="text-[10px] text-muted-foreground">14 clusters · 290 resources</p>
      </div>
    </nav>
  );
};

export default AppSidebar;
