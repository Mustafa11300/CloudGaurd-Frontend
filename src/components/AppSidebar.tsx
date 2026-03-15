import { Link, useLocation } from "react-router-dom";
import { Activity, LayoutDashboard, Terminal, Shield, DollarSign, MessageSquare, Settings, Zap, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Product" },
  { to: "/dashboard", icon: Activity, label: "Dashboard" },
  { to: "/findings", icon: Shield, label: "Findings" },
  { to: "/cost", icon: DollarSign, label: "Cost Analysis" },
  { to: "/copilot", icon: MessageSquare, label: "AI Copilot" },
  { to: "/logs", icon: Terminal, label: "Logs" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AppSidebar = ({ isOpen, onClose }: AppSidebarProps) => {
  const { pathname } = useLocation();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sidebar panel */}
          <motion.nav
            className="fixed top-0 left-0 bottom-0 w-64 flex flex-col p-4 gap-8 bg-sidebar border-r border-border z-50 shadow-2xl"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex items-center justify-between pt-2 px-2">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 bg-primary rounded flex items-center justify-center">
                  <Zap size={14} className="text-primary-foreground fill-current" />
                </div>
                <span className="font-bold tracking-tight text-lg text-foreground">CLOUDGUARD</span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                aria-label="Close sidebar"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-0.5">
              {navItems.map(({ to, icon: Icon, label }) => {
                const active = pathname === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-150 text-sm font-medium ${active
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
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
};

export default AppSidebar;
