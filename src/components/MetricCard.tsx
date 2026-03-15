interface MetricCardProps {
  label: string;
  value: string;
  trend: string;
  status: "normal" | "warning" | "critical";
}

const MetricCard = ({ label, value, trend, status }: MetricCardProps) => {
  const trendColor = status === "critical"
    ? "text-destructive"
    : status === "warning"
    ? "text-warning"
    : "text-primary";

  return (
    <div className="border border-border bg-card p-5 rounded-md hover:border-muted transition-colors duration-150 group">
      <div className="text-xs font-mono text-muted-foreground uppercase mb-2 tracking-wider">{label}</div>
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold font-mono tracking-tighter" data-metric>{value}</span>
        <span className={`text-xs font-mono ${trendColor}`}>{trend}</span>
      </div>
    </div>
  );
};

export default MetricCard;
