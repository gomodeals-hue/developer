const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../frontend/src/context/ShopContext.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Normalize line endings for replacement
const isCRLF = content.includes('\r\n');
const normalized = content.replace(/\r\n/g, '\n');

const startTag = 'const translations = {';
const endTag = '};\n\nconst ShopContext = createContext();';

const startIdx = normalized.indexOf(startTag);
const endIdx = normalized.indexOf(endTag, startIdx);

if (startIdx === -1 || endIdx === -1) {
  console.error("Could not find start/end tags in ShopContext.jsx", { startIdx, endIdx });
  process.exit(1);
}

// Replace the translations definition with import
const replacementImport = "import { translations, supportedLanguages } from '../data/translations';\n\nconst ShopContext = createContext();";
const updatedNormalized = normalized.substring(0, startIdx) + replacementImport + normalized.substring(endIdx + endTag.length);

// Now update languagesList, changeLanguage, and t function
let updated = updatedNormalized;

// Update languagesList
const oldLanguagesList = `  const languagesList = [
    { code: 'EN', name: 'English', nativeName: 'English', flag: 'EN' },
    { code: 'HI', name: 'Hindi', nativeName: 'हिन्दी', flag: 'HI' },
    { code: 'ES', name: 'Spanish', nativeName: 'Español', flag: 'ES' },
    { code: 'FR', name: 'French', nativeName: 'Français', flag: 'FR' },
    { code: 'DE', name: 'German', nativeName: 'Deutsch', flag: 'DE' },
    { code: 'JA', name: 'Japanese', nativeName: '日本語', flag: 'JA' },
    { code: 'AR', name: 'Arabic', nativeName: 'العربية', flag: 'AR' }
  ];`;

const newLanguagesList = `  const languagesList = supportedLanguages || [
    { code: 'EN', name: 'English', nativeName: 'English', flag: '🇬🇧', label: 'English' },
    { code: 'FR', name: 'French', nativeName: 'Français', flag: '🇫🇷', label: 'Français' },
    { code: 'DE', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', label: 'Deutsch' },
    { code: 'HI', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', label: 'हिन्दी' },
    { code: 'ES', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', label: 'Español' }
  ];`;

if (updated.includes(oldLanguagesList)) {
  updated = updated.replace(oldLanguagesList, newLanguagesList);
  console.log("Replaced languagesList");
} else {
  console.warn("Could not find exact oldLanguagesList, trying regex match");
  updated = updated.replace(/const languagesList = \[\s*\{[\s\S]*?\];/, newLanguagesList);
}

// Update changeLanguage and sync with HTML lang attribute & custom event
const oldChangeLanguage = `  const changeLanguage = (langCode) => {
    const upper = langCode.toUpperCase();
    if (['EN', 'HI', 'ES', 'FR', 'DE', 'JA', 'AR'].includes(upper)) {
      setLanguage(upper);
      localStorage.setItem('gmd_language', upper);
    }
  };`;

const newChangeLanguage = `  useEffect(() => {
    try {
      if (typeof document !== 'undefined') {
        document.documentElement.lang = (language || 'EN').toLowerCase();
      }
    } catch (e) {}
  }, [language]);

  const changeLanguage = (langCode) => {
    if (!langCode) return;
    const upper = langCode.toUpperCase();
    if (['EN', 'HI', 'ES', 'FR', 'DE', 'JA', 'AR'].includes(upper)) {
      setLanguage(upper);
      localStorage.setItem('gmd_language', upper);
      try {
        if (typeof document !== 'undefined') {
          document.documentElement.lang = upper.toLowerCase();
          window.dispatchEvent(new CustomEvent('gmd_language_changed', { detail: { language: upper } }));
        }
      } catch (e) {}
    }
  };`;

if (updated.includes(oldChangeLanguage)) {
  updated = updated.replace(oldChangeLanguage, newChangeLanguage);
  console.log("Replaced changeLanguage");
} else {
  console.warn("Could not find exact oldChangeLanguage, trying regex");
  updated = updated.replace(/const changeLanguage = \(langCode\) => \{[\s\S]*?\n  \};/, newChangeLanguage);
}

// Update t function with smart reverse-mapping lookup for English strings
const oldTFunc = `  const t = (key, params = {}) => {
    if (!key) return '';
    const lang = language.toUpperCase();
    const langDict = translations[lang] || translations.EN;
    
    let translation = langDict[key] || translations.EN[key];
    
    if (!translation) {
      // Key not found in static dictionary, treat key itself as the source text to translate dynamically!
      const targetLang = language.toLowerCase();
      if (targetLang === 'en') {
        translation = key;
      } else {
        const cached = translationsCache[targetLang]?.[key];
        if (cached) {
          translation = cached;
        } else {
          // Trigger asynchronous background fetch
          triggerBackgroundTranslation(key, targetLang);
          translation = key; // Fallback to English temporarily
        }
      }
    }
    
    // Replace placeholder params (e.g., {count}, {price}, {recipient}, {percent})
    Object.entries(params).forEach(([k, v]) => {
      translation = translation.replace(new RegExp(\`\\\\{\${k}\\\\}\`, 'g'), v);
    });
    
    return translation;
  };`;

const newTFunc = `  const t = (key, params = {}) => {
    if (!key) return '';
    const lang = (language || 'EN').toUpperCase();
    const langDict = translations[lang] || translations.EN;
    
    // 1. Direct key lookup
    let translation = langDict?.[key];
    
    // 2. If not found by key, try matching by English value
    if (!translation && lang !== 'EN' && translations.EN) {
      const matchKey = Object.keys(translations.EN).find(
        k => typeof translations.EN[k] === 'string' && translations.EN[k].trim().toLowerCase() === String(key).trim().toLowerCase()
      );
      if (matchKey && langDict?.[matchKey]) {
        translation = langDict[matchKey];
      }
    }
    
    // 3. Fallback to English dictionary or raw key
    if (!translation) {
      translation = translations.EN?.[key] || key;
    }
    
    // 4. Background dynamic translation if still equal to key and target language is not English
    if (translation === key && lang !== 'EN') {
      const targetLang = lang.toLowerCase();
      const cached = translationsCache[targetLang]?.[key];
      if (cached) {
        translation = cached;
      } else {
        triggerBackgroundTranslation(key, targetLang);
      }
    }
    
    // 5. Replace placeholder params (e.g., {count}, {price}, {recipient}, {percent}, {query})
    if (typeof translation === 'string') {
      Object.entries(params).forEach(([k, v]) => {
        translation = translation.replace(new RegExp(\`\\\\{\${k}\\\\}\`, 'g'), v);
      });
    }
    
    return translation;
  };`;

if (updated.includes(oldTFunc)) {
  updated = updated.replace(oldTFunc, newTFunc);
  console.log("Replaced t function");
} else {
  console.warn("Could not find exact oldTFunc, trying regex");
  updated = updated.replace(/const t = \(key, params = \{\}\) => \{[\s\S]*?\n  \};/, newTFunc);
}

// Export supportedLanguages in context value as well
updated = updated.replace(
  'languagesList,',
  'languagesList,\n      supportedLanguages,'
);

// Restore original CRLF if was CRLF
const finalOutput = isCRLF ? updated.replace(/\n/g, '\r\n') : updated;
fs.writeFileSync(filePath, finalOutput, 'utf8');
console.log("Successfully updated ShopContext.jsx!");
