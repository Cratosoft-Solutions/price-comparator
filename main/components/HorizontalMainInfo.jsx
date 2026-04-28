"use client";
import React from "react";
import { motion } from "framer-motion";
import { MAIN_PAGE_INFO_CARD } from "@utils/constants";
import { GoArrowRight } from "react-icons/go";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const HorizontalMainInfo = () => {
  return (
    <div className="relative overflow-hidden px-4 lg:px-10 py-6 lg:py-10">
      {/* Background decorative blurs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-accent-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent-glow/5 rounded-full blur-3xl" />
      </div>

      {/* Section Header */}
      <div className="relative flex items-center gap-3 mb-5 lg:mb-8">
        <h2 className="text-dark-text font-[1000] text-2xl lg:text-3xl">
          ¿Beneficios?
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-dark-border/50 to-transparent hidden lg:block" />
      </div>

      {/* Bento Cards Grid */}
      <motion.div
        className="relative grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {MAIN_PAGE_INFO_CARD.map((element, index) => {
          const Icon = element.icon;
          return (
            <motion.div
              key={`benefit-${index}`}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl border border-dark-border/30 bg-dark-surface/40 backdrop-blur-sm p-5 lg:p-7 hover:border-accent-primary/40 hover:shadow-lg hover:shadow-accent-primary/5 transition-all duration-300"
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Decorative blur */}
              <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-accent-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                {/* Icon + Badge row */}
                <div className="flex items-center justify-between mb-4 lg:mb-5">
                  <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-xl bg-dark-elevated/80 flex items-center justify-center group-hover:bg-accent-primary/20 transition-colors duration-300">
                    <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-dark-muted group-hover:text-accent-glow transition-colors duration-300" />
                  </div>
                  <span className="text-[10px] lg:text-xs px-2 py-0.5 rounded-full bg-dark-elevated/60 text-dark-muted font-medium border border-dark-border/20">
                    Beneficio {index + 1}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-dark-text font-bold text-lg lg:text-xl mb-2 group-hover:text-white transition-colors duration-300">
                  {element.title}
                </h3>

                {/* Description */}
                <p className="text-dark-muted text-sm lg:text-base leading-relaxed mb-4">
                  {element.description}
                </p>

                {/* CTA hint */}
                <div className="flex items-center gap-1.5 text-dark-muted group-hover:text-accent-glow text-xs lg:text-sm font-semibold transition-all duration-300 group-hover:gap-2.5">
                  <span>Saber más</span>
                  <GoArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-primary via-accent-glow to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default HorizontalMainInfo;
