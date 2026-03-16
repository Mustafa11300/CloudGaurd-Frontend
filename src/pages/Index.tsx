import { useEffect, useState } from "react";
import MetricCard    from "@/components/MetricCard";
import SeverityChart from "@/components/SeverityChart";
import TrendChart    from "@/components/TrendChart";
import SeverityBadge from "@/components/SeverityBadge";
import {
  getScore, getTopFindings,
  buildMetrics,
  type Finding, type MetricData,
} from "@/data/api";

const events = [
  { time: "08:22:01", msg: "Security scan completed — 242 findings detected",             type: "info"     },
  { time: "08:18:55", msg: "S3 bucket flagged as publicly accessible",                    type: "critical" },
  { time: "07:45:12", msg: "Cost analysis: $748/mo estimated waste across 18 resources",  type: "warning"  },
  { time: "06:30:00", msg: "Scheduled scan initiated across 14 clusters",                 type: "info"     },
];

const Dashboard = () => {
  const [metrics,      setMetrics]      = useState<MetricData[]>([]);
  const [liveFindings, setLiveFindings] = useState<Finding[]>([]);
  const [loading,      setLoading]      = useState(true);

  useEffect(() => {
    Promise.all([getScore(), getTopFindings(5)])
      .then(([score, findings]) => {
        setMetrics([...buildMetrics(score)]);
        setLiveFindings(findings);
      })
      .catch(e => console.error("Dashboard load failed:", e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-96 text-muted-foreground text-sm">
      Loading dashboard...
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Infrastructure Overview
        </h1>
        <p className="text-muted-foreground">
          Real-time security telemetry across 14 active clusters · 290 resources.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <MetricCard key={m.label} {...m} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TrendChart />
        <SeverityChart />
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Top Risk Findings */}
        <div className="border border-border bg-card rounded-md p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Top Risk Findings
          </h3>
          <div className="space-y-3">
            {liveFindings.length === 0 ? (
              <p className="text-sm text-muted-foreground">No findings loaded.</p>
            ) : (
              liveFindings.map((f) => (
                <div
                  key={f.finding_id}
                  className="flex items-start gap-3 border-b border-border pb-3 last:border-0 last:pb-0"
                >
                  <SeverityBadge severity={f.severity} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground font-medium truncate">{f.title}</p>
                    <p className="text-[11px] text-muted-foreground font-mono mt-0.5">
                      {f.resource_id}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground whitespace-nowrap" data-metric>
                    {f.risk_score}/100
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Events */}
        <div className="border border-border bg-card rounded-md p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Recent Events
          </h3>
          <div className="space-y-4">
            {events.map((e, i) => (
              <div key={i} className="flex gap-4 items-start border-l-2 border-border pl-4 py-1">
                <span className="text-[10px] font-mono text-muted-foreground mt-0.5 shrink-0">
                  {e.time}
                </span>
                <p className="text-sm text-secondary-foreground leading-tight">{e.msg}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;