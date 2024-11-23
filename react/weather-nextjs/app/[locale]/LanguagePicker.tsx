import { Link, SupportedLocale } from "@/i18n/routing";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation.js";
import { useEffect, useState } from "react";

// routing.locales; // ['en', 'es']

const localeMap: Record<SupportedLocale, string> = {
  en: "🇬🇧",
  es: "🇪🇸",
  de: "🇩🇪",
  fr: "🇫🇷",
  it: "🇮🇹",
  pt: "🇧🇷", // Brazil
  "pt-PT": "🇵🇹",
  "es-MX": "🇲🇽",
};

const LanguagePicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentLocale = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    // Define the callback function to close modal or take any other action
    setIsOpen(false);
  }, [pathname]);

  return (
    <motion.div
      layout
      transition={{ duration: 0.3 }}
      className="absolute right-4 top-6 sm:right-auto sm:left-4 sm:top-auto sm:bottom-6 text-3xl
    rounded-full bg-slate-950 bg-opacity-60 flex flex-row justify-center items-center"
      onClick={() => setIsOpen(true)}
    >
      {Object.entries(localeMap).map(([locale, flag]) => {
        const isCurrent = locale === currentLocale;
        const isHidden = !isOpen && !isCurrent;

        return (
          <Link
            key={locale}
            href="/"
            locale={locale}
            className={`h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-full border-slate-400 sm:border-slate-600
                ${!isOpen ? "pointer-events-none" : ""}
                ${isCurrent && isOpen ? "border bg-slate-500 sm:bg-slate-700 " : ""}
                ${isHidden ? "hidden" : ""}
                `}
          >
            {flag}
          </Link>
        );
      })}
    </motion.div>
  );
};

export default LanguagePicker;
