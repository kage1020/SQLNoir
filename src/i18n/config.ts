import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enCommon from '../locales/en/common.json';
import enCases from '../locales/en/cases.json';
import enAuth from '../locales/en/auth.json';
import enDashboard from '../locales/en/dashboard.json';

import jaCommon from '../locales/ja/common.json';
import jaCases from '../locales/ja/cases.json';
import jaAuth from '../locales/ja/auth.json';
import jaDashboard from '../locales/ja/dashboard.json';

const resources = {
  en: {
    common: enCommon,
    cases: enCases,
    auth: enAuth,
    dashboard: enDashboard,
  },
  ja: {
    common: jaCommon,
    cases: jaCases,
    auth: jaAuth,
    dashboard: jaDashboard,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
