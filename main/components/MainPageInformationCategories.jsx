"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { setCategory } from "@app/redux/slices/siteNav";
import { MdDevices, MdMiscellaneousServices } from "react-icons/md";
import { IoCarSport } from "react-icons/io5";
import { HiHomeModern } from "react-icons/hi2";
import { GoArrowRight } from "react-icons/go";

const BENTO_CATEGORIES = [
  {
    value: "PRODUCT",
    label: "Productos",
    description: "Electrónica, Moda, Hogar, Deportes y más",
    icon: MdDevices,
    image: "/assets/images/product-icon.svg",
    stats: "Más popular",
    isHero: true,
    gradient: "from-accent-primary/10 to-transparent",
  },
  {
    value: "CAR",
    label: "Autos",
    description: "Sedán, SUV, Pick-up y más",
    icon: IoCarSport,
    image: "/assets/images/car-icon.svg",
    stats: "Nuevos y usados",
    isHero: false,
    gradient: "from-blue-500/10 to-transparent",
  },
  {
    value: "HOUSES",
    label: "Casas & Aptos",
    description: "Venta, Alquiler, Lotes",
    icon: HiHomeModern,
    image: "/assets/images/house-icon.svg",
    stats: "Venta y alquiler",
    isHero: false,
    gradient: "from-emerald-500/10 to-transparent",
  },
  {
    value: "SERVICES",
    label: "Servicios",
    description: "Profesionales, Mantenimiento, Turismo y más",
    icon: MdMiscellaneousServices,
    image: "/assets/images/service-icon.svg",
    stats: "Profesionales",
    isHero: false,
    gradient: "from-purple-500/10 to-transparent",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const MainPageInformationCategories = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const onCategoryClick = (categoryValue) => {
    dispatch(setCategory(categoryValue));
    router.push("/");
  };

  return (
    <div className="px-4 lg:px-10 py-4 lg:py-8">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-5 lg:mb-8">
        <h2 className="text-dark-text font-[1000] text-2xl lg:text-3xl">
          Categorías
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-dark-border/50 to-transparent hidden lg:block" />
      </div>

      {/* Bento Grid */}
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 grid-rows-[repeat(2,minmax(0,1fr))] gap-3 lg:gap-4 auto-rows-fr"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {BENTO_CATEGORIES.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.value}
              variants={itemVariants}
              onClick={() => onCategoryClick(cat.value)}
              className={`group relative overflow-hidden rounded-2xl border border-dark-border/30 bg-dark-surface/50 cursor-pointer transition-all duration-300 hover:border-accent-primary/40 hover:shadow-lg hover:shadow-accent-primary/5 ${
                cat.isHero
                  ? "col-span-2 row-span-2 min-h-[240px] lg:min-h-[320px]"
                  : "col-span-1 row-span-1 min-h-[120px] lg:min-h-[150px]"
              }`}
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Icon image */}
              <div
                className={`absolute transition-all duration-500 group-hover:scale-110 ${
                  cat.isHero
                    ? "bottom-4 right-4 lg:bottom-8 lg:right-8 w-28 h-28 lg:w-40 lg:h-40 opacity-15 group-hover:opacity-25"
                    : "bottom-2 right-2 lg:bottom-4 lg:right-4 w-16 h-16 lg:w-20 lg:h-20 opacity-10 group-hover:opacity-20"
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Content */}
              <div
                className={`relative z-10 h-full flex flex-col justify-between ${
                  cat.isHero ? "p-5 lg:p-8" : "p-3 lg:p-5"
                }`}
              >
                <div>
                  {/* Icon + Badge */}
                  <div className="flex items-center justify-between mb-2 lg:mb-3">
                    <div
                      className={`rounded-xl bg-dark-elevated/80 flex items-center justify-center group-hover:bg-accent-primary/20 transition-colors duration-300 ${
                        cat.isHero
                          ? "w-11 h-11 lg:w-14 lg:h-14"
                          : "w-8 h-8 lg:w-10 lg:h-10"
                      }`}
                    >
                      <Icon
                        className={`text-dark-muted group-hover:text-accent-glow transition-colors duration-300 ${
                          cat.isHero
                            ? "w-5 h-5 lg:w-7 lg:h-7"
                            : "w-4 h-4 lg:w-5 lg:h-5"
                        }`}
                      />
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full bg-dark-elevated/60 text-dark-muted font-medium border border-dark-border/20 ${
                        cat.isHero
                          ? "text-[10px] lg:text-xs"
                          : "text-[9px] lg:text-[10px]"
                      }`}
                    >
                      {cat.stats}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-bold text-dark-text group-hover:text-white transition-colors duration-300 ${
                      cat.isHero
                        ? "text-xl lg:text-3xl mb-1 lg:mb-2"
                        : "text-sm lg:text-base mb-0.5 lg:mb-1"
                    }`}
                  >
                    {cat.label}
                  </h3>

                  {/* Description */}
                  <p
                    className={`text-dark-muted leading-relaxed ${
                      cat.isHero
                        ? "text-sm lg:text-base max-w-xs"
                        : "text-xs lg:text-sm hidden lg:block"
                    }`}
                  >
                    {cat.description}
                  </p>
                </div>

                {/* CTA */}
                <div
                  className={`flex items-center gap-1.5 text-dark-muted group-hover:text-accent-glow transition-all duration-300 ${
                    cat.isHero ? "mt-4 lg:mt-6" : "mt-2 lg:mt-3"
                  }`}
                >
                  <span
                    className={`font-semibold ${
                      cat.isHero ? "text-sm lg:text-base" : "text-xs lg:text-sm"
                    }`}
                  >
                    Explorar
                  </span>
                  <GoArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>

              {/* Bottom accent line on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-primary via-accent-glow to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default MainPageInformationCategories;
