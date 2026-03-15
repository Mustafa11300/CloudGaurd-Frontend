const AppHeader = () => {
  return (
    <header className="h-14 border-b border-border flex items-center justify-between px-8 bg-background/80 backdrop-blur-md z-10 shrink-0">
      <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
        System Status: Operational
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
  );
};

export default AppHeader;
