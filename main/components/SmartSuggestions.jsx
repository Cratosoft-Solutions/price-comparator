"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { setCategory } from "@app/redux/slices/siteNav";
import { FiTrendingUp } from "react-icons/fi";

const TRENDING_TAGS = [
  { label: "iPhone", category: "PRODUCT" },
  { label: "Toyota", category: "CAR" },
  { label: "Alquiler San José", category: "HOUSES" },
  { label: "PlayStation", category: "PRODUCT" },
  { label: "Hyundai Tucson", category: "CAR" },
  { label: "Informáticos", category: "SERVICES" },
  { label: "Air Fryer", category: "PRODUCT" },
  { label: "Apartamento Heredia", category: "HOUSES" },
];

const SmartSuggestions = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  if (pathname !== "/") return null;

  const onTagClick = (tag) => {
    dispatch(setCategory(tag.category));
    router.push(`/search/results?category=${tag.category}&search=${tag.label}`);
  };

  return (
    <motion.div
      className="hidden lg:block px-8 py-3 bg-dark-bg"
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.3 }}
    >
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 text-dark-muted flex-shrink-0">
          <FiTrendingUp className="w-3.5 h-3.5 text-accent-glow" />
          <span className="text-xs font-semibold uppercase tracking-wider">Trending</span>
        </div>
        <div className="w-px h-4 bg-dark-border/50 flex-shrink-0" />
        <div className="flex items-center gap-2">
          {TRENDING_TAGS.map((tag, idx) => (
            <motion.button
              key={idx}
              onClick={() => onTagClick(tag)}
              className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium bg-dark-surface border border-dark-border/30 text-dark-muted hover:text-dark-text hover:border-accent-primary/30 hover:bg-dark-elevated transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tag.label}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SmartSuggestions;
