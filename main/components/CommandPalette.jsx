"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { IoSearchOutline } from "react-icons/io5";
import { MdDevices, MdMiscellaneousServices } from "react-icons/md";
import { IoCarSport } from "react-icons/io5";
import { HiHomeModern } from "react-icons/hi2";
import { IoAddSharp } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import { CiCircleList } from "react-icons/ci";
import { FiTrendingUp } from "react-icons/fi";
import { setCategory } from "@app/redux/slices/siteNav";
import Fuse from "fuse.js";

const QUICK_ACTIONS = [
  { id: "home", label: "Ir al inicio", icon: GoHome, type: "action" },
  { id: "publish", label: "Publicar anuncio", icon: IoAddSharp, type: "action" },
  { id: "profile", label: "Mi perfil", icon: CiSettings, type: "action" },
  { id: "listings", label: "Mis anuncios", icon: CiCircleList, type: "action" },
];

const CATEGORY_ITEMS = [
  { id: "PRODUCT", label: "Productos", sublabel: "Electrónica, Moda, Hogar...", icon: MdDevices, type: "category" },
  { id: "CAR", label: "Autos", sublabel: "Sedán, SUV, Pick-up...", icon: IoCarSport, type: "category" },
  { id: "SERVICES", label: "Servicios", sublabel: "Profesionales, Hogar, Ocio...", icon: MdMiscellaneousServices, type: "category" },
  { id: "HOUSES", label: "Casas & Apartamentos", sublabel: "Venta, Alquiler, Lotes...", icon: HiHomeModern, type: "category" },
];

const ALL_SEARCHABLE_ITEMS = [
  ...QUICK_ACTIONS,
  ...CATEGORY_ITEMS,
];

const fuseOptions = {
  keys: ["label", "sublabel"],
  threshold: 0.4,
  includeScore: true,
};

const fuse = new Fuse(ALL_SEARCHABLE_ITEMS, fuseOptions);

