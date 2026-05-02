"use client";
import { motion } from "framer-motion";

export default function Loading({ message }) {
  const defaultMessage = "¡Preparándolo para ti!";
  const displayMessage = message || defaultMessage;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-bg/95 backdrop-blur-sm">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent-glow/5 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Logo + Spinner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative flex flex-col items-center gap-6"
      >
        {/* Animated ring around logo */}
        <div className="relative">
          <motion.div
            className="absolute inset-0 w-20 h-20 rounded-full border-2 border-transparent border-t-accent-primary border-r-accent-glow"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-0 w-20 h-20 rounded-full border-2 border-transparent border-b-accent-primary/30 border-l-accent-glow/30"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <div className="w-20 h-20 rounded-full bg-dark-surface/60 backdrop-blur-sm border border-dark-border/30 flex items-center justify-center">
            <img
              src="/assets/images/logo-mb.svg"
              className="h-10 w-10"
              alt="EncuéntraloFácilCR"
            />
          </div>
        </div>

        {/* Loading text */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-dark-text font-semibold text-sm lg:text-base">
            {displayMessage}
          </p>
          {/* Animated dots */}
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-accent-primary"
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
