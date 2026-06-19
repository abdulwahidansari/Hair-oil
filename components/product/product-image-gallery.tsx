"use client";

import Image from "next/image";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export const PRODUCT_GALLERY_IMAGES = [
  { src: "/images/bottel1.png", alt: "CoElegance Organic Hair Oil with golden oil splash" },
  { src: "/images/bottel.png", alt: "CoElegance Organic Hair Oil — front" },
  { src: "/images/main.png", alt: "CoElegance Organic Hair Oil — lifestyle" },
  { src: "/images/b.png", alt: "CoElegance Organic Hair Oil — product detail" },
] as const;

const MAIN_ZOOM_SCALE = 2.75;
const THUMB_SIZE_MOBILE = 80;
const THUMB_SIZE_DESKTOP = 96;
const THUMB_GAP = 12;

function scrollThumbIntoView(
  strip: HTMLElement | null,
  thumb: HTMLElement | null,
  axis: "x" | "y",
) {
  if (!strip || !thumb) return;

  const t = thumb.getBoundingClientRect();
  const s = strip.getBoundingClientRect();

  if (axis === "x") {
    const delta = t.left + t.width / 2 - (s.left + s.width / 2);
    strip.scrollBy({ left: delta, behavior: "smooth" });
    return;
  }

  const delta = t.top + t.height / 2 - (s.top + s.height / 2);
  strip.scrollBy({ top: delta, behavior: "smooth" });
}

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

  const vScrollRef = useRef<HTMLDivElement>(null);
  const hScrollRef = useRef<HTMLDivElement>(null);
  const [vScroll, setVScroll] = useState({ up: false, down: false });
  const [hScroll, setHScroll] = useState({ left: false, right: false });

  const scrollStepMobile = THUMB_SIZE_MOBILE + THUMB_GAP;
  const scrollStepDesktop = THUMB_SIZE_DESKTOP + THUMB_GAP;

  const syncVScroll = useCallback(() => {
    const el = vScrollRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    setVScroll({
      up: scrollTop > 4,
      down: scrollTop + clientHeight < scrollHeight - 4,
    });
  }, []);

  const syncHScroll = useCallback(() => {
    const el = hScrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setHScroll({
      left: scrollLeft > 4,
      right: scrollLeft + clientWidth < scrollWidth - 4,
    });
  }, []);

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
    syncVScroll();
    syncHScroll();
    const onResize = () => {
      syncVScroll();
      syncHScroll();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [syncVScroll, syncHScroll, images.length]);

  useEffect(() => {
    setMainHover(false);
    setZoomOrigin({ x: 50, y: 50 });

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const strip = isMobile ? hScrollRef.current : vScrollRef.current;
    const thumb = strip?.querySelector<HTMLElement>(`[data-thumb-idx="${selected}"]`) ?? null;

    scrollThumbIntoView(strip, thumb, isMobile ? "x" : "y");
  }, [selected]);

  const scrollV = (dir: "up" | "down") => {
    vScrollRef.current?.scrollBy({
      top: dir === "down" ? scrollStepDesktop : -scrollStepDesktop,
      behavior: "smooth",
    });
  };

  const scrollH = (dir: "left" | "right") => {
    hScrollRef.current?.scrollBy({
      left: dir === "right" ? scrollStepMobile : -scrollStepMobile,
      behavior: "smooth",
    });
  };

  const onMainImageMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.min(100, Math.max(0, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomOrigin({ x, y });
  };

  const current = images[selected] ?? images[0];

  const thumbButtons = (keyPrefix: string, size: "mobile" | "desktop") =>
    images.map((img, i) => {
      const isActive = selected === i;
      const dimension =
        size === "mobile"
          ? "h-20 w-20 min-h-20 min-w-20"
          : "h-24 w-24 min-h-24 min-w-24";

      return (
        <button
          key={`${keyPrefix}-${i}`}
          type="button"
          data-thumb-idx={i}
          onClick={() => setSelected(i)}
          className={cn(
            "relative shrink-0 overflow-hidden rounded-xl border-2 bg-[#f9fafb] p-1.5 transition-all",
            dimension,
            isActive
              ? "border-[#111827] shadow-md ring-2 ring-[#111827]/10"
              : "border-gray-200 hover:border-gray-400 active:scale-[0.98]",
          )}
          aria-label={`View image ${i + 1} of ${images.length}`}
          aria-current={isActive}
        >
          <Image
            src={img.src}
            alt=""
            fill
            sizes={size === "mobile" ? "80px" : "96px"}
            className="object-contain"
            draggable={false}
          />
        </button>
      );
    });

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

  const verticalStripMaxHeight = Math.min(
    420,
    images.length * scrollStepDesktop - THUMB_GAP,
  );

  return (
    <div className={cn("w-full", className)}>
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-5 lg:gap-6">
        {/* Desktop: vertical thumbnail strip */}
        <div className="hidden shrink-0 flex-col items-center gap-2 md:flex">
          <button
            type="button"
            aria-label="Scroll thumbnails up"
            onClick={() => scrollV("up")}
            disabled={!vScroll.up}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-[#111827] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
          <div
            ref={vScrollRef}
            onScroll={syncVScroll}
            className="flex flex-col gap-3 overflow-y-auto py-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ maxHeight: `${verticalStripMaxHeight}px` }}
          >
            {thumbButtons("d", "desktop")}
          </div>
          <button
            type="button"
            aria-label="Scroll thumbnails down"
            onClick={() => scrollV("down")}
            disabled={!vScroll.down}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-[#111827] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        {/* Main image */}
        <div className="order-1 min-w-0 flex-1 md:order-none">
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
        </div>

        {/* Mobile: horizontal thumbnail strip below main image */}
        <div className="order-2 flex items-center gap-2 md:hidden">
          <button
            type="button"
            aria-label="Scroll thumbnails left"
            onClick={() => scrollH("left")}
            disabled={!hScroll.left}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-[#111827] disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div
            ref={hScrollRef}
            onScroll={syncHScroll}
            className="flex min-w-0 flex-1 gap-3 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {thumbButtons("m", "mobile")}
          </div>
          <button
            type="button"
            aria-label="Scroll thumbnails right"
            onClick={() => scrollH("right")}
            disabled={!hScroll.right}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-[#111827] disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
