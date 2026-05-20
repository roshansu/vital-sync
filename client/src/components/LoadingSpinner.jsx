const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>

      <p className="mt-4 text-base font-semibold text-gray-700">
        Loading data...
      </p>
    </div>
  );
};

export default LoadingSpinner;