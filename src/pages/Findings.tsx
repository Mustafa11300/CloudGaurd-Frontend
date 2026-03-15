import { useState } from "react";
import { findings } from "@/data/mockData";
import SeverityBadge from "@/components/SeverityBadge";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";

type Severity = "ALL" | "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

const Findings = () => {
  const [filter, setFilter] = useState<Severity>("ALL");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(false);

  const filtered = findings
    .filter((f) => filter === "ALL" || f.severity === filter)
    .sort((a, b) => sortAsc ? a.risk_score - b.risk_score : b.risk_score - a.risk_score);

  const severities: Severity[] = ["ALL", "CRITICAL", "HIGH", "MEDIUM", "LOW"];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Security Findings</h1>
        <p className="text-muted-foreground">{findings.length} findings across all resource types.</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <Filter size={14} className="text-muted-foreground" />
        {severities.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 text-xs font-mono rounded-md transition-colors border ${
              filter === s
                ? "bg-secondary text-foreground border-border"
                : "text-muted-foreground border-transparent hover:text-foreground hover:border-border"
            }`}
          >
            {s}
            {s !== "ALL" && (
              <span className="ml-1.5 text-muted-foreground">
                ({findings.filter((f) => f.severity === s).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="border border-border rounded-md overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-secondary/50 border-b border-border">
              <th className="text-left text-[10px] font-mono uppercase tracking-wider text-muted-foreground px-4 py-3">Severity</th>
              <th className="text-left text-[10px] font-mono uppercase tracking-wider text-muted-foreground px-4 py-3">Finding</th>
              <th className="text-left text-[10px] font-mono uppercase tracking-wider text-muted-foreground px-4 py-3">Resource</th>
              <th className="text-left text-[10px] font-mono uppercase tracking-wider text-muted-foreground px-4 py-3">Type</th>
              <th
                className="text-left text-[10px] font-mono uppercase tracking-wider text-muted-foreground px-4 py-3 cursor-pointer select-none flex items-center gap-1"
                onClick={() => setSortAsc(!sortAsc)}
              >
                Risk Score
                {sortAsc ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((f) => (
              <>
                <tr
                  key={f.finding_id}
                  className="border-b border-border hover:bg-secondary/30 cursor-pointer transition-colors"
                  onClick={() => setExpandedId(expandedId === f.finding_id ? null : f.finding_id)}
                >
                  <td className="px-4 py-3"><SeverityBadge severity={f.severity} /></td>
                  <td className="px-4 py-3 text-sm text-foreground font-medium">{f.title}</td>
                  <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{f.resource_id}</td>
                  <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{f.resource_type}</td>
                  <td className="px-4 py-3 text-sm font-mono text-foreground" data-metric>{f.risk_score}/100</td>
                </tr>
                {expandedId === f.finding_id && (
                  <tr key={`${f.finding_id}-detail`} className="bg-secondary/20">
                    <td colSpan={5} className="px-6 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                        <div>
                          <h4 className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1.5">Description</h4>
                          <p className="text-secondary-foreground leading-relaxed">{f.description}</p>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1.5">Remediation</h4>
                          <p className="text-primary leading-relaxed">{f.remediation}</p>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1.5">Business Impact</h4>
                          <p className="text-warning leading-relaxed">{f.business_impact}</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Findings;
