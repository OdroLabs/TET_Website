"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export function TestimonialCarousel({
  items,
}: {
  items: { quote: string; author: string; photo?: string | null }[];
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 6500);
    return () => clearInterval(id);
  }, [items.length]);

  if (items.length === 0) return null;
  const item = items[index];

  return (
    <div className="mx-auto max-w-3xl text-center">
      {item.photo ? (
        <div
          key={`photo-${index}`}
          className="quote-enter mx-auto mb-5 h-14 w-14 rounded-2xl bg-cover bg-center shadow-lg shadow-accent/20 ring-1 ring-white"
          style={{ backgroundImage: `url(${item.photo})` }}
        />
      ) : (
        <span className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-accent shadow-lg shadow-accent/20">
          <Quote className="h-6 w-6 text-white" />
        </span>
      )}
      {/* key re-mounts on change to replay the crossfade */}
      <div key={index} className="quote-enter">
        <blockquote className="mb-4 text-lg leading-relaxed text-foreground/90 md:text-xl">
          “{item.quote}”
        </blockquote>
        <p className="mb-6 text-sm font-bold text-primary">{item.author}</p>
      </div>
      {items.length > 1 && (
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setIndex((index - 1 + items.length) % items.length)}
            aria-label="Previous"
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-white shadow-sm transition-all hover:border-primary/40 hover:text-primary hover:shadow-md motion-safe:active:scale-95"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-1.5" aria-hidden>
            {items.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === index ? "w-6 bg-primary" : "w-1.5 bg-border"
                )}
              />
            ))}
          </div>
          <button
            onClick={() => setIndex((index + 1) % items.length)}
            aria-label="Next"
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-white shadow-sm transition-all hover:border-primary/40 hover:text-primary hover:shadow-md motion-safe:active:scale-95"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
