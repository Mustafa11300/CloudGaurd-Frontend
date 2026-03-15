interface SeverityBadgeProps {
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
}

const styles: Record<string, string> = {
  CRITICAL: "bg-destructive/15 text-destructive border-destructive/30",
  HIGH: "bg-warning/15 text-warning border-warning/30",
  MEDIUM: "bg-accent/15 text-accent border-accent/30",
  LOW: "bg-muted text-muted-foreground border-border",
};

const SeverityBadge = ({ severity }: SeverityBadgeProps) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider border ${styles[severity]}`}>
    {severity}
  </span>
);

export default SeverityBadge;
