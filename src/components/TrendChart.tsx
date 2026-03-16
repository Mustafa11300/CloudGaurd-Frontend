import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { useEffect, useState } from "react";
import { getScoreTrend, type TrendPoint } from "@/data/api";

const TrendChart = () => {
  const [chartData, setChartData] = useState<{ date: string; score: number; cost: number }[]>([]);

  useEffect(() => {
    getScoreTrend(7)
      .then((trend: TrendPoint[]) => {
        const mapped = trend.map((s) => ({
          date:  new Date(s.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          score: s.security_score,
          cost:  s.cost_health_score,
        }));
        setChartData(mapped);
      })
      .catch(() => console.error("Trend load failed"));
  }, []);

  return (
    <div className="border border-border bg-card rounded-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Security Score Trend (7d)
        </h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-5 rounded-full bg-primary" />
            <span className="text-[10px] text-muted-foreground">Security</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-5 rounded-full bg-accent" />
            <span className="text-[10px] text-muted-foreground">Cost Health</span>
          </div>
        </div>
      </div>

      {chartData.length === 0 ? (
        <div className="h-56 flex items-center justify-center text-muted-foreground text-sm">
          No trend data yet — run bootstrap.py a few more times to build history.
        </div>
      ) : (
        <div className="h-56">
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 19%, 12%)" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "hsl(215, 20%, 55%)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 10, fill: "hsl(215, 20%, 55%)" }}
                axisLine={false}
                tickLine={false}
                width={30}
              />
              <Tooltip
                contentStyle={{
                  background:   "hsl(222, 30%, 7%)",
                  border:       "1px solid hsl(217, 19%, 14%)",
                  borderRadius: "6px",
                  fontSize:     "12px",
                  color:        "hsl(210, 40%, 98%)",
                }}
              />
              <Line type="monotone" dataKey="score" stroke="hsl(160, 84%, 39%)" strokeWidth={2} dot={false} name="Security" />
              <Line type="monotone" dataKey="cost"  stroke="hsl(199, 89%, 48%)" strokeWidth={2} dot={false} name="Cost Health" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default TrendChart;