import { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Loader2 } from "lucide-react";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";
import { runScan } from "@/data/api";

const transition = { type: "spring" as const, duration: 0.4, bounce: 0 };
const pageVariants = {
  initial: { opacity: 0, y: 4  },
  enter:   { opacity: 1, y: 0, transition },
  exit:    { opacity: 0, y: -4, transition },
};

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { pathname }    = useLocation();
  const isHome          = pathname === "/";
  const [sidebarOpen,   setSidebarOpen]   = useState(false);
  const [scanning,      setScanning]      = useState(false);
  const [lastScan,      setLastScan]      = useState("08:22 UTC");
  const [scanMsg,       setScanMsg]       = useState<string | null>(null);

  const handleRunScan = async () => {
    if (scanning) return;
    setScanning(true);
    setScanMsg(null);

    try {
      const result = await runScan();

      if (result.status === "success") {
        // Update last scan time
        const now = new Date();
        setLastScan(
          now.toLocaleTimeString("en-US", {
            hour:   "2-digit",
            minute: "2-digit",
            hour12: false,
          }) + " UTC"
        );
        setScanMsg(
          `✅ Scan complete — Score: ${result.security_score}/100 · ${result.total_findings} findings · $${result.monthly_waste} waste`
        );
        // Auto-hide message after 5 seconds
        setTimeout(() => setScanMsg(null), 5000);
        // Reload the page to refresh all data
        setTimeout(() => window.location.reload(), 1000);
      } else {
        setScanMsg(`❌ Scan failed: ${result.message}`);
        setTimeout(() => setScanMsg(null), 5000);
      }
    } catch (e) {
      setScanMsg("❌ Could not reach backend");
      setTimeout(() => setScanMsg(null), 5000);
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="flex min-h-svh bg-background text-foreground selection:bg-primary/30">
      {!isHome && (
        <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-14 border-b border-border flex items-center justify-between px-8 bg-background/80 backdrop-blur-md z-10 shrink-0">
          <div className="flex items-center gap-3">
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
            {/* Scan result message */}
            {scanMsg && (
              <span className="text-[10px] font-mono text-muted-foreground max-w-sm truncate">
                {scanMsg}
              </span>
            )}

            {/* Last scan time */}
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-muted-foreground font-mono">
                Last scan: {lastScan}
              </span>
            </div>

            {/* Run Scan button */}
            <button
              onClick={handleRunScan}
              disabled={scanning}
              className="flex items-center gap-1.5 text-xs font-medium bg-secondary hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1.5 rounded-md transition-colors text-foreground border border-border"
            >
              {scanning ? (
                <>
                  <Loader2 size={12} className="animate-spin" />
                  Scanning...
                </>
              ) : (
                "Run Scan"
              )}
            </button>
          </div>
        </header>

        {/* Page content */}
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