export default function Loading() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-6 w-1/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
      <div className="h-40 bg-gray-300 dark:bg-gray-700 rounded"></div>
      <div className="h-40 bg-gray-300 dark:bg-gray-700 rounded"></div>
    </div>
  );
}