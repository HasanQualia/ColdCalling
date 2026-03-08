"use client";

import { useEffect, useRef, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const ticking = useRef(false);

  useEffect(() => {
    function update() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, scrollPercent));
      ticking.current = false;
    }

    function handleScroll() {
      if (!ticking.current) {
        rafRef.current = requestAnimationFrame(update);
        ticking.current = true;
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="reading-progress"
      style={{
        width: `${progress}%`,
        opacity: progress > 0 ? 1 : 0,
      }}
    />
  );
}
