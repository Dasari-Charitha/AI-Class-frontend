import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type ChartProps = {
  title1: string;
  title2: string;
  data?: { name: string; value: number }[];
};

const defaultData = [
  { name: "Mon", value: 75 },
  { name: "Tue", value: 82 },
  { name: "Wed", value: 70 },
  { name: "Thu", value: 88 },
  { name: "Fri", value: 92 },
];

export default function Charts({ title1, title2, data }: ChartProps) {
  const chartData = data && data.length > 0 ? data : defaultData;

  return (
    <div className="text-slate-900 dark:text-white">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-white/10 dark:bg-black/20">
          <h2 className="mb-4 text-lg font-black text-slate-900 dark:text-white">
            {title1}
          </h2>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
              <XAxis dataKey="name" tick={{ fill: "#334155", fontSize: 12 }} />
              <YAxis tick={{ fill: "#334155", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  color: "#0f172a",
                  border: "1px solid #cbd5e1",
                  borderRadius: "12px",
                }}
                labelStyle={{ color: "#0f172a" }}
              />
              <Bar dataKey="value" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-white/10 dark:bg-black/20">
          <h2 className="mb-4 text-lg font-black text-slate-900 dark:text-white">
            {title2}
          </h2>

          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
              <XAxis dataKey="name" tick={{ fill: "#334155", fontSize: 12 }} />
              <YAxis tick={{ fill: "#334155", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  color: "#0f172a",
                  border: "1px solid #cbd5e1",
                  borderRadius: "12px",
                }}
                labelStyle={{ color: "#0f172a" }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#7c3aed"
                strokeWidth={4}
                dot={{ fill: "#7c3aed", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}