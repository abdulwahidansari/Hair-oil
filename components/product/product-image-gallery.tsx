"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export const PRODUCT_GALLERY_IMAGES = [
  { src: "/images/bottel.png", alt: "CoElegance hair oil — front" },
  { src: "/images/bottel1.png", alt: "CoElegance hair oil — angle" },
  { src: "/images/main.png", alt: "CoElegance hair oil — lifestyle" },
  { src: "/images/bottel.png", alt: "CoElegance hair oil — detail 1" },
  { src: "/images/bottel1.png", alt: "CoElegance hair oil — detail 2" },
] as const;

const THUMB_SIZE_PX = 64;
const THUMB_GAP = 8;
const SCROLL_STEP = THUMB_SIZE_PX + THUMB_GAP;

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
  const [selected, setSelected] = useState(0);
  const vScrollRef = useRef<HTMLDivElement>(null);
  const hScrollRef = useRef<HTMLDivElement>(null);
  const [vScroll, setVScroll] = useState({ up: false, down: false });
  const [hScroll, setHScroll] = useState({ left: false, right: false });
  const [mainHover, setMainHover] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  /** Hover zoom breaks mobile layout (scale + scrollIntoView); enable only on desktop fine pointer */
  const [finePointerHover, setFinePointerHover] = useState(false);

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
    syncVScroll();
    syncHScroll();
    const onResize = () => {
      syncVScroll();
      syncHScroll();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [syncVScroll, syncHScroll]);

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
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    const thumb = desktop
      ? vScrollRef.current?.querySelector<HTMLElement>(`[data-thumb-idx="${selected}"]`)
      : hScrollRef.current?.querySelector<HTMLElement>(`[data-thumb-idx="${selected}"]`);

    if (!thumb) return;

    if (desktop) {
      thumb.scrollIntoView({ block: "nearest", behavior: "smooth" });
      return;
    }

    const strip = hScrollRef.current;
    if (!strip) return;
    const t = thumb.getBoundingClientRect();
    const s = strip.getBoundingClientRect();
    const delta = t.left + t.width / 2 - (s.left + s.width / 2);
    strip.scrollBy({ left: delta, behavior: "smooth" });
  }, [selected]);

  useEffect(() => {
    setMainHover(false);
    setZoomOrigin({ x: 50, y: 50 });
  }, [selected]);

  useEffect(() => {
    setSelected((prev) =>
      Math.min(Math.max(0, prev), Math.max(0, images.length - 1))
    );
  }, [images.length]);

  const onMainImageMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.min(100, Math.max(0, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomOrigin({ x, y });
  };

  const scrollV = (dir: "up" | "down") => {
    vScrollRef.current?.scrollBy({
      top: dir === "down" ? SCROLL_STEP : -SCROLL_STEP,
      behavior: "smooth",
    });
  };

  const scrollH = (dir: "left" | "right") => {
    hScrollRef.current?.scrollBy({
      left: dir === "right" ? SCROLL_STEP : -SCROLL_STEP,
      behavior: "smooth",
    });
  };

  const current = images[selected] ?? images[0];

  if (!current) {
    return (
      <div className={cn("w-full rounded-2xl bg-gray-50 p-6 text-center text-sm text-gray-500", className)}>
        No images available.
      </div>
    );
  }

  const thumbButtons = (keyPrefix: string) =>
    images.map((img, i) => (
      <button
        key={`${keyPrefix}-${i}`}
        type="button"
        data-thumb-idx={String(i)}
        onClick={() => setSelected(i)}
        className={cn(
          "relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-white transition-all duration-200",
          selected === i ? "opacity-100 shadow-md" : "opacity-70 hover:opacity-100"
        )}
        aria-label={`View image ${i + 1}`}
        aria-current={selected === i ? true : undefined}
      >
        <Image
          src={img.src}
          alt={`${img.alt} — thumbnail`}
          fill
          className="object-cover transition-transform duration-300 ease-out hover:scale-125"
          sizes="64px"
        />
      </button>
    ));

  return (
    <div className={cn("w-full p-2 sm:p-3 md:p-4", className)}>
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-5">
        {/* Mobile: thumbnails below hero — order-2; desktop hidden */}
        <div className="order-2 flex items-center gap-2 md:hidden">
          <button
            type="button"
            aria-label="Scroll thumbnails left"
            onClick={() => scrollH("left")}
            disabled={!hScroll.left}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[#111827] transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div
            ref={hScrollRef}
            onScroll={syncHScroll}
            className="flex min-w-0 flex-1 gap-2 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {thumbButtons("m")}
          </div>
          <button
            type="button"
            aria-label="Scroll thumbnails right"
            onClick={() => scrollH("right")}
            disabled={!hScroll.right}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[#111827] transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Desktop: vertical strip + up/down — first in row */}
        <div className="order-1 hidden shrink-0 flex-col items-center gap-1 md:flex">
          <button
            type="button"
            aria-label="Scroll thumbnails up"
            onClick={() => scrollV("up")}
            disabled={!vScroll.up}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-[#111827] transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
          <div
            ref={vScrollRef}
            onScroll={syncVScroll}
            className="flex max-h-[280px] flex-col gap-2 overflow-y-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {thumbButtons("d")}
          </div>
          <button
            type="button"
            aria-label="Scroll thumbnails down"
            onClick={() => scrollV("down")}
            disabled={!vScroll.down}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-[#111827] transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        {/* Main image — hero first on mobile (order-1); pointer zoom on desktop */}
        <div className="relative order-1 aspect-[3/4] w-full min-h-0 min-w-0 flex-1 overflow-hidden rounded-2xl bg-white md:order-2 md:aspect-auto md:min-h-[400px] lg:min-h-[440px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center overflow-hidden p-4 md:p-8"
            >
              <div
                className={cn(
                  "relative flex h-full w-full max-h-[min(520px,70vh)] touch-manipulation items-center justify-center",
                  finePointerHover && "cursor-zoom-in"
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
                  priority={selected === 0}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
