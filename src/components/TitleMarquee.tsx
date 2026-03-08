"use client";

import { useEffect } from "react";

const TITLE = "Cold Calling Wiki — Expert Tips for Effective Outreach";

const FRAMES: [string, number][] = [
  ["☎️ Ring...", 1000],
  ["📞 Ring ring...", 1000],
  ["📲 Connecting...", 1200],
  [`✅ ${TITLE}`, 3000],
];

const TYPE_SPEED = 50;
const ERASE_SPEED = 30;

export function TitleMarquee() {
  useEffect(() => {
    let index = 0;
    let timeout: ReturnType<typeof setTimeout>;
    let cancelled = false;

    function typeText(text: string, onDone: () => void) {
      let i = 0;
      function step() {
        if (cancelled) return;
        i++;
        document.title = text.slice(0, i);
        if (i < text.length) {
          timeout = setTimeout(step, TYPE_SPEED);
        } else {
          onDone();
        }
      }
      step();
    }

    function eraseText(text: string, onDone: () => void) {
      let i = text.length;
      function step() {
        if (cancelled) return;
        i--;
        document.title = text.slice(0, i) || " ";
        if (i > 0) {
          timeout = setTimeout(step, ERASE_SPEED);
        } else {
          onDone();
        }
      }
      step();
    }

    function next() {
      if (cancelled) return;
      const [text, holdMs] = FRAMES[index];
      index = (index + 1) % FRAMES.length;

      typeText(text, () => {
        timeout = setTimeout(() => {
          eraseText(text, next);
        }, holdMs);
      });
    }

    next();

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      document.title = TITLE;
    };
  }, []);

  return null;
}
