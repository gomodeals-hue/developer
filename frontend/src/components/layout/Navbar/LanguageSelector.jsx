import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown, Check, Sparkles } from "lucide-react";
import { useShop } from "../../../context/ShopContext";

// Crisp vector SVG flags that render consistently on all operating systems (Windows, Mac, Linux, Mobile)
const FlagUK = ({ className = "w-4.5 h-3 rounded-xs shrink-0 border border-stone-200/50" }) => (
  <svg className={className} viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <clipPath id="lang-uk-clip">
      <path d="M0 0h60v30H0z"/>
    </clipPath>
    <g clipPath="url(#lang-uk-clip)">
      <path d="M0 0h60v30H0z" fill="#012169"/>
      <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6"/>
      <path d="M0 0l60 30m0-30L0 30" stroke="#C8102E" strokeWidth="4"/>
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/>
      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6"/>
    </g>
  </svg>
);

const FlagFR = ({ className = "w-4.5 h-3 rounded-xs shrink-0 border border-stone-200/50" }) => (
  <svg className={className} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
    <rect width="1" height="2" fill="#002395" />
    <rect x="1" width="1" height="2" fill="#ffffff" />
    <rect x="2" width="1" height="2" fill="#ED2939" />
  </svg>
);

const FlagDE = ({ className = "w-4.5 h-3 rounded-xs shrink-0 border border-stone-200/50" }) => (
  <svg className={className} viewBox="0 0 5 3" xmlns="http://www.w3.org/2000/svg">
    <rect width="5" height="1" fill="#000000" />
    <rect y="1" width="5" height="1" fill="#DD0000" />
    <rect y="2" width="5" height="1" fill="#FFCE00" />
  </svg>
);

const LanguageFlag = ({ code, className }) => {
  if (code === "FR") return <FlagFR className={className} />;
  if (code === "DE") return <FlagDE className={className} />;
  return <FlagUK className={className} />;
};

/**
 * LanguageSelector component
 * Provides instant language switching between English (EN), French (FR), and German (DE).
 * Designed to sit prominently at the right corner of the navbar with perfect horizontal baseline alignment.
 */
const LanguageSelector = ({ isTransparent = false, isMobile = false }) => {
  const { language, changeLanguage, supportedLanguages, t } = useShop();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // The 3 primary requested languages
  const coreLanguages = [
    {
      code: "EN",
      name: "English",
      nativeName: "English",
      flagCode: "GB",
      sub: "Default",
    },
    {
      code: "FR",
      name: "French",
      nativeName: "Français",
      flagCode: "FR",
      sub: "Français",
    },
    {
      code: "DE",
      name: "German",
      nativeName: "Deutsch",
      flagCode: "DE",
      sub: "Deutsch",
    },
  ];

  const currentLang =
    coreLanguages.find((l) => l.code === (language || "EN").toUpperCase()) ||
    coreLanguages[0];

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelectLanguage = (code) => {
    changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left select-none">
      {/* Trigger Button - Strictly aligned on the same horizontal centerline */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select website language"
        aria-expanded={isOpen}
        title={t("select_language", "Select Language")}
        className={`inline-flex items-center justify-center gap-1.5 h-9 sm:h-9.5 px-2.5 sm:px-3 rounded-full transition-all duration-150 cursor-pointer font-bold text-xs tracking-wide shadow-2xs leading-none select-none ${
          isMobile
            ? "h-9 px-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200"
            : isTransparent
              ? "bg-white/15 hover:bg-white/25 backdrop-blur-md text-white border border-white/30 hover:border-white/50"
              : "bg-stone-50 hover:bg-stone-100 text-stone-700 hover:text-stone-900 border border-stone-200/80 hover:border-orange-300"
        }`}
      >
        {/* Country Flag (Crisp SVG, horizontally synced) */}
        <span className="inline-flex items-center justify-center shrink-0">
          <LanguageFlag
            code={currentLang.code}
            className="w-4.5 h-3 rounded-xs shrink-0 shadow-2xs border border-stone-200/50"
          />
        </span>

        {/* Language Code / Name - exact baseline sync */}
        <span className="font-extrabold uppercase text-xs tracking-wider leading-none text-stone-900 flex items-center">
          {currentLang.code}
        </span>

        {/* Small Animated Chevron - exact baseline sync */}
        <span className="inline-flex items-center justify-center shrink-0">
          <ChevronDown
            size={12}
            className={`transition-transform duration-200 ${
              isOpen ? "rotate-180 text-orange-500" : isTransparent ? "text-white/70" : "text-stone-400"
            }`}
          />
        </span>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-64 bg-white text-stone-900 rounded-2xl shadow-[0_20px_48px_rgba(0,0,0,0.16)] border border-stone-100 p-2 z-[999] overflow-hidden"
          >
            {/* Header */}
            <div className="px-3 py-2 border-b border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-orange-600">
                <Globe size={14} />
                <span className="text-[11px] font-black uppercase tracking-wider text-stone-900">
                  {t("website_language", "Language")}
                </span>
              </div>
              <span className="text-[10px] font-semibold text-stone-400">
                3 {t("all", "Supported")}
              </span>
            </div>

            {/* Language Options List */}
            <div className="py-1 space-y-1">
              {coreLanguages.map((langItem) => {
                const isActive = (language || "EN").toUpperCase() === langItem.code;
                return (
                  <button
                    key={langItem.code}
                    type="button"
                    onClick={() => handleSelectLanguage(langItem.code)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-150 cursor-pointer text-left ${
                      isActive
                        ? "bg-orange-50/90 text-orange-700 font-bold border border-orange-200/80 shadow-2xs"
                        : "text-stone-700 hover:bg-stone-50 hover:text-stone-950 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="inline-flex items-center justify-center shrink-0 shadow-2xs">
                        <LanguageFlag
                          code={langItem.code}
                          className="w-5 h-3.5 rounded-xs shrink-0 border border-stone-200/60"
                        />
                      </span>
                      <div>
                        <div className="text-xs font-bold leading-tight">
                          {langItem.nativeName}
                        </div>
                        <div className="text-[10px] text-stone-400 font-medium">
                          {langItem.name} ({langItem.code})
                        </div>
                      </div>
                    </div>

                    {isActive && (
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-orange-600 text-white shrink-0 shadow-xs">
                        <Check size={11} strokeWidth={3} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom Instant Translation Note */}
            <div className="px-3 py-2 bg-stone-50/80 rounded-xl mt-1 border border-stone-100 flex items-center gap-2 text-[10px] text-stone-500 font-medium">
              <Sparkles size={12} className="text-amber-500 shrink-0" />
              <span>{t("language_instant_hint", "Translates entire website instantly")}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
