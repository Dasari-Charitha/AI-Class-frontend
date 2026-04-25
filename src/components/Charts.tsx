import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type ChartItem = {
  name: string;
  value: number;
};

type ChartsProps = {
  title1: string;
  title2: string;
  data?: ChartItem[];
};

export default function Charts({ title1, title2, data = [] }: ChartsProps) {
  const safeData =
    data.length > 0
      ? data.map((item) => ({
          name: item.name,
          value: Number(item.value),
        }))
      : [
          { name: "Mon", value: 75 },
          { name: "Tue", value: 80 },
          { name: "Wed", value: 85 },
          { name: "Thu", value: 78 },
          { name: "Fri", value: 90 },
        ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="glass p-6">
        <h2 className="text-yellow-400 mb-4 text-lg font-semibold">
          {title1}
        </h2>

        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={safeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" stroke="#cbd5e1" />
            <YAxis stroke="#cbd5e1" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#FFD700"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="glass p-6">
        <h2 className="text-yellow-400 mb-4 text-lg font-semibold">
          {title2}
        </h2>

        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={safeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" stroke="#cbd5e1" />
            <YAxis stroke="#cbd5e1" />
            <Tooltip />
            <Bar dataKey="value" fill="#FFD700" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}