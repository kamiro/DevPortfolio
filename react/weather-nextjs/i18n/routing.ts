import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

const defaultLocale = 'en' as const;
const locales = ['en', 'es', 'es-MX', 'de', 'fr', 'it', 'pt', 'pt-PT'] as const;

export type SupportedLocale = (typeof routing.locales)[number];
export const isSupportedLocale = (locale: string): locale is SupportedLocale => {
  return (locales as ReadonlyArray<string>).includes(locale);
}

export const routing = defineRouting({
  locales,
  defaultLocale
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);