"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setConfiguration } from "@app/redux/slices/termsConditions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { genericStorageManagement } from "@utils/functions";
import { motion, AnimatePresence } from "framer-motion";
import { IoShieldCheckmarkOutline, IoSettingsOutline } from "react-icons/io5";
import { MdCookie } from "react-icons/md";

const COOKIE_CATEGORIES = [
  {
    id: "essential",
    label: "Cookies esenciales",
    description: "Necesarias para el funcionamiento del sitio. No se pueden desactivar.",
    required: true,
    defaultEnabled: true,
  },
  {
    id: "analytics",
    label: "Cookies de analítica",
    description: "Nos ayudan a entender cómo usas el sitio para mejorarlo.",
    required: false,
    defaultEnabled: false,
  },
  {
    id: "marketing",
    label: "Cookies de marketing",
    description: "Permiten mostrarte anuncios relevantes en otros sitios.",
    required: false,
    defaultEnabled: false,
  },
];

const Terms = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { userTerms } = useSelector((state) => state.termsConditions);
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);
  const [cookiePrefs, setCookiePrefs] = useState(() => {
    const prefs = {};
    COOKIE_CATEGORIES.forEach((cat) => {
      prefs[cat.id] = cat.defaultEnabled;
    });
    return prefs;
  });

  const saveCookiePreferences = (prefs) => {
    genericStorageManagement("add", "cookie_preferences", JSON.stringify(prefs));
  };

  const loadCookiePreferences = () => {
    const stored = genericStorageManagement("get", "cookie_preferences");
    if (stored.result && stored.value) {
      try {
        return JSON.parse(stored.value);
      } catch {
        return null;
      }
    }
    return null;
  };

  const applyConsentToScripts = (prefs) => {
    if (prefs.analytics) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "consent_granted_analytics" });
    }
    if (prefs.marketing) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "consent_granted_marketing" });
    }
  };

  const setOption = (option) => {
    genericStorageManagement("add", "terms", option);
    switch (option) {
      case 1:
        dispatch(setConfiguration({ userReviewedTerms: true, allCookies: true }));
        break;
      case 2:
        dispatch(setConfiguration({ userReviewedTerms: true, esentialCookies: true }));
        break;
      case 3:
        dispatch(setConfiguration({ userReviewedTerms: false, termsConditions: false }));
        router.push(`/termsrejected?callBackUrl=${pathname}`);
        break;
      default:
        dispatch(setConfiguration({ userReviewedTerms: false }));
        break;
    }
  };

  const handleAcceptAll = () => {
    const allEnabled = {};
    COOKIE_CATEGORIES.forEach((cat) => {
      allEnabled[cat.id] = true;
    });
    setCookiePrefs(allEnabled);
    saveCookiePreferences(allEnabled);
    applyConsentToScripts(allEnabled);
    setOption(1);
  };

  const handleEssentialOnly = () => {
    const essentialOnly = {};
    COOKIE_CATEGORIES.forEach((cat) => {
      essentialOnly[cat.id] = cat.required;
    });
    setCookiePrefs(essentialOnly);
    saveCookiePreferences(essentialOnly);
    applyConsentToScripts(essentialOnly);
    setOption(2);
  };

  const handleSavePreferences = () => {
    saveCookiePreferences(cookiePrefs);
    applyConsentToScripts(cookiePrefs);
    const hasNonEssential = Object.entries(cookiePrefs).some(
      ([key, val]) => key !== "essential" && val
    );
    setOption(hasNonEssential ? 1 : 2);
  };

  const handleReject = () => {
    setOption(3);
  };

  const toggleCookie = (id) => {
    const cat = COOKIE_CATEGORIES.find((c) => c.id === id);
    if (cat?.required) return;
    setCookiePrefs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const termsPreviousAccepted = genericStorageManagement("get", "terms");
    if (termsPreviousAccepted.result && termsPreviousAccepted.value) {
      setOption(Number(termsPreviousAccepted.value));
      const savedPrefs = loadCookiePreferences();
      if (savedPrefs) {
        setCookiePrefs(savedPrefs);
        applyConsentToScripts(savedPrefs);
      }
    } else {
      setOption(99);
    }
  }, []);

  if (userTerms.userReviewedTerms) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 z-[90] p-3 lg:p-4"
      >
        <div className="max-w-4xl mx-auto bg-dark-elevated/95 backdrop-blur-xl border border-dark-border/50 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden">
          {/* Header */}
          <div className="px-5 pt-5 pb-3 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-primary/15 flex items-center justify-center flex-shrink-0">
              <MdCookie className="w-5 h-5 text-accent-glow" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-dark-text font-bold text-base lg:text-lg">
                Tu privacidad es importante
              </h2>
              <p className="text-dark-muted text-sm leading-relaxed mt-1">
                Usamos cookies para mejorar tu experiencia. Puedes aceptar
                todas, solo las esenciales o personalizar tu elección.{" "}
                <Link
                  className="text-accent-glow hover:text-accent-primary transition-colors font-medium"
                  href={`/termsandconditions?callBackUrl=${pathname}`}
                >
                  Ver Términos de Servicio
                </Link>
              </p>
            </div>
          </div>

          {/* Cookie Details (expandable) */}
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-3 space-y-2">
                  {COOKIE_CATEGORIES.map((cat) => (
                    <div
                      key={cat.id}
                      className="flex items-center justify-between gap-3 p-3 rounded-xl bg-dark-surface/60 border border-dark-border/20"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-dark-text text-sm font-medium">
                            {cat.label}
                          </p>
                          {cat.required && (
                            <span className="text-[10px] font-semibold text-accent-glow bg-accent-primary/15 px-1.5 py-0.5 rounded-full uppercase">
                              Requerida
                            </span>
                          )}
                        </div>
                        <p className="text-dark-muted text-xs mt-0.5">
                          {cat.description}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleCookie(cat.id)}
                        disabled={cat.required}
                        className={`relative w-10 h-5 rounded-full transition-all duration-200 flex-shrink-0 ${
                          cookiePrefs[cat.id]
                            ? "bg-accent-primary"
                            : "bg-dark-border"
                        } ${cat.required ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        <motion.div
                          animate={{ x: cookiePrefs[cat.id] ? 20 : 2 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="px-5 pb-4 pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <button
              onClick={() => setShowDetails((prev) => !prev)}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-dark-muted text-sm font-medium hover:bg-dark-surface/60 hover:text-dark-text border border-dark-border/30 transition-all duration-200"
            >
              <IoSettingsOutline className="w-4 h-4" />
              {showDetails ? "Ocultar opciones" : "Personalizar"}
            </button>

            <div className="flex-1" />

            <button
              onClick={handleReject}
              className="px-4 py-2.5 rounded-xl text-dark-muted text-sm font-medium hover:bg-dark-surface/60 hover:text-dark-text transition-all duration-200"
            >
              Rechazar
            </button>

            {showDetails ? (
              <button
                onClick={handleSavePreferences}
                className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary text-white text-sm font-semibold hover:from-accent-secondary hover:to-accent-primary transition-all duration-300 shadow-md shadow-accent-primary/20"
              >
                <IoShieldCheckmarkOutline className="w-4 h-4" />
                Guardar preferencias
              </button>
            ) : (
              <>
                <button
                  onClick={handleEssentialOnly}
                  className="px-4 py-2.5 rounded-xl text-dark-text text-sm font-medium border border-dark-border/50 hover:bg-dark-surface/60 transition-all duration-200"
                >
                  Solo esenciales
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary text-white text-sm font-semibold hover:from-accent-secondary hover:to-accent-primary transition-all duration-300 shadow-md shadow-accent-primary/20"
                >
                  <IoShieldCheckmarkOutline className="w-4 h-4" />
                  Aceptar todas
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Terms;
