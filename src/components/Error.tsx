export default function Error({ message }: { message: string }) {
  return (
    <div className="text-center mt-10">
      <h2 className="text-red-400 text-xl font-semibold">Error</h2>
      <p className="text-gray-300 mt-2">{message}</p>
    </div>
  );
}