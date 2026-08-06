export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F8F5F1] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 rounded-full border border-[#D8CFC4] border-t-[#8D9A83] animate-spin" />
        <p className="text-[0.625rem] font-normal tracking-[0.25em] uppercase text-[#BEB8AF]">
          Loading...
        </p>
      </div>
    </div>
  );
}
