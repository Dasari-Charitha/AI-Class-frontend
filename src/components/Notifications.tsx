export default function Notifications() {
  const notifications = [
    "📢 New assignment uploaded",
    "📅 Exam scheduled for tomorrow",
    "✅ Leave request approved",
  ];

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-gray-200 dark:border-white/10 shadow-md">
      <h2 className="text-blue-600 dark:text-purple-400 text-xl font-bold mb-3">
        Notifications
      </h2>

      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
        {notifications.map((note, i) => (
          <li key={i}>• {note}</li>
        ))}
      </ul>
    </div>
  );
}