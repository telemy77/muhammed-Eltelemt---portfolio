"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  label: string;
}

export function AnimatedCounter({ value, suffix = "", label }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold font-playfair mb-2">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="gradient-text"
        >
          {isInView ? (
            <CountUp target={value} duration={2000} />
          ) : (
            "0"
          )}
          {suffix}
        </motion.span>
      </div>
      <p className="text-slate-400 text-sm">{label}</p>
    </div>
  );
}

function CountUp({ target, duration }: { target: number; duration: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  // Use a simple approach with CSS counter animation
  // We'll use requestAnimationFrame for smooth counting
  const startTime = useRef<number | null>(null);

  if (typeof window !== "undefined") {
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = Math.min((timestamp - startTime.current) / duration, 1);
      const current = Math.floor(progress * target);
      if (ref.current) {
        ref.current.textContent = current.toString();
      }
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else if (ref.current) {
        ref.current.textContent = target.toString();
      }
    };
    requestAnimationFrame(animate);
  }

  return <span ref={ref}>0</span>;
}
