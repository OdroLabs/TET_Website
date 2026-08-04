"use client";

import { useEffect, useState } from "react";
import { Contrast } from "lucide-react";

type FontSize = "base" | "font-lg" | "font-xl";

const FONT_KEY = "csdf-font";
const CONTRAST_KEY = "csdf-contrast";

/** Accessibility strip — font-size and high-contrast toggles, persisted locally. */
export function AccessToolbar() {
  const [fontSize, setFontSize] = useState<FontSize>("base");
  const [contrast, setContrast] = useState(false);

  useEffect(() => {
    const savedFont = (localStorage.getItem(FONT_KEY) as FontSize) || "base";
    const savedContrast = localStorage.getItem(CONTRAST_KEY) === "1";
    setFontSize(savedFont);
    setContrast(savedContrast);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("font-lg", "font-xl");
    if (fontSize !== "base") root.classList.add(fontSize);
    localStorage.setItem(FONT_KEY, fontSize);
  }, [fontSize]);

  useEffect(() => {
    document.documentElement.classList.toggle("high-contrast", contrast);
    localStorage.setItem(CONTRAST_KEY, contrast ? "1" : "0");
  }, [contrast]);

  const sizeBtn = (size: FontSize, label: string) => (
    <button
      type="button"
      onClick={() => setFontSize(size)}
      aria-pressed={fontSize === size}
      className={`grid h-6 w-6 place-items-center rounded text-[11px] font-bold transition-colors ${
        fontSize === size ? "bg-accent text-navy-950" : "text-white/70 hover:text-white"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="hidden bg-navy-950 text-white md:block">
      <div className="mx-auto flex max-w-[1400px] items-center justify-end gap-4 px-4 py-1.5 text-xs md:px-6">
        <div className="flex items-center gap-1" role="group" aria-label="Text size">
          {sizeBtn("base", "A")}
          {sizeBtn("font-lg", "A+")}
          {sizeBtn("font-xl", "A++")}
        </div>
        <button
          type="button"
          onClick={() => setContrast((c) => !c)}
          aria-pressed={contrast}
          className={`flex items-center gap-1.5 rounded px-2 py-0.5 font-semibold transition-colors ${
            contrast ? "bg-accent text-navy-950" : "text-white/70 hover:text-white"
          }`}
        >
          <Contrast className="h-3.5 w-3.5" /> High contrast
        </button>
      </div>
    </div>
  );
}
