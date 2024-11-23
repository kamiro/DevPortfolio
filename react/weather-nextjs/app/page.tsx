"use client";

import { isSupportedLocale, routing } from "@/i18n/routing";
import { redirect } from "next/navigation";

export default function RootPage() {
  if ("languages" in navigator) {
    for (const locale of navigator.languages) {
      // Check for a language code with a region code 'en-US', 'es-ES' etc.
      if (isSupportedLocale(locale)) {
        redirect(`/${locale}`);
      }
      // Check for a language code without a region code 'en-US' => 'en', 'es-ES' => 'es'
      const language = locale.split("-")[0];
      if (isSupportedLocale(language)) {
        redirect(`/${language}`);
      }
    }
  }

  redirect(`/${routing.defaultLocale}`);
}
