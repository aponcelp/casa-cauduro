export function RcMonogram({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#8c3b2a] text-[0.7rem] font-medium tracking-[0.2em] text-[#8c3b2a] ${className}`}
      aria-hidden
    >
      RC
    </span>
  );
}
