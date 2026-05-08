export default function ProgressCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="card-hover rounded-2xl border border-slate-200/60 bg-white p-6 shadow-card dark:border-gold-600/8 dark:bg-[#111B33]">
      <h3 className="mb-2 text-sm text-slate-500 dark:text-slate-400">
        {label}
      </h3>

      <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-700">
        <div
          className="h-3 rounded-full bg-gradient-to-r from-gold-600 to-gold-400 shadow-sm shadow-gold-600/15"
          style={{ width: `${value}%` }}
        />
      </div>

      <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-gold-300">
        {value}%
      </p>
    </div>
  );
}