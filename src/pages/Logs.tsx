import { Terminal } from "lucide-react";

const logEntries = [
  { ts: "2026-03-15T08:22:01Z", level: "INFO", source: "scanner", msg: "Scan cycle completed. 290 resources evaluated." },
  { ts: "2026-03-15T08:22:01Z", level: "CRITICAL", source: "rules.s3", msg: "S3-001 triggered: s3-customer-data-482 publicly accessible" },
  { ts: "2026-03-15T08:22:01Z", level: "CRITICAL", source: "rules.sg", msg: "SG-001 triggered: sg-a3f8e21b SSH port 22 open to 0.0.0.0/0" },
  { ts: "2026-03-15T08:22:01Z", level: "HIGH", source: "rules.iam", msg: "IAM-001 triggered: iam-admin-bot-891 missing MFA (admin policy attached)" },
  { ts: "2026-03-15T08:21:58Z", level: "INFO", source: "elastic", msg: "Indexed 14 new findings to security-findings index" },
  { ts: "2026-03-15T08:21:55Z", level: "INFO", source: "elastic", msg: "Indexed 290 resources to cloud-resources index" },
  { ts: "2026-03-15T08:21:50Z", level: "INFO", source: "scorer", msg: "Security score calculated: 64/100 (+6 from previous scan)" },
  { ts: "2026-03-15T08:21:50Z", level: "WARN", source: "cost", msg: "Cost health score: 68/100. $1,580/mo estimated waste detected." },
  { ts: "2026-03-15T08:21:45Z", level: "INFO", source: "generator", msg: "Generated dataset: 80 EC2, 60 S3, 50 IAM, 70 SG, 30 RDS" },
  { ts: "2026-03-15T08:21:40Z", level: "INFO", source: "scanner", msg: "Connecting to Elasticsearch cluster at es-prod-01..." },
  { ts: "2026-03-15T08:21:38Z", level: "INFO", source: "main", msg: "CloudGuard Security Copilot v1.0.0 starting..." },
  { ts: "2026-03-15T06:30:00Z", level: "INFO", source: "scheduler", msg: "Scheduled scan initiated (cron: 0 */2 * * *)" },
  { ts: "2026-03-15T04:22:01Z", level: "INFO", source: "scanner", msg: "Scan cycle completed. 290 resources evaluated." },
  { ts: "2026-03-15T04:22:01Z", level: "CRITICAL", source: "rules.rds", msg: "RDS-001 triggered: rds-prod-mysql-42 publicly accessible" },
  { ts: "2026-03-15T04:21:50Z", level: "INFO", source: "scorer", msg: "Security score calculated: 67/100" },
  { ts: "2026-03-15T02:22:01Z", level: "HIGH", source: "rules.s3", msg: "S3-002 triggered: s3-analytics-778 encryption disabled (1.2TB)" },
];

const levelColor: Record<string, string> = {
  INFO: "text-muted-foreground",
  WARN: "text-warning",
  HIGH: "text-warning",
  CRITICAL: "text-destructive",
  ERROR: "text-destructive",
};

const Logs = () => (
  <div className="max-w-7xl mx-auto space-y-6">
    <div className="flex flex-col gap-1">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">System Logs</h1>
      <p className="text-muted-foreground">Real-time output from the CloudGuard engine.</p>
    </div>

    <div className="border border-border bg-card rounded-md overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-secondary/30">
        <Terminal size={14} className="text-primary" />
        <span className="text-xs font-mono text-muted-foreground">tail -f /var/log/cloudguard.log</span>
      </div>
      <div className="p-4 font-mono text-xs space-y-1 max-h-[70vh] overflow-y-auto">
        {logEntries.map((log, i) => {
          const time = new Date(log.ts).toLocaleTimeString("en-US", { hour12: false });
          return (
            <div key={i} className="flex gap-3 hover:bg-secondary/20 px-2 py-0.5 rounded">
              <span className="text-muted-foreground shrink-0">{time}</span>
              <span className={`shrink-0 w-20 text-right ${levelColor[log.level] || "text-muted-foreground"}`}>
                [{log.level}]
              </span>
              <span className="text-accent shrink-0">[{log.source}]</span>
              <span className="text-secondary-foreground">{log.msg}</span>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

export default Logs;
