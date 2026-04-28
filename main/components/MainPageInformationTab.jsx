"use client";
import React from "react";
import { motion } from "framer-motion";
import BTNPublish from "./BTNPublish";
import SearchButton from "./SearchButton";
import { GoArrowRight } from "react-icons/go";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const MainPageInformationTab = ({ propertiesToBeRendered }) => {
  const isPublish = propertiesToBeRendered.btn === "PUBLISH";

  const renderCTA = () => {
    switch (propertiesToBeRendered.btn) {
      case "PUBLISH":
        return <BTNPublish />;
      case "SEARCH":
        return <SearchButton personalizedClass="!h-12 lg:!h-14" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative overflow-hidden px-4 lg:px-10 py-6 lg:py-10">
      {/* Background decorative blurs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl ${
            isPublish ? "bg-accent-primary/5" : "bg-accent-glow/5"
          }`}
        />
        <div
          className={`absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-3xl ${
            isPublish ? "bg-accent-glow/5" : "bg-accent-primary/5"
          }`}
        />
      </div>

      <motion.div
        className="relative grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-4 lg:gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Left — Content Card */}
        <motion.div
          variants={itemVariants}
          className={`rounded-2xl border backdrop-blur-sm p-6 lg:p-10 flex flex-col justify-center ${
            isPublish
              ? "border-accent-primary/30 bg-gradient-to-br from-accent-primary/10 to-dark-surface/60"
              : "border-dark-border/30 bg-dark-surface/40"
          }`}
        >
          {/* Section label */}
          <div className="flex items-center gap-2 mb-4 lg:mb-5">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isPublish ? "bg-accent-primary/20" : "bg-dark-elevated/80"
              }`}
            >
              <GoArrowRight
                className={`w-4 h-4 ${
                  isPublish ? "text-accent-glow" : "text-dark-muted"
                }`}
              />
            </div>
            <span className="text-dark-muted text-xs lg:text-sm font-medium px-2 py-0.5 rounded-full bg-dark-elevated/60 border border-dark-border/20">
              {isPublish ? "Publicar" : "Buscar"}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-dark-text font-[1000] text-2xl lg:text-4xl xl:text-5xl leading-tight mb-2 lg:mb-3">
            {propertiesToBeRendered.title}{" "}
            <span className="bg-gradient-to-r from-accent-primary via-accent-glow to-accent-primary bg-clip-text text-transparent">
              {propertiesToBeRendered.subTitle}
            </span>
          </h2>

          {/* Description */}
          <p className="text-dark-muted text-sm lg:text-base max-w-xl leading-relaxed mb-6 lg:mb-8">
            {propertiesToBeRendered.bodyDescription}
          </p>

          {/* CTA */}
          <div className="w-full max-w-xl">{renderCTA()}</div>
        </motion.div>

        {/* Right — Image Card */}
        <motion.div
          variants={itemVariants}
          className="hidden lg:flex rounded-2xl border border-dark-border/30 bg-dark-surface/40 backdrop-blur-sm items-center justify-center p-6 lg:p-8 overflow-hidden group hover:border-accent-primary/30 transition-all duration-300"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Decorative glow behind image */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className={`w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  isPublish ? "bg-accent-primary/10" : "bg-accent-glow/10"
                }`}
              />
            </div>
            <img
              className="relative z-10 w-3/4 h-auto object-contain transition-transform duration-500 group-hover:scale-105"
              src={propertiesToBeRendered.image}
              alt={propertiesToBeRendered.title}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MainPageInformationTab;