const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const filteredResults = query.length > 0
    ? fuse.search(query).map((r) => r.item)
    : [];

  const showCategories = query.length === 0;
  const showActions = query.length === 0;
  const displayItems = query.length > 0
    ? filteredResults
    : [...CATEGORY_ITEMS, ...QUICK_ACTIONS];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    if (!isOpen) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const executeItem = useCallback(
    (item) => {
      onClose();
      if (item.type === "category") {
        dispatch(setCategory(item.id));
        router.push("/");
      } else if (item.type === "action") {
        switch (item.id) {
          case "home":
            router.push("/");
            break;
          case "publish":
            if (session?.user) {
              router.push("/mystore");
            } else {
              signIn();
            }
            break;
          case "profile":
            if (session?.user) {
              router.push("/mystore");
            } else {
              signIn();
            }
            break;
          case "listings":
            if (session?.user) {
              router.push("/mystore");
            } else {
              signIn();
            }
            break;
          default:
            break;
        }
      }
    },
    [dispatch, router, session, onClose]
  );

  const handleSearchSubmit = () => {
    if (query.trim().length > 0) {
      onClose();
      router.push(`/search/results?category=PRODUCT&search=${query}`);
    }
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < displayItems.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : displayItems.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (displayItems[selectedIndex]) {
          executeItem(displayItems[selectedIndex]);
        } else {
          handleSearchSubmit();
        }
        break;
      case "Escape":
        e.preventDefault();
        onClose();
        break;
    }
  };

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Palette */}
          <motion.div
            className="fixed top-[15%] left-1/2 w-[90vw] max-w-xl z-[101] -translate-x-1/2"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="bg-dark-elevated border border-dark-border/50 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-dark-border/30">
                <IoSearchOutline className="w-5 h-5 text-dark-muted flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Buscar productos, categorías, acciones..."
                  className="flex-1 bg-transparent text-dark-text placeholder-dark-muted outline-none text-base"
                  autoComplete="off"
                />
                <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 rounded bg-dark-surface text-dark-muted text-xs border border-dark-border/50">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-[50vh] overflow-y-auto py-2">
                {query.length > 0 && filteredResults.length === 0 && (
                  <div className="px-5 py-8 text-center">
                    <p className="text-dark-muted text-sm">
                      No se encontraron resultados para &quot;{query}&quot;
                    </p>
                    <button
                      onClick={handleSearchSubmit}
                      className="mt-3 text-sm text-accent-glow hover:text-accent-primary transition-colors"
                    >
                      Buscar &quot;{query}&quot; en productos →
                    </button>
                  </div>
                )}

                {/* Categories Section */}
                {showCategories && (
                  <div className="px-3 py-1">
                    <p className="px-2 py-1.5 text-xs font-semibold text-dark-muted uppercase tracking-wider">
                      Categorías
                    </p>
                    {CATEGORY_ITEMS.map((item, idx) => {
                      const Icon = item.icon;
                      const isSelected = selectedIndex === idx;
                      return (
                        <button
                          key={item.id}
                          onClick={() => executeItem(item)}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 ${
                            isSelected
                              ? "bg-dark-card text-dark-text"
                              : "text-dark-muted hover:bg-dark-card/50"
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isSelected ? "bg-accent-primary/20 text-accent-glow" : "bg-dark-surface text-dark-muted"
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{item.label}</p>
                            <p className="text-xs text-dark-muted truncate">{item.sublabel}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Quick Actions Section */}
                {showActions && (
                  <div className="px-3 py-1 border-t border-dark-border/20">
                    <p className="px-2 py-1.5 text-xs font-semibold text-dark-muted uppercase tracking-wider">
                      Acciones rápidas
                    </p>
                    {QUICK_ACTIONS.map((item, idx) => {
                      const Icon = item.icon;
                      const globalIdx = CATEGORY_ITEMS.length + idx;
                      const isSelected = selectedIndex === globalIdx;
                      return (
                        <button
                          key={item.id}
                          onClick={() => executeItem(item)}
                          onMouseEnter={() => setSelectedIndex(globalIdx)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 ${
                            isSelected
                              ? "bg-dark-card text-dark-text"
                              : "text-dark-muted hover:bg-dark-card/50"
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isSelected ? "bg-accent-primary/20 text-accent-glow" : "bg-dark-surface text-dark-muted"
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-medium">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Filtered Results */}
                {query.length > 0 && filteredResults.length > 0 && (
                  <div className="px-3 py-1">
                    <p className="px-2 py-1.5 text-xs font-semibold text-dark-muted uppercase tracking-wider">
                      Resultados
                    </p>
                    {filteredResults.map((item, idx) => {
                      const Icon = item.icon;
                      const isSelected = selectedIndex === idx;
                      return (
                        <button
                          key={item.id}
                          onClick={() => executeItem(item)}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 ${
                            isSelected
                              ? "bg-dark-card text-dark-text"
                              : "text-dark-muted hover:bg-dark-card/50"
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isSelected ? "bg-accent-primary/20 text-accent-glow" : "bg-dark-surface text-dark-muted"
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{item.label}</p>
                            {item.sublabel && (
                              <p className="text-xs text-dark-muted truncate">{item.sublabel}</p>
                            )}
                          </div>
                        </button>
                      );
                    })}

                    {/* Search fallback */}
                    <button
                      onClick={handleSearchSubmit}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-dark-muted hover:bg-dark-card/50 transition-all duration-150 mt-1 border-t border-dark-border/20 pt-3"
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-dark-surface text-dark-muted">
                        <FiTrendingUp className="w-4 h-4" />
                      </div>
                      <span className="text-sm">
                        Buscar &quot;{query}&quot; en productos →
                      </span>
                    </button>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-5 py-3 border-t border-dark-border/30 flex items-center justify-between text-xs text-dark-muted">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-dark-surface border border-dark-border/50 text-[10px]">↑↓</kbd>
                    navegar
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-dark-surface border border-dark-border/50 text-[10px]">↵</kbd>
                    seleccionar
                  </span>
                </div>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-dark-surface border border-dark-border/50 text-[10px]">Ctrl K</kbd>
                  abrir/cerrar
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
