import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { categorySpendData } from "@/lib/vendorData";

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--muted-foreground))",
];

export const CategoryPieChart = () => {
  const total = categorySpendData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="chart-card animate-slide-up" style={{ animationDelay: "300ms" }}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Spend by Category</h3>
        <p className="text-sm text-muted-foreground">Distribution across vendor categories</p>
      </div>
      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categorySpendData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
            >
              {categorySpendData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "var(--shadow-card)"
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        {categorySpendData.slice(0, 4).map((item, index) => (
          <div key={item.name} className="flex items-center gap-2">
            <div 
              className="h-2.5 w-2.5 rounded-full" 
              style={{ backgroundColor: COLORS[index] }}
            />
            <span className="text-xs text-muted-foreground truncate">{item.name}</span>
            <span className="text-xs font-medium ml-auto">
              {((item.value / total) * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
