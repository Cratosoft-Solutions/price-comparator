"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCloseOutline } from "react-icons/io5";
import { MdDevices, MdMiscellaneousServices } from "react-icons/md";
import { IoCarSport } from "react-icons/io5";
import { HiHomeModern } from "react-icons/hi2";
import UserSession from './UserSession';
import SiteCategories from './SiteCategories';
import SiteMission from './SiteMission';

const CATEGORY_ICONS = {
  Productos: MdDevices,
  Autos: IoCarSport,
  Servicios: MdMiscellaneousServices,
  "Casas & Apartamentos": HiHomeModern,
};

const VerticalNav = ({showNav, expandCollapseOptionsBar, principalOption, secondaryOptions, onSelectedButton}) => {
  const [selectedOption, setSelectedOption] = useState(2);

  const setInternalSelectedOption = (option) => {
    if (option === selectedOption) {
      setSelectedOption(0);
    } else {
      setSelectedOption(option);
    }
  }

  return (
    <AnimatePresence>
      {showNav && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => expandCollapseOptionsBar(false)}
          />

          {/* Sidebar Panel */}
          <motion.div
            className="fixed top-0 left-0 z-[70] w-full lg:w-80 h-full bg-dark-surface shadow-2xl shadow-black/50 border-r border-dark-border/50 overflow-y-auto"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Close Button */}
            <button
              onClick={() => expandCollapseOptionsBar(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-xl flex items-center justify-center hover:bg-dark-elevated transition-colors z-10"
            >
              <IoCloseOutline className="h-6 w-6 text-dark-text" />
            </button>

            {/* User Session */}
            <div className="bg-dark-elevated/50 border-b border-dark-border/30">
              <UserSession />
            </div>

            {/* Accordion Sections */}
            <div className="py-2">
              {/* Categorias */}
              <div className="border-b border-dark-border/20">
                <button
                  onClick={() => setInternalSelectedOption(1)}
                  className="flex items-center justify-between w-full px-5 py-4 font-medium text-dark-text hover:bg-dark-card/50 transition-colors"
                >
                  <span className="font-bold text-dark-text">Categorías</span>
                  <motion.svg
                    className="w-4 h-4 text-dark-muted"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    animate={{ rotate: selectedOption === 1 ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {selectedOption === 1 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-4 grid grid-cols-1 gap-3">
                        <SiteCategories />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Más opciones */}
              <div className="border-b border-dark-border/20">
                <button
                  onClick={() => setInternalSelectedOption(2)}
                  className="flex items-center justify-between w-full px-5 py-4 font-medium text-dark-text hover:bg-dark-card/50 transition-colors"
                >
                  <span className="font-bold text-dark-text">Más opciones para vos</span>
                  <motion.svg
                    className="w-4 h-4 text-dark-muted"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    animate={{ rotate: selectedOption === 2 ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {selectedOption === 2 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-4 space-y-1">
                        <button
                          onClick={() => {
                            onSelectedButton(principalOption.btnNAVPage, principalOption.btnID);
                            expandCollapseOptionsBar(false);
                          }}
                          className="w-full text-left px-3 py-2.5 rounded-xl text-dark-text hover:bg-dark-card/50 hover:text-accent-glow transition-all duration-200 text-sm"
                        >
                          {principalOption.btnDescription}
                        </button>
                        {secondaryOptions.map((filteredOption, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              onSelectedButton(filteredOption.btnNAVPage, filteredOption.btnID);
                              expandCollapseOptionsBar(false);
                            }}
                            className="w-full text-left px-3 py-2.5 rounded-xl text-dark-text hover:bg-dark-card/50 hover:text-accent-glow transition-all duration-200 text-sm"
                          >
                            {filteredOption.btnDescription}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Acerca de nosotros */}
              <div className="border-b border-dark-border/20">
                <button
                  onClick={() => setInternalSelectedOption(3)}
                  className="flex items-center justify-between w-full px-5 py-4 font-medium text-dark-text hover:bg-dark-card/50 transition-colors"
                >
                  <span className="font-bold text-dark-text">Acerca de nosotros</span>
                  <motion.svg
                    className="w-4 h-4 text-dark-muted"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    animate={{ rotate: selectedOption === 3 ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {selectedOption === 3 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-4 text-dark-muted text-sm">
                        <SiteMission />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 w-full p-4 border-t border-dark-border/20">
              <span className="text-dark-muted text-xs flex justify-center text-center w-full">
                @2024-2025 encuentralofacilcr.com / Todos los derechos reservados
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default VerticalNav
