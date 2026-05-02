"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdDevices, MdMiscellaneousServices } from "react-icons/md";
import { IoCarSport } from "react-icons/io5";
import { HiHomeModern } from "react-icons/hi2";
import { IoChevronDown } from "react-icons/io5";

const CATEGORY_ICONS = {
  PRODUCT: MdDevices,
  CAR: IoCarSport,
  SERVICES: MdMiscellaneousServices,
  HOUSES: HiHomeModern,
};

const SearchDropDown = ({ values, onSelectValue, currentValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedItem = values.find((v) => v.value === currentValue) || values[0];
  const SelectedIcon = CATEGORY_ICONS[currentValue] || MdDevices;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value) => {
    onSelectValue(value);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative h-full">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 h-full px-3 lg:px-4 rounded-l-full bg-dark-elevated hover:bg-dark-card border-r border-dark-border/30 transition-all duration-200 focus:outline-none group min-w-[120px] lg:min-w-[140px]"
      >
        <div className="w-6 h-6 rounded-md bg-accent-primary/15 flex items-center justify-center flex-shrink-0">
          <SelectedIcon className="w-3.5 h-3.5 text-accent-glow" />
        </div>
        <span className="text-dark-text text-sm font-medium truncate">
          {selectedItem?.label}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 ml-auto"
        >
          <IoChevronDown className="w-3.5 h-3.5 text-dark-muted group-hover:text-dark-text transition-colors" />
        </motion.div>
      </button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-0 mt-1 w-56 bg-dark-elevated border border-dark-border/50 rounded-xl shadow-2xl shadow-black/40 overflow-hidden z-[60]"
          >
            <div className="p-1.5">
              <p className="px-3 py-1.5 text-[10px] font-semibold text-dark-muted uppercase tracking-wider">
                Categoría
              </p>
              {values.map((item) => {
                const Icon = CATEGORY_ICONS[item.value] || MdDevices;
                const isSelected = item.value === currentValue;
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => handleSelect(item.value)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150 ${
                      isSelected
                        ? "bg-accent-primary/15 text-dark-text"
                        : "text-dark-muted hover:bg-dark-card hover:text-dark-text"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-accent-primary/25 text-accent-glow"
                          : "bg-dark-surface text-dark-muted"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-primary"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchDropDown;
