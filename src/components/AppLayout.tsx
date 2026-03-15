import { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";

const transition = { type: "spring" as const, duration: 0.4, bounce: 0 };
const pageVariants = {
  initial: { opacity: 0, y: 4 },
  enter: { opacity: 1, y: 0, transition },
  exit: { opacity: 0, y: -4, transition },
};

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-svh bg-background text-foreground selection:bg-primary/30">
      {/* Floating sidebar — hidden on home page */}
      {!isHome && (
        <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b border-border flex items-center justify-between px-8 bg-background/80 backdrop-blur-md z-10 shrink-0">
          <div className="flex items-center gap-3">
            {/* Hamburger toggle — only on non-home pages */}
            {!isHome && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                aria-label="Open sidebar"
              >
                <Menu size={20} />
              </button>
            )}
            <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
              System Status: Operational
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-muted-foreground font-mono">Last scan: 08:22 UTC</span>
            </div>
            <button className="text-xs font-medium bg-secondary hover:bg-secondary/80 px-3 py-1.5 rounded-md transition-colors text-foreground border border-border">
              Run Scan
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial="initial"
              animate="enter"
              exit="exit"
              variants={pageVariants}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
