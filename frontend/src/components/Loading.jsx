// FullScreenLoader.jsx
const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full border-t-4 border-b-4 border-white animate-spin"></div>
        <div className="absolute inset-2 rounded-full bg-white/10 backdrop-blur-md shadow-xl flex items-center justify-center">
          <span className="text-white font-semibold text-sm animate-pulse">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
