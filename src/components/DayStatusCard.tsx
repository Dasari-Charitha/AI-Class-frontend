const holidays = ["2026-01-26", "2026-08-15", "2026-10-02"];

const getDayStatus = () => {
  const today = new Date();

  const dayName = today.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const fullDate = today.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const dateKey = today.toISOString().split("T")[0];

  const isSunday = dayName === "Sunday";
  const isHoliday = holidays.includes(dateKey);
  const isWorkingDay = !isSunday && !isHoliday;

  return {
    dayName,
    fullDate,
    dateKey,
    isWorkingDay,
    statusText: isWorkingDay ? "Working Day" : "Leave Day",
    reason: isSunday
      ? "Sunday Holiday"
      : isHoliday
      ? "Institution Holiday"
      : "Regular Academic Day",
  };
};

export const getCurrentDayStatus = getDayStatus;

export default function DayStatusCard() {
  const dayStatus = getDayStatus();

  return (
    <div className="glass p-6 hover:scale-105 transition-transform">
      <p className="text-gray-400">Today</p>

      <h2 className="text-2xl font-bold text-yellow-400">
        {dayStatus.dayName}
      </h2>

      <p className="text-sm text-gray-300 mt-1">
        📅 {dayStatus.fullDate}
      </p>

      <p
        className={`mt-2 font-semibold ${
          dayStatus.isWorkingDay ? "text-green-400" : "text-red-400"
        }`}
      >
        {dayStatus.statusText}
      </p>

      <p className="text-sm text-gray-400 mt-1">{dayStatus.reason}</p>
    </div>
  );
}