export function CalEmbed({ url }: { url?: string }) {
  if (!url) return null;

  return (
    <iframe
      title="Cal.com"
      src={url}
      className="mt-10 h-[720px] w-full border border-[#d4cfc6] bg-white"
    />
  );
}
