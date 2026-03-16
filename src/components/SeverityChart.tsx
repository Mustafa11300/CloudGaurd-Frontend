import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useEffect, useState } from "react";
import { getFindingsSummary } from "@/data/api";

const SeverityChart = () => {
  const [counts, setCounts] = useState({ critical: 0, high: 0, medium: 0, low: 0 });

  useEffect(() => {
    getFindingsSummary()
      .then(d => setCounts({ critical: d.critical, high: d.high, medium: d.medium, low: d.low }))
      .catch(() => {});
  }, []);

  const data = [
    { name: "Critical", value: counts.critical, color: "hsl(0, 84%, 60%)"   },
    { name: "High",     value: counts.high,     color: "hsl(38, 92%, 50%)"  },
    { name: "Medium",   value: counts.medium,   color: "hsl(199, 89%, 48%)" },
    { name: "Low",      value: counts.low,      color: "hsl(217, 19%, 40%)" },
  ];

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="border border-border bg-card rounded-md p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
        Findings by Severity
      </h3>
      <div className="flex items-center gap-6">
        <div className="w-40 h-40">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={65}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip
                contentStyle={{
                  background:   "hsl(222, 30%, 7%)",
                  border:       "1px solid hsl(217, 19%, 14%)",
                  borderRadius: "6px",
                  fontSize:     "12px",
                  color:        "hsl(210, 40%, 98%)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-2.5">
          {data.map((d) => (
            <div key={d.name} className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ background: d.color }} />
              <span className="text-xs text-muted-foreground w-14">{d.name}</span>
              <span className="text-sm font-mono font-semibold text-foreground" data-metric>
                {d.value}
              </span>
              <span className="text-[10px] text-muted-foreground font-mono">
                ({total > 0 ? Math.round((d.value / total) * 100) : 0}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeverityChart;