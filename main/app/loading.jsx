export default function Loading() {
  return (
    <div className="grid h-screen place-items-center">
      <div
        className="border-t-transparent border-solid animate-spin  rounded-full border-orange-400 border-8 h-48 w-48"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
