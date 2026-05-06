"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

type LightboxImageProps = {
  src: StaticImageData;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function LightboxImage({
  src,
  alt,
  className,
  sizes,
  priority,
}: LightboxImageProps) {
  const [open, setOpen] = useState(false);

  const openLightbox = useCallback(() => setOpen(true), []);
  const closeLightbox = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, closeLightbox]);

  const imageSizes = useMemo(
    () => sizes ?? "(min-width: 1024px) 33vw, 100vw",
    [sizes]
  );

  return (
    <>
      <button
        type="button"
        onClick={openLightbox}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] text-left focus:outline-none focus:ring-2 focus:ring-indigo-400/60 focus:ring-offset-0"
        aria-label={`Expand image: ${alt}`}
      >
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0" />
          <div className="absolute bottom-3 right-3 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[11px] font-semibold text-slate-100 backdrop-blur">
            Click to expand
          </div>
        </div>
        <Image
          src={src}
          alt={alt}
          className={className ?? "h-auto w-full"}
          placeholder="blur"
          sizes={imageSizes}
          priority={priority}
        />
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Expanded image: ${alt}`}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div className="relative w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-[#070A12] shadow-glow">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3">
              <div className="min-w-0 truncate text-xs font-semibold text-slate-200">
                {alt}
              </div>
              <button
                type="button"
                onClick={closeLightbox}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
              >
                Close (Esc)
              </button>
            </div>
            <div className="max-h-[78vh] overflow-auto p-3">
              <Image
                src={src}
                alt={alt}
                className="h-auto w-full rounded-2xl"
                placeholder="blur"
                sizes="100vw"
                priority={priority}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

