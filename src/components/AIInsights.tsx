type AIInsightsProps = {
  role: "student" | "teacher" | "principal" | "hod";
};

const insights: Record<string, string[]> = {
  student: [
    "📉 Your attendance dropped this week. Try to maintain above 75%.",
    "📘 Focus more on Mathematics — it's your weak area.",
    "🧠 Practice 10 medium-level questions daily.",
  ],
  teacher: [
    "📊 Class performance improved by 12% this week.",
    "⚠️ 4 students need attention due to low attendance.",
    "📝 Assign revision work before the next assessment.",
  ],
  principal: [
    "🏫 Institution performance is stable this week.",
    "📌 CSE department shows the best academic growth.",
    "⚠️ Review attendance alerts for at-risk students.",
  ],
  hod: [
    "📈 Department attendance is improving.",
    "⚠️ Some faculty reports are still pending.",
    "🎯 Focus on students below average performance.",
  ],
};

export default function AIInsights({ role }: AIInsightsProps) {
  return (
    <div className="card-hover mt-8 rounded-3xl border border-slate-200 bg-white/90 p-6 text-slate-900 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-white/10 dark:text-white">
      <h2 className="mb-4 text-xl font-black text-blue-600 dark:text-blue-300">
        AI Insights
      </h2>

      <ul className="space-y-3">
        {insights[role].map((item, index) => (
          <li
            key={index}
            className="rounded-2xl border border-slate-200 bg-slate-100/90 p-4 text-slate-800 dark:border-white/10 dark:bg-black/30 dark:text-slate-100"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}