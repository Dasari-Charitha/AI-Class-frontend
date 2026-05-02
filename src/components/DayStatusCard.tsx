export const getCurrentDayStatus = () => {
  const today = new Date();

  const dayName = today.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const fullDate = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const isSunday = dayName === "Sunday";

  return {
    dayName,
    fullDate,
    isWorkingDay: !isSunday,
    status: isSunday ? "Leave Day" : "Working Day",
    message: isSunday ? "Weekly Holiday" : "Regular Academic Day",
  };
};

export default function DayStatusCard() {
  const dayStatus = getCurrentDayStatus();

  return (
    <div className="card-hover rounded-3xl border border-slate-200 bg-white/90 p-6 text-slate-900 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/10 dark:text-white">
      <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
        Today
      </p>

      <h2 className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
        {dayStatus.dayName}
      </h2>

      <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-300">
        📅 {dayStatus.fullDate}
      </p>

      <div className="mt-4 rounded-2xl bg-blue-100 px-4 py-3 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">
        <p className="font-black">{dayStatus.status}</p>
        <p className="text-sm">{dayStatus.message}</p>
      </div>
    </div>
  );
}