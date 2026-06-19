"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export const PRODUCT_GALLERY_IMAGES = [
  { src: "/images/bottel.png", alt: "CoElegance hair oil — front" },
  { src: "/images/bottel1.png", alt: "CoElegance hair oil — angle" },
  { src: "/images/main.png", alt: "CoElegance hair oil — lifestyle" },
] as const;

/** Hover zoom level so label text on the bottle is readable */
const MAIN_ZOOM_SCALE = 2.75;

type ProductImageGalleryProps = {
  images?: readonly { src: string; alt: string }[];
  className?: string;
};

export function ProductImageGallery({
  images = PRODUCT_GALLERY_IMAGES,
  className,
}: ProductImageGalleryProps) {
  const [mainHover, setMainHover] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const [finePointerHover, setFinePointerHover] = useState(false);

  const current = images[0];

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
    <div className={cn("w-full p-2 sm:p-3 md:p-4", className)}>
      <div className="relative aspect-[3/4] w-full min-h-0 overflow-hidden rounded-2xl bg-white md:aspect-auto md:min-h-[400px] lg:min-h-[440px]">
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden p-4 md:p-8">
          <div
            className={cn(
              "relative flex h-full w-full max-h-[min(520px,70vh)] touch-manipulation items-center justify-center",
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
              src={current.src}
              alt={current.alt}
              width={1200}
              height={1200}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 36rem"
              draggable={false}
              className="h-full w-full object-contain select-none"
              style={{
                transform:
                  finePointerHover && mainHover ? `scale(${MAIN_ZOOM_SCALE})` : "scale(1)",
                transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                transition:
                  finePointerHover && mainHover
                    ? "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                    : "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
