"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export const PRODUCT_GALLERY_IMAGES = [
  { src: "/images/bottel.png", alt: "CoElegance Organic Hair Oil with golden oil splash" },
  { src: "/images/image 1.png", alt: "CoElegance Organic Hair Oil — front" },
  { src: "/images/main.png", alt: "CoElegance Organic Hair Oil — lifestyle" },
  { src: "/images/Organic 1.png", alt: "CoElegance Organic Hair Oil — product detail" },
] as const;

const MAIN_ZOOM_SCALE = 2.75;

type ProductImageGalleryProps = {
  images?: readonly { src: string; alt: string }[];
  className?: string;
};

export function ProductImageGallery({
  images = PRODUCT_GALLERY_IMAGES,
  className,
}: ProductImageGalleryProps) {
  const [selected, setSelected] = useState(0);
  const [mainHover, setMainHover] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const [finePointerHover, setFinePointerHover] = useState(false);

  const current = images[selected] ?? images[0];

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine)");
    const apply = () => setFinePointerHover(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!finePointerHover) setMainHover(false);
  }, [finePointerHover]);

  useEffect(() => {
    setMainHover(false);
    setZoomOrigin({ x: 50, y: 50 });
  }, [selected]);

  const onMainImageMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.min(100, Math.max(0, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomOrigin({ x, y });
  };

  if (!current) {
    return (
      <div
        className={cn(
          "w-full rounded-2xl bg-gray-50 p-6 text-center text-sm text-gray-500",
          className,
        )}
      >
        No images available.
      </div>
    );
  }

  return (
    <div className={cn("w-full space-y-4", className)}>
      <div className="relative w-full overflow-hidden rounded-2xl bg-white">
        <div className="flex min-h-[min(72vw,420px)] items-center justify-center sm:min-h-[380px] md:min-h-[460px] lg:min-h-[520px]">
          <div
            className={cn(
              "relative flex h-full w-full items-center justify-center px-3 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8",
              finePointerHover && "cursor-zoom-in",
            )}
            onMouseEnter={finePointerHover ? () => setMainHover(true) : undefined}
            onMouseLeave={
              finePointerHover
                ? () => {
                    setMainHover(false);
                    setZoomOrigin({ x: 50, y: 50 });
                  }
                : undefined
            }
            onMouseMove={finePointerHover ? onMainImageMove : undefined}
          >
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              width={1200}
              height={1200}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 560px"
              draggable={false}
              className="h-auto max-h-[min(75vh,560px)] w-full max-w-full object-contain select-none transition-opacity duration-200 sm:max-h-[480px] lg:max-h-[540px]"
              style={{
                transform:
                  finePointerHover && mainHover ? `scale(${MAIN_ZOOM_SCALE})` : "scale(1)",
                transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                transition:
                  finePointerHover && mainHover
                    ? "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                    : "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              priority={selected === 0}
            />
          </div>
        </div>
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {images.map((img, i) => {
            const isActive = selected === i;
            return (
              <button
                key={img.src}
                type="button"
                onClick={() => setSelected(i)}
                aria-label={`View image ${i + 1} of ${images.length}`}
                aria-current={isActive}
                className={cn(
                  "relative aspect-square overflow-hidden rounded-xl border-2 bg-[#f9fafb] p-1.5 transition-all",
                  isActive
                    ? "border-[#111827] shadow-md ring-2 ring-[#111827]/10"
                    : "border-gray-200 hover:border-gray-400 active:scale-[0.98]",
                )}
              >
                <Image
                  src={img.src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 22vw, 96px"
                  className="object-contain"
                  draggable={false}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
