const LoadingSpinner = () => (
  <div className="fixed top-0 left-0 right-0 bottom-0 z-5000 flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gray-500 bg-opacity-20">
    <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-t-4 border-gray-400 border-t-red-400 ease-linear" />
  </div>
)

export default LoadingSpinner
