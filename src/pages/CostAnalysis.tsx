import { costWaste, scanHistory } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { DollarSign, TrendingDown, Server, AlertTriangle } from "lucide-react";

const totalWaste = costWaste.reduce((s, c) => s + c.estimated_waste, 0);
const totalMonthlyCost = costWaste.reduce((s, c) => s + c.monthly_cost, 0);

const barData = costWaste.map((c) => ({
  name: c.resource_id.replace(/^(ec2-|rds-)/, ""),
  waste: c.estimated_waste,
  cost: c.monthly_cost,
}));

const CostAnalysis = () => (
  <div className="max-w-7xl mx-auto space-y-8">
    <div className="flex flex-col gap-1">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Cost Analysis</h1>
      <p className="text-muted-foreground">Underutilized resources and optimization opportunities.</p>
    </div>

    {/* Summary Cards */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="border border-border bg-card p-5 rounded-md">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign size={14} className="text-destructive" />
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Total Waste/Mo</span>
        </div>
        <span className="text-3xl font-bold font-mono text-destructive" data-metric>${totalWaste.toFixed(0)}</span>
      </div>
      <div className="border border-border bg-card p-5 rounded-md">
        <div className="flex items-center gap-2 mb-2">
          <TrendingDown size={14} className="text-warning" />
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Annual Projection</span>
        </div>
        <span className="text-3xl font-bold font-mono text-warning" data-metric>${(totalWaste * 12).toFixed(0)}</span>
      </div>
      <div className="border border-border bg-card p-5 rounded-md">
        <div className="flex items-center gap-2 mb-2">
          <Server size={14} className="text-accent" />
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Idle Resources</span>
        </div>
        <span className="text-3xl font-bold font-mono text-foreground" data-metric>{costWaste.length}</span>
      </div>
      <div className="border border-border bg-card p-5 rounded-md">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle size={14} className="text-primary" />
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Savings Rate</span>
        </div>
        <span className="text-3xl font-bold font-mono text-primary" data-metric>
          {Math.round((totalWaste / totalMonthlyCost) * 100)}%
        </span>
      </div>
    </div>

    {/* Chart */}
    <div className="border border-border bg-card rounded-md p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-6">
        Cost vs Waste by Resource
      </h3>
      <div className="h-64">
        <ResponsiveContainer>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 19%, 12%)" />
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: "hsl(215, 20%, 55%)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "hsl(215, 20%, 55%)" }} axisLine={false} tickLine={false} width={40} tickFormatter={(v) => `$${v}`} />
            <Tooltip
              contentStyle={{
                background: "hsl(222, 30%, 7%)",
                border: "1px solid hsl(217, 19%, 14%)",
                borderRadius: "6px",
                fontSize: "12px",
                color: "hsl(210, 40%, 98%)",
              }}
              formatter={(value: number) => `$${value.toFixed(2)}`}
            />
            <Bar dataKey="cost" fill="hsl(217, 19%, 27%)" radius={[3, 3, 0, 0]} name="Monthly Cost" />
            <Bar dataKey="waste" fill="hsl(0, 84%, 60%)" radius={[3, 3, 0, 0]} name="Estimated Waste" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Table */}
    <div className="border border-border rounded-md overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-secondary/50 border-b border-border">
            <th className="text-left text-[10px] font-mono uppercase tracking-wider text-muted-foreground px-4 py-3">Resource</th>
            <th className="text-left text-[10px] font-mono uppercase tracking-wider text-muted-foreground px-4 py-3">Type</th>
            <th className="text-left text-[10px] font-mono uppercase tracking-wider text-muted-foreground px-4 py-3">Region</th>
            <th className="text-left text-[10px] font-mono uppercase tracking-wider text-muted-foreground px-4 py-3">CPU Avg</th>
            <th className="text-left text-[10px] font-mono uppercase tracking-wider text-muted-foreground px-4 py-3">Monthly Cost</th>
            <th className="text-left text-[10px] font-mono uppercase tracking-wider text-muted-foreground px-4 py-3">Est. Waste</th>
          </tr>
        </thead>
        <tbody>
          {costWaste.map((c) => (
            <tr key={c.resource_id} className="border-b border-border hover:bg-secondary/30 transition-colors">
              <td className="px-4 py-3 text-xs font-mono text-foreground">{c.resource_id}</td>
              <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{c.instance_type}</td>
              <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{c.region}</td>
              <td className="px-4 py-3 text-xs font-mono text-destructive" data-metric>{c.cpu_avg}%</td>
              <td className="px-4 py-3 text-sm font-mono text-foreground" data-metric>${c.monthly_cost.toFixed(2)}</td>
              <td className="px-4 py-3 text-sm font-mono text-destructive font-semibold" data-metric>${c.estimated_waste.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default CostAnalysis;
