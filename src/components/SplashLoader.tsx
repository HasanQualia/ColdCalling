"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SplashLoader() {
  const [show, setShow] = useState(false);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("splash-shown")) return;
    setShow(true);
    sessionStorage.setItem("splash-shown", "1");

    const timer = setTimeout(() => setExit(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence onExitComplete={() => setShow(false)}>
      {!exit && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: "#021945" }}
        >
          {/* Pulse rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="splash-ring absolute rounded-full"
                style={{
                  width: 120,
                  height: 120,
                  border: "2px solid rgba(231, 178, 33, 0.4)",
                  animationDelay: `${0.3 + i * 0.45}s`,
                }}
              />
            ))}
          </div>

          {/* Phone icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <svg
              className="splash-vibrate"
              width="72"
              height="72"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#e7b221"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ animationDelay: "0.3s" }}
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              {/* Sound waves */}
              <path d="M14.05 2a9 9 0 0 1 8 7.94" className="splash-wave" style={{ animationDelay: "0.5s" }} />
              <path d="M14.05 6a5 5 0 0 1 4 3.9" className="splash-wave" style={{ animationDelay: "0.8s" }} />
            </svg>
          </motion.div>

          {/* Site name */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.4, ease: "easeOut" }}
            className="mt-6 text-2xl font-bold tracking-wide text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Cold Calling Wiki
          </motion.h1>

          <style>{`
            @keyframes splash-ring-expand {
              0% { transform: scale(1); opacity: 0.6; }
              100% { transform: scale(4); opacity: 0; }
            }
            @keyframes splash-vibrate {
              0%, 100% { transform: rotate(0deg); }
              10% { transform: rotate(-12deg); }
              20% { transform: rotate(12deg); }
              30% { transform: rotate(-10deg); }
              40% { transform: rotate(10deg); }
              50% { transform: rotate(-6deg); }
              60% { transform: rotate(6deg); }
              70% { transform: rotate(-2deg); }
              80% { transform: rotate(0deg); }
            }
            @keyframes splash-wave-pulse {
              0%, 100% { opacity: 0; }
              50% { opacity: 1; }
            }
            .splash-ring {
              animation: splash-ring-expand 1.8s ease-out forwards;
              opacity: 0;
            }
            .splash-vibrate {
              animation: splash-vibrate 0.6s ease-in-out 0.3s infinite;
            }
            .splash-wave {
              animation: splash-wave-pulse 1.2s ease-in-out infinite;
              opacity: 0;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
