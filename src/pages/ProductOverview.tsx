import { Shield, Brain, DollarSign, Terminal, Zap, Globe, Lock, BarChart3, Cpu, Cloud, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const capabilities = [
  {
    icon: Shield,
    title: "Threat Detection",
    desc: "Continuous scanning across 14+ clusters with real-time identification of misconfigurations, vulnerabilities, and compliance violations.",
    link: "/findings",
  },
  {
    icon: Brain,
    title: "AI Security Copilot",
    desc: "Natural language queries over your infrastructure. Get instant remediation guidance, risk assessments, and policy recommendations.",
    link: "/copilot",
  },
  {
    icon: DollarSign,
    title: "Cost Optimization",
    desc: "Identify idle resources, over-provisioned instances, and unused storage. Save thousands per month with actionable insights.",
    link: "/cost",
  },
  {
    icon: Terminal,
    title: "Audit Logging",
    desc: "Complete audit trail of every scan, policy change, and remediation action with tamper-proof log retention.",
    link: "/logs",
  },
];

const stats = [
  { value: "290+", label: "Resources Monitored" },
  { value: "14", label: "Active Clusters" },
  { value: "< 5 min", label: "Detection Latency" },
  { value: "99.9%", label: "Uptime SLA" },
];

const integrations = [
  { icon: Cloud, name: "AWS" },
  { icon: Globe, name: "Azure" },
  { icon: Cpu, name: "GCP" },
  { icon: Lock, name: "Kubernetes" },
  { icon: BarChart3, name: "Terraform" },
  { icon: Zap, name: "CI/CD Pipelines" },
];

const features = [
  "CIS Benchmark compliance scanning",
  "OWASP Top 10 vulnerability detection",
  "IAM privilege escalation analysis",
  "S3 / Blob / GCS public exposure alerts",
  "Network segmentation validation",
  "Container image CVE scanning",
  "Infrastructure-as-Code drift detection",
  "Real-time Slack & PagerDuty alerts",
];

const ProductOverview = () => (
  <div className="max-w-7xl mx-auto space-y-16 pb-12">
    {/* Hero */}
    <motion.section
      className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-card via-card to-secondary/30 p-10 md:p-14"
      {...fadeUp}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(160_84%_39%/0.08),transparent_60%)]" />
      <div className="relative z-10 max-w-2xl space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <Zap size={12} className="fill-current" />
          Cloud-Native Security Platform
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.1]">
          CloudGuard Security Copilot
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Unified cloud security posture management with AI-powered threat detection, automated remediation, and real-time cost optimization — across AWS, Azure, and GCP.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Go to Dashboard
            <ArrowRight size={16} />
          </Link>
          <Link
            to="/copilot"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-secondary/80"
          >
            Try AI Copilot
          </Link>
        </div>
      </div>
    </motion.section>

    {/* Stats */}
    <motion.section
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
      {...fadeUp}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-lg border border-border bg-card p-6 text-center"
        >
          <p className="text-3xl font-bold text-primary">{s.value}</p>
          <p className="text-xs text-muted-foreground mt-1 font-medium uppercase tracking-wider">{s.label}</p>
        </div>
      ))}
    </motion.section>

    {/* Core Capabilities */}
    <motion.section className="space-y-6" {...fadeUp} transition={{ duration: 0.5, delay: 0.15 }}>
      <div>
        <h2 className="text-2xl font-bold text-foreground">Core Capabilities</h2>
        <p className="text-muted-foreground mt-1">Everything you need to secure and optimize your cloud infrastructure.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {capabilities.map((c) => (
          <Link
            key={c.title}
            to={c.link}
            className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/40 hover:bg-secondary/30"
          >
            <div className="flex items-start gap-4">
              <div className="shrink-0 rounded-md bg-primary/10 p-2.5">
                <c.icon size={20} className="text-primary" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                  {c.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </motion.section>

    {/* Feature Checklist */}
    <motion.section
      className="rounded-xl border border-border bg-card p-8 md:p-10"
      {...fadeUp}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-2xl font-bold text-foreground mb-6">Security Coverage</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
        {features.map((f) => (
          <div key={f} className="flex items-center gap-3">
            <CheckCircle2 size={16} className="text-primary shrink-0" />
            <span className="text-sm text-secondary-foreground">{f}</span>
          </div>
        ))}
      </div>
    </motion.section>

    {/* Integrations */}
    <motion.section className="space-y-6" {...fadeUp} transition={{ duration: 0.5, delay: 0.25 }}>
      <div>
        <h2 className="text-2xl font-bold text-foreground">Supported Platforms</h2>
        <p className="text-muted-foreground mt-1">Seamless integration with your existing cloud stack.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {integrations.map((i) => (
          <div
            key={i.name}
            className="flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-5 transition hover:border-primary/30"
          >
            <i.icon size={28} className="text-muted-foreground" />
            <span className="text-xs font-medium text-foreground">{i.name}</span>
          </div>
        ))}
      </div>
    </motion.section>

    {/* CTA */}
    <motion.section
      className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 p-8 md:p-10 text-center space-y-4"
      {...fadeUp}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-foreground">Ready to secure your cloud?</h2>
      <p className="text-muted-foreground max-w-lg mx-auto">
        Start monitoring your infrastructure in minutes. No agents required — connect your cloud accounts and get instant visibility.
      </p>
      <Link
        to="/settings"
        className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
      >
        Configure Integrations
        <ArrowRight size={16} />
      </Link>
    </motion.section>
  </div>
);

export default ProductOverview;
