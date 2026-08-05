"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * A `background-image` div that defers fetching the image until it scrolls
 * near the viewport — CSS backgrounds fetch immediately by default, unlike
 * `next/image`, which lazy-loads on its own. Shows the site's blue → pink
 * brand gradient as a placeholder until the photo has actually finished
 * downloading, so the deferral is visible instead of just an empty box.
 *
 * Safe to use under GSAP's `data-parallax` (see scroll-fx.tsx): that only
 * transforms the element, it never reads the background itself.
 */
export function LazyBg({
  src,
  className,
  ...rest
}: { src: string; className?: string } & Omit<React.HTMLAttributes<HTMLDivElement>, "className">) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (!cancelled) setLoaded(true);
    };
    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [visible, src]);

  return (
    <div
      ref={ref}
      {...rest}
      className={cn("bg-gradient-brand transition-opacity duration-500", !loaded && "animate-pulse", className)}
      style={{ ...rest.style, backgroundImage: loaded ? `url(${src})` : undefined }}
    />
  );
}
