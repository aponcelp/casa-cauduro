import Image from "next/image";

export function MediaFrame({
  src,
  alt,
  priority = false,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  ratio = "photo",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
  ratio?: "photo" | "hero" | "square";
}) {
  const ratioClass =
    ratio === "hero"
      ? "aspect-[4/5] sm:aspect-[16/10]"
      : ratio === "square"
        ? "aspect-square"
        : "aspect-[4/5] sm:aspect-[3/4]";

  return (
    <div
      className={`relative overflow-hidden bg-[#d4cfc6] ${ratioClass} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}
