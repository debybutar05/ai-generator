export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-spin"></div>
        <div className="absolute inset-1 bg-white rounded-full"></div>
      </div>
      <p className="text-gray-600 font-semibold text-center">
        Generating your documents...
      </p>
      <p className="text-gray-500 text-sm mt-2 text-center">
        This may take 1-2 minutes
      </p>
    </div>
  )
}
