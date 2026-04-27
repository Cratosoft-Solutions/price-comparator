"use client";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { IoSearchOutline } from "react-icons/io5";
import { setExpandedBar } from "@app/redux/slices/siteNav";
import useScrollDirection from "@hooks/useScrollDirection";
import SiteCategoriesNav from "./SiteCategoriesNav";
import SearchButton from "./SearchButton";
import UserLogin from "./UserLogin";
import CommandPalette from "./CommandPalette";
import MobileBottomNav from "./MobileBottomNav";
import Breadcrumbs from "./Breadcrumbs";
import SmartSuggestions from "./SmartSuggestions";
import { useState, useEffect } from "react";

const Nav = () => {
  const { scrollDirection, isAtTop } = useScrollDirection(20);
  const dispatch = useDispatch();
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  const isCompact = !isAtTop;
  const isHidden = scrollDirection === "down" && !isAtTop;

  const expandSidebar = () => {
    dispatch(setExpandedBar(true));
  };

  return (
    <>
      {/* Unified Sticky Navbar */}
      <motion.header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isCompact
            ? "bg-dark-surface/80 backdrop-blur-xl border-b border-dark-border/50 shadow-lg shadow-black/20"
            : "bg-dark-bg border-b border-transparent"
        }`}
        initial={{ y: 0 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Main Nav Row */}
        <div className={`transition-all duration-300 ${isCompact ? "py-2" : "py-3"} px-4 lg:px-8`}>
          <div className="flex items-center gap-3 lg:gap-6">
            {/* Hamburger (mobile only for sidebar) */}
            <button
              onClick={expandSidebar}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl hover:bg-dark-elevated transition-colors"
              aria-label="Abrir menú"
            >
              <svg className="w-6 h-6 text-dark-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <motion.img
                src="/assets/images/logo.svg"
                className={`transition-all duration-300 brightness-110 ${isCompact ? "h-8 w-20" : "h-10 w-28"}`}
                alt="EncuéntraloFácilCR"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              />
            </Link>

            {/* Categories (desktop) */}
            <div className="hidden lg:flex items-center">
              <SiteCategoriesNav />
            </div>

            {/* Search Bar (desktop) */}
            <div className="hidden lg:flex flex-1 max-w-xl">
              <div className="relative w-full group">
                <SearchButton
                  personalizedClass={`!h-10 border rounded-full border-dark-border shadow-lg shadow-dark-surface/50 transition-all duration-300 group-focus-within:border-accent-primary/50 group-focus-within:shadow-accent-primary/10`}
                />
              </div>
            </div>

            {/* Spotlight Search Trigger (desktop) */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-elevated/50 border border-dark-border/50 text-dark-muted text-xs hover:bg-dark-elevated hover:text-dark-text hover:border-dark-border transition-all duration-200"
              title="Ctrl+K"
            >
              <IoSearchOutline className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Ctrl+K</span>
            </button>

            {/* Search icon (mobile) */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl hover:bg-dark-elevated transition-colors ml-auto"
              aria-label="Buscar"
            >
              <IoSearchOutline className="w-5 h-5 text-dark-text" />
            </button>

            {/* User Login */}
            <UserLogin personalizedClass="hidden lg:flex items-center" />
          </div>
        </div>

        {/* Mobile Search Bar (below main row, only on expanded state) */}
        <AnimatePresence>
          {!isCompact && (
            <motion.div
              className="block lg:hidden px-4 pb-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <SearchButton personalizedClass="!h-12 border rounded-full border-dark-border shadow-lg shadow-dark-surface/50" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Breadcrumbs */}
      <Breadcrumbs />

      {/* Smart Suggestions */}
      <SmartSuggestions />

      {/* Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />

      {/* Mobile Bottom Nav */}
      <MobileBottomNav onSearchClick={() => setCommandPaletteOpen(true)} />
    </>
  );
};

export default Nav;
