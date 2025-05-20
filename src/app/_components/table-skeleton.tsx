export default function TableSkeleton() {
  return (
    <div className="w-full animate-pulse max-[600px]:w-4/5">
      <div className="mb-2 h-10 rounded-t bg-gray-200"></div>
      {Array(10)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="mb-1 h-12 rounded bg-gray-100"></div>
        ))}
    </div>
  );
}
