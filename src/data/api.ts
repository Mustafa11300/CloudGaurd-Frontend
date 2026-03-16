const BASE = "https://cloud-security-copilot-qd4o.onrender.com/api";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`);
  return res.json();
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`);
  return res.json();
}

// ── TYPES ──────────────────────────────────────────────────────

export interface Finding {
  finding_id:      string;
  resource_id:     string;
  resource_type:   string;
  rule_id:         string;
  title:           string;
  description:     string;
  severity:        "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  risk_score:      number;
  remediation:     string;
  business_impact: string;
  detected_at:     string;
}

export interface MetricData {
  label:  string;
  value:  string;
  trend:  string;
  status: "normal" | "warning" | "critical";
}

export interface ScoreData {
  security_score:    number;
  cost_health_score: number;
  monthly_waste:     number;
  total_findings:    number;
  critical_count:    number;
  high_count:        number;
  last_scan:         string;
}

export interface FindingsSummary {
  critical:   number;
  high:       number;
  medium:     number;
  low:        number;
  total:      number;
  chart_data: { name: string; value: number; color: string }[];
}

export interface TrendPoint {
  timestamp:         string;
  security_score:    number;
  cost_health_score: number;
  total_findings:    number;
  critical_count:    number;
  high_count:        number;
  monthly_waste_usd: number;
}

export interface CostItem {
  resource_id:     string;
  instance_type:   string;
  region:          string;
  cpu_avg:         number;
  monthly_cost:    number;
  estimated_waste: number;
}

export interface CostWasteResponse {
  items:        CostItem[];
  total_waste:  number;
  annual_waste: number;
  idle_count:   number;
  savings_rate: number;
  total_cost:   number;
}

export interface ChatResponse {
  query:        string;
  tools_used:   string[];
  response:     string;
  data_sources: string[];
}

// ── API CALLS ──────────────────────────────────────────────────

export const getScore            = ()            => get<ScoreData>("/score/");
export const getScoreTrend       = (days = 7)    => get<TrendPoint[]>(`/score/trend?days=${days}`);
export const getFindingsSummary  = ()            => get<FindingsSummary>("/findings/summary");
export const getCriticalFindings = ()            => get<Finding[]>("/findings/critical");
export const getTopFindings      = (limit = 100) => get<Finding[]>(`/findings/top?limit=${limit}`);
export const getCostWaste        = ()            => get<CostWasteResponse>("/findings/cost-waste");
export const sendChat            = (message: string) => post<ChatResponse>("/chat/", { message });

// ── METRIC BUILDER ─────────────────────────────────────────────

function toStatus(v: string): "normal" | "warning" | "critical" {
  if (v === "critical" || v === "warning" || v === "normal") return v;
  return "normal";
}

export function buildMetrics(score: ScoreData): MetricData[] {
  return [
    {
      label:  "Security Score",
      value:  `${score.security_score}/100`,
      trend:  score.security_score >= 70 ? "↑ Healthy" : "↓ At Risk",
      status: toStatus(score.security_score >= 70 ? "normal" : score.security_score >= 50 ? "warning" : "critical"),
    },
    {
      label:  "Critical Findings",
      value:  String(score.critical_count),
      trend:  `${score.total_findings} total findings`,
      status: toStatus(score.critical_count > 0 ? "critical" : "normal"),
    },
    {
      label:  "Monthly Waste",
      value:  `$${Math.round(score.monthly_waste).toLocaleString()}`,
      trend:  `$${Math.round(score.monthly_waste * 12).toLocaleString()}/yr projected`,
      status: toStatus("warning"),
    },
    {
      label:  "Resources Scanned",
      value:  "290",
      trend:  "+0",
      status: toStatus("normal"),
    },
  ];
}

export const runScan = () =>
  fetch("https://cloud-security-copilot-qd4o.onrender.com/api/score/scan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  }).then(r => r.json());