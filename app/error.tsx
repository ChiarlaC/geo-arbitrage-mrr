'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <div className="card bg-white/90 backdrop-blur-xl rounded-xl shadow-sm border border-neutral-200/50 p-8 max-w-2xl">
        <h2 className="text-2xl font-display font-semibold mb-4 text-center">
          Something went wrong!
        </h2>
        <p className="text-neutral-600 mb-6 text-center">
          {error.message}
        </p>
        <button
          onClick={() => reset()}
          className="btn-primary bg-gradient-to-b from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl hover:shadow-xl transition-all"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
