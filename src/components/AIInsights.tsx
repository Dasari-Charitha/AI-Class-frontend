export default function AIInsights({ role }: { role: string }) {
  const insights = {
    student: [
      "📉 Your attendance dropped this week. Try to maintain above 75%.",
      "📘 Focus more on Mathematics – it's your weak area.",
      "🧠 Practice 10 medium-level questions daily.",
    ],
    teacher: [
      "📊 5 students are at risk based on recent performance.",
      "📝 Consider conducting a revision test this week.",
    ],
    hod: [
      "📉 Department attendance decreased by 8% this week.",
      "🏆 CSE department is performing best this month.",
    ],
    principal: [
      "⚠️ 12 students have low attendance across departments.",
      "📈 Overall institution performance improved by 6%.",
    ],
  };

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md mt-6">
      <h2 className="text-xl font-bold mb-3">AI Insights</h2>

      <ul className="space-y-2 text-sm">
        {insights[role as keyof typeof insights]?.map((item, i) => (
          <li key={i}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}