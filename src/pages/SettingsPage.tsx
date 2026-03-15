import { Shield, Database, Cloud, Key, Bell } from "lucide-react";

const configs = [
  {
    icon: Database,
    title: "Elasticsearch Connection",
    description: "Primary data store for resources and findings",
    status: "Connected",
    statusColor: "text-primary",
    details: "es-prod-01.us-east-1 · v8.12.0 · 3 indices",
  },
  {
    icon: Cloud,
    title: "AWS Integration",
    description: "Amazon Nova 2 Lite for AI agent reasoning",
    status: "Connected",
    statusColor: "text-primary",
    details: "us-east-1 · Bedrock Runtime · Nova 2 Lite",
  },
  {
    icon: Shield,
    title: "Rule Engine",
    description: "Misconfiguration detection rules",
    status: "12 Active Rules",
    statusColor: "text-accent",
    details: "EC2 (2) · S3 (3) · IAM (3) · SG (2) · RDS (2)",
  },
  {
    icon: Key,
    title: "API Keys & Secrets",
    description: "Environment variables and credentials",
    status: "Configured",
    statusColor: "text-primary",
    details: "ES_API_KEY · AWS_ACCESS_KEY · AWS_SECRET_KEY",
  },
  {
    icon: Bell,
    title: "Scan Schedule",
    description: "Automated security scan frequency",
    status: "Every 2 Hours",
    statusColor: "text-warning",
    details: "cron: 0 */2 * * * · Last run: 08:22 UTC",
  },
];

const SettingsPage = () => (
  <div className="max-w-4xl mx-auto space-y-8">
    <div className="flex flex-col gap-1">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
      <p className="text-muted-foreground">Configuration panel for CloudGuard Security Copilot.</p>
    </div>

    <div className="space-y-3">
      {configs.map((c) => (
        <div key={c.title} className="border border-border bg-card rounded-md p-5 flex items-start gap-4 hover:border-muted transition-colors">
          <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center border border-border shrink-0">
            <c.icon size={18} className="text-muted-foreground" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-0.5">
              <h3 className="text-sm font-semibold text-foreground">{c.title}</h3>
              <span className={`text-[10px] font-mono ${c.statusColor}`}>{c.status}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-1">{c.description}</p>
            <p className="text-[10px] font-mono text-muted-foreground">{c.details}</p>
          </div>
          <button className="text-xs font-medium bg-secondary hover:bg-secondary/80 px-3 py-1.5 rounded-md transition-colors text-foreground border border-border shrink-0">
            Configure
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default SettingsPage;
