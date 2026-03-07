"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right";
type Effect = "fade" | "slide" | "scale" | "blur" | "flip";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  effect?: Effect;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

function getVariants(effect: Effect, direction: Direction): Variants {
  const offsets: Record<Direction, { x: number; y: number }> = {
    up: { x: 0, y: 60 },
    down: { x: 0, y: -60 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 },
  };

  const base = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slide: {
      hidden: { opacity: 0, x: offsets[direction].x, y: offsets[direction].y },
      visible: { opacity: 1, x: 0, y: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.85, y: 30 },
      visible: { opacity: 1, scale: 1, y: 0 },
    },
    blur: {
      hidden: { opacity: 0, filter: "blur(12px)", y: 20 },
      visible: { opacity: 1, filter: "blur(0px)", y: 0 },
    },
    flip: {
      hidden: { opacity: 0, rotateX: 25, y: 40, transformPerspective: 800 },
      visible: { opacity: 1, rotateX: 0, y: 0, transformPerspective: 800 },
    },
  };

  return base[effect];
}

export function ScrollReveal({
  children,
  direction = "up",
  effect = "slide",
  delay = 0,
  duration = 0.6,
  className,
  once = true,
  amount = 0.2,
}: ScrollRevealProps) {
  const variants = getVariants(effect, direction);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}

const containerVariants: Variants = {
  hidden: {},
  visible: (custom: { stagger: number; delay: number }) => ({
    transition: {
      staggerChildren: custom.stagger,
      delayChildren: custom.delay,
    },
  }),
};

export function StaggerContainer({
  children,
  className,
  stagger = 0.08,
  delay = 0,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      custom={{ stagger, delay }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  effect?: "slide-up" | "slide-left" | "slide-right" | "scale" | "blur" | "flip";
}

const itemVariants: Record<string, Variants> = {
  "slide-up": {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] } },
  },
  "slide-left": {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] } },
  },
  "slide-right": {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] } },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, type: "spring", stiffness: 200, damping: 20 } },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(10px)", y: 15 },
    visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] } },
  },
  flip: {
    hidden: { opacity: 0, rotateX: 20, y: 30, transformPerspective: 800 },
    visible: { opacity: 1, rotateX: 0, y: 0, transformPerspective: 800, transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] } },
  },
};

export function StaggerItem({ children, className, effect = "slide-up" }: StaggerItemProps) {
  return (
    <motion.div variants={itemVariants[effect]} className={className}>
      {children}
    </motion.div>
  );
}
