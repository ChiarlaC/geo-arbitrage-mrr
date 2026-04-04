export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <div className="card bg-white/90 backdrop-blur-xl rounded-xl shadow-sm border border-neutral-200/50 p-8 max-w-2xl">
        <h2 className="text-2xl font-display font-semibold mb-4 text-center">
          Page Not Found
        </h2>
        <p className="text-neutral-600 mb-6 text-center">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="btn-primary bg-gradient-to-b from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl hover:shadow-xl transition-all block text-center"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  )
}
