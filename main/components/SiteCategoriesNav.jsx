"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "@app/redux/slices/siteNav";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MEGA_MENU_DATA } from "@utils/constants";
import { MdDevices, MdMiscellaneousServices } from "react-icons/md";
import { IoCarSport } from "react-icons/io5";
import { HiHomeModern } from "react-icons/hi2";

const CATEGORY_ICONS = {
  PRODUCT: MdDevices,
  CAR: IoCarSport,
  SERVICES: MdMiscellaneousServices,
  HOUSES: HiHomeModern,
};

const CATEGORIES = [
  { value: "PRODUCT", label: "Productos" },
  { value: "CAR", label: "Autos" },
  { value: "SERVICES", label: "Servicios" },
  { value: "HOUSES", label: "Casas" },
];

const SiteCategoriesNav = () => {
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.siteNav);
  const router = useRouter();
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  const onSelectedCategory = (categoryToSet) => {
    dispatch(setCategory(categoryToSet));
    router.push("/");
    setMegaMenuOpen(false);
    setHoveredCategory(null);
  };

  const onCategoryHover = (cat) => {
    setHoveredCategory(cat);
    setMegaMenuOpen(true);
  };

  const onCategoryLeave = () => {
    setMegaMenuOpen(false);
    setHoveredCategory(null);
  };

  const onSubcategoryClick = (parentCategory, subcategoryItem) => {
    dispatch(setCategory(parentCategory));
    router.push(`/search/results?category=${parentCategory}&search=${subcategoryItem}`);
    setMegaMenuOpen(false);
    setHoveredCategory(null);
  };

  return (
    <div className="relative" onMouseLeave={onCategoryLeave}>
      <nav className="flex items-center gap-1">
        {CATEGORIES.map((cat) => {
          const Icon = CATEGORY_ICONS[cat.value];
          const isActive = category === cat.value;

          return (
            <button
              key={cat.value}
              onClick={() => onSelectedCategory(cat.value)}
              onMouseEnter={() => onCategoryHover(cat.value)}
              className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "text-accent-glow"
                  : "text-dark-muted hover:text-dark-text hover:bg-dark-elevated/50"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{cat.label}</span>

              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-accent-primary to-accent-glow rounded-full"
                  layoutId="activeCategory"
                  layout="position"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Mega Menu Dropdown */}
      <AnimatePresence>
        {megaMenuOpen && hoveredCategory && MEGA_MENU_DATA[hoveredCategory] && (
          <motion.div
            className="absolute top-full left-0 mt-2 w-[600px] xl:w-[750px] bg-dark-elevated/95 backdrop-blur-xl border border-dark-border/50 rounded-2xl shadow-2xl shadow-black/30 overflow-hidden z-50"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onMouseEnter={() => setMegaMenuOpen(true)}
            onMouseLeave={onCategoryLeave}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-dark-border/30">
                {(() => {
                  const Icon = CATEGORY_ICONS[hoveredCategory];
                  return <Icon className="w-5 h-5 text-accent-glow" />;
                })()}
                <h3 className="text-lg font-bold text-dark-text">
                  {MEGA_MENU_DATA[hoveredCategory].label}
                </h3>
              </div>

              {/* Subcategories Grid */}
              <div className="grid grid-cols-3 xl:grid-cols-4 gap-6">
                {MEGA_MENU_DATA[hoveredCategory].subcategories.map(
                  (subcategory, idx) => (
                    <div key={idx}>
                      <h4 className="text-sm font-bold text-accent-glow/80 mb-2">
                        {subcategory.label}
                      </h4>
                      <ul className="space-y-1">
                        {subcategory.items.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <button
                              onClick={() =>
                                onSubcategoryClick(hoveredCategory, item)
                              }
                              className="w-full text-left text-sm text-dark-muted hover:text-dark-text hover:pl-1 transition-all duration-150"
                            >
                              {item}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Bottom gradient accent */}
            <div className="h-0.5 bg-gradient-to-r from-accent-primary via-accent-glow to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SiteCategoriesNav;
