export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <div className="card bg-white/90 backdrop-blur-xl rounded-xl shadow-sm border border-neutral-200/50 p-8 max-w-2xl w-full">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-neutral-200/50 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-neutral-200/50 rounded w-full"></div>
          <div className="h-4 bg-neutral-200/50 rounded w-5/6"></div>
          <div className="h-4 bg-neutral-200/50 rounded w-2/3"></div>
          <div className="h-12 bg-neutral-200/50 rounded-xl w-1/2 mx-auto mt-6"></div>
        </div>
      </div>
    </div>
  )
}
