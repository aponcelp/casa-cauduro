"use client";

export function CalEmbed({
  url,
  placeholderNote,
}: {
  url: string;
  placeholderNote?: string;
}) {
  return (
    <div className="mt-10 w-full">
      {placeholderNote ? (
        <p className="mb-3 text-sm text-[#5c574f]">{placeholderNote}</p>
      ) : null}
      <div className="w-full overflow-hidden border border-[#d4cfc6] bg-white">
        <iframe
          title="Cal.com — Visita guiada Casa Estudio"
          src={url}
          className="h-[min(820px,90vh)] w-full max-w-full border-0"
          loading="lazy"
          allow="payment *"
        />
      </div>
    </div>
  );
}
