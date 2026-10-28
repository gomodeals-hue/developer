import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coins, ChevronDown, Check, Sparkles } from "lucide-react";
import { useShop } from "../../../context/ShopContext";

// Flag emoji map for country codes
const FLAG_MAP = {
  IN: "🇮🇳",
  US: "🇺🇸",
  GB: "🇬🇧",
  EU: "🇪🇺",
  CA: "🇨🇦",
  AU: "🇦🇺",
  JP: "🇯🇵",
  AE: "🇦🇪",
};

/**
 * CurrencySelector component
 * Prominently placed aside the homepage search bar.
 * Allows users to switch between INR (₹), USD ($), EUR (€), GBP (£), CAD, AUD, JPY, and AED
 * with live exchange rates and instant storewide price conversion.
 */
const CurrencySelector = ({ isTransparent = false, isMobile = false }) => {
  const { countriesList, selectedCountry, changeCountry, t } = useShop();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const fallbackCountry = {
    name: "India",
    code: "IN",
    flag: "IN",
    currency: "INR",
    symbol: "₹",
    rate: 1.0,
  };

  const current = selectedCountry || fallbackCountry;
  const currentFlag = FLAG_MAP[current.code] || "🇮🇳";

  // Close on click outside or Escape
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

  const handleSelectCountry = (countryName) => {
    if (changeCountry) {
      changeCountry(countryName);
    }
    setIsOpen(false);
  };

  const list = Array.isArray(countriesList) && countriesList.length > 0
    ? countriesList
    : [
        { name: "India", code: "IN", currency: "INR", symbol: "₹" },
        { name: "America", code: "US", currency: "USD", symbol: "$" },
        { name: "Europe", code: "EU", currency: "EUR", symbol: "€" },
        { name: "United Kingdom", code: "GB", currency: "GBP", symbol: "£" },
        { name: "Canada", code: "CA", currency: "CAD", symbol: "C$" },
        { name: "Australia", code: "AU", currency: "AUD", symbol: "A$" },
        { name: "Japan", code: "JP", currency: "JPY", symbol: "¥" },
        { name: "UAE", code: "AE", currency: "AED", symbol: "د.إ" },
      ];

  return (
    <div ref={dropdownRef} className="relative inline-block text-left select-none">
      {/* Trigger Button Aside Search Bar */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select currency"
        aria-expanded={isOpen}
        title={t("change_currency", "Change Currency")}
        className={`flex items-center gap-1.5 h-11 px-3 sm:px-3.5 rounded-full transition-all duration-200 cursor-pointer font-bold text-xs tracking-wide shadow-xs ${
          isMobile
            ? "h-9 px-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200"
            : isTransparent
              ? "bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border-2 border-white/40 hover:border-white/70"
              : "bg-stone-50 hover:bg-white text-stone-800 border-2 border-stone-200/90 hover:border-orange-300 hover:shadow-sm"
        }`}
      >
        {/* Country Flag */}
        <span className="text-base sm:text-lg leading-none filter drop-shadow-xs">
          {currentFlag}
        </span>

        {/* Currency Code & Symbol */}
        <span className="font-extrabold uppercase text-[11px] sm:text-xs tracking-wider flex items-center gap-1">
          <span>{current.currency || "INR"}</span>
          <span className="text-orange-600 font-black">({current.symbol || "₹"})</span>
        </span>

        {/* Chevron Indicator */}
        <ChevronDown
          size={13}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180 text-orange-500" : isTransparent ? "text-white/70" : "text-stone-400"
          }`}
        />
      </button>

      {/* Currency Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`absolute top-full mt-2 w-72 bg-white text-stone-900 rounded-2xl shadow-[0_20px_48px_rgba(0,0,0,0.16)] border border-stone-100 p-2 z-[999] overflow-hidden ${
              isMobile ? "right-0" : "right-0 md:left-0 md:right-auto"
            }`}
          >
            {/* Header */}
            <div className="px-3 py-2 border-b border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-orange-600">
                <Coins size={15} />
                <span className="text-[11px] font-black uppercase tracking-wider text-stone-900">
                  {t("select_currency", "Select Currency")}
                </span>
              </div>
              <span className="text-[10px] font-bold text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
                {list.length} Currencies
              </span>
            </div>

            {/* Currency Options List */}
            <div className="py-1 max-h-72 overflow-y-auto space-y-1 custom-scrollbar">
              {list.map((c) => {
                const isSelected = (current.name || "").toLowerCase() === (c.name || "").toLowerCase() ||
                                   (current.currency || "") === c.currency;
                const flag = FLAG_MAP[c.code] || "🌐";

                return (
                  <button
                    key={c.code || c.name}
                    type="button"
                    onClick={() => handleSelectCountry(c.name)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-150 cursor-pointer text-left ${
                      isSelected
                        ? "bg-orange-50/90 text-orange-700 font-bold border border-orange-200/80 shadow-2xs"
                        : "text-stone-700 hover:bg-stone-50 hover:text-stone-950 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-xl leading-none filter drop-shadow-xs shrink-0">
                        {flag}
                      </span>
                      <div className="min-w-0">
                        <div className="text-xs font-bold leading-tight truncate">
                          {c.name === "America" ? "United States" : c.name}
                        </div>
                        <div className="text-[10px] text-stone-400 font-medium">
                          {c.currency} • {c.symbol}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-extrabold text-xs text-stone-800">
                        {c.symbol}
                      </span>
                      {isSelected && (
                        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-orange-600 text-white shrink-0 shadow-xs">
                          <Check size={11} strokeWidth={3} />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer Note */}
            <div className="px-3 py-2 bg-stone-50/80 rounded-xl mt-1 border border-stone-100 flex items-center gap-2 text-[10px] text-stone-500 font-medium">
              <Sparkles size={12} className="text-amber-500 shrink-0" />
              <span>{t("currency_instant_hint", "Live exchange rates applied across all products")}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CurrencySelector;
