import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend'; // <- Import the backend

// Import translation files (keep this as is)
import translationEN from './locales/en/translation.json';
import translationHI from './locales/hi/translation.json';

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  hi: {
    translation: translationHI,
  },
};

i18n
  .use(Backend) // <- Use the backend to load translations
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    debug: true,
    resources,
    fallbackLng: 'en', // fallback language if user's language is not available
    detection: {
      order: ['localStorage', 'navigator'], // <- Prioritize localStorage for persistence
      caches: ['localStorage'], // <- Cache the language selection
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;