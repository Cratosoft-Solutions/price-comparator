"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SearchButton from "./SearchButton";
import { MdDevices, MdMiscellaneousServices } from "react-icons/md";
import { IoCarSport } from "react-icons/io5";
import { HiHomeModern } from "react-icons/hi2";
import { GoArrowRight, GoSearch } from "react-icons/go";
import { useDispatch } from "react-redux";
import { setCategory } from "@app/redux/slices/siteNav";

const HERO_STATS = [
  { label: "Productos", value: "1,200+", icon: MdDevices },
  { label: "Tiendas", value: "500+", icon: IoCarSport },
  { label: "Categorías", value: "4", icon: HiHomeModern },
  { label: "Gratis", value: "100%", icon: MdMiscellaneousServices },
];

const QUICK_CATEGORIES = [
  { label: "Productos", value: "PRODUCT", icon: MdDevices },
  { label: "Autos", value: "CAR", icon: IoCarSport },
  { label: "Casas", value: "HOUSES", icon: HiHomeModern },
  { label: "Servicios", value: "SERVICES", icon: MdMiscellaneousServices },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const HeroSection = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const onCategoryClick = (categoryValue) => {
    dispatch(setCategory(categoryValue));
    router.push("/");
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-accent-glow/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-primary/3 rounded-full blur-[100px]" />
      </div>

      <motion.div
        className="relative px-4 lg:px-10 py-8 lg:py-14"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-4 lg:gap-6">
          {/* Left Column — Headline + Search */}
          <div className="flex flex-col gap-4 lg:gap-6">
            {/* Headline Card */}
            <motion.div
              variants={itemVariants}
              className="rounded-2xl border border-dark-border/30 bg-dark-surface/40 backdrop-blur-sm p-6 lg:p-10"
            >
              <h1 className="text-dark-text font-[1000] text-3xl lg:text-5xl xl:text-6xl leading-tight mb-3 lg:mb-4">
                Encuentra lo que buscas{" "}
                <span className="bg-gradient-to-r from-accent-primary via-accent-glow to-accent-primary bg-clip-text text-transparent">
                  en Costa Rica
                </span>
              </h1>
              <p className="text-dark-muted text-base lg:text-lg max-w-xl mb-6 lg:mb-8 leading-relaxed">
                Productos, autos, casas y servicios. Compara precios, contacta
                vendedores directamente y publica gratis.
              </p>

              {/* Search */}
              <div className="w-full max-w-xl">
                <SearchButton personalizedClass="!h-12 lg:!h-14" />
              </div>

              {/* Quick Category Chips */}
              <div className="flex flex-wrap gap-2 mt-4 lg:mt-5">
                {QUICK_CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.value}
                      onClick={() => onCategoryClick(cat.value)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-dark-border/30 bg-dark-elevated/40 text-dark-muted text-xs lg:text-sm font-medium hover:border-accent-primary/40 hover:text-accent-glow hover:bg-accent-primary/10 transition-all duration-300"
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* CTAs Row */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4"
            >
              {/* Publish CTA */}
              <Link
                href="/create/item?type=product"
                className="group relative rounded-2xl border border-accent-primary/30 bg-gradient-to-br from-accent-primary/15 to-accent-secondary/10 backdrop-blur-sm p-5 lg:p-6 flex flex-col justify-between overflow-hidden hover:border-accent-primary/50 hover:shadow-lg hover:shadow-accent-primary/10 transition-all duration-300"
              >
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent-primary/10 rounded-full blur-2xl group-hover:bg-accent-primary/20 transition-all duration-500" />
                <div>
                  <div className="w-10 h-10 rounded-xl bg-accent-primary/20 flex items-center justify-center mb-3">
                    <GoArrowRight className="w-5 h-5 text-accent-glow" />
                  </div>
                  <h3 className="text-dark-text font-bold text-lg lg:text-xl mb-1">
                    Publicar mi anuncio
                  </h3>
                  <p className="text-dark-muted text-sm">
                    Gratis, fácil y sin intermediarios
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-accent-glow text-sm font-semibold mt-3 group-hover:gap-2.5 transition-all duration-300">
                  <span>Comenzar</span>
                  <GoArrowRight className="w-4 h-4" />
                </div>
              </Link>

              {/* Explore CTA */}
              <button
                onClick={() => router.push("/search/results?category=PRODUCT&search=")}
                className="group relative rounded-2xl border border-dark-border/30 bg-dark-surface/40 backdrop-blur-sm p-5 lg:p-6 flex flex-col justify-between overflow-hidden hover:border-accent-primary/40 hover:shadow-lg hover:shadow-accent-primary/5 transition-all duration-300 text-left"
              >
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all duration-500" />
                <div>
                  <div className="w-10 h-10 rounded-xl bg-dark-elevated/80 flex items-center justify-center mb-3 group-hover:bg-accent-primary/20 transition-colors duration-300">
                    <GoSearch className="w-5 h-5 text-dark-muted group-hover:text-accent-glow transition-colors duration-300" />
                  </div>
                  <h3 className="text-dark-text font-bold text-lg lg:text-xl mb-1">
                    Explorar todo
                  </h3>
                  <p className="text-dark-muted text-sm">
                    Descubre miles de publicaciones
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-dark-muted group-hover:text-accent-glow text-sm font-semibold mt-3 group-hover:gap-2.5 transition-all duration-300">
                  <span>Ver todo</span>
                  <GoArrowRight className="w-4 h-4" />
                </div>
              </button>
            </motion.div>
          </div>

          {/* Right Column — Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 lg:grid-cols-1 gap-3 lg:gap-4"
          >
            {HERO_STATS.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="group rounded-2xl border border-dark-border/30 bg-dark-surface/40 backdrop-blur-sm p-4 lg:p-5 flex items-center gap-4 hover:border-accent-primary/30 hover:bg-dark-surface/60 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-dark-elevated/60 flex items-center justify-center shrink-0 group-hover:bg-accent-primary/20 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-dark-muted group-hover:text-accent-glow transition-colors duration-300" />
                  </div>
                  <div>
                    <div className="text-dark-text font-bold text-xl lg:text-2xl">
                      {stat.value}
                    </div>
                    <div className="text-dark-muted text-xs lg:text-sm">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
