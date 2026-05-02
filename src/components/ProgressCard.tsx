export default function ProgressCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-gray-200 dark:border-white/10 shadow-md">
      <h3 className="text-sm text-gray-500 mb-2">{label}</h3>

      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
        <div
          className="h-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
          style={{ width: `${value}%` }}
        />
      </div>

      <p className="mt-2 text-sm font-semibold">{value}%</p>
    </div>
  );
}