import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ja' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-100 hover:bg-amber-200
                 text-amber-900 transition-colors duration-200"
      title={i18n.language === 'en' ? '日本語に切り替え' : 'Switch to English'}
    >
      <Languages className="w-5 h-5" />
      <span className="font-medium text-sm">
        {i18n.language === 'en' ? '日本語' : 'English'}
      </span>
    </button>
  );
}
