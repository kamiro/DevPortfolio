import { isSupportedLocale, routing } from "@/i18n/routing";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation.js";
import { ReactNode } from "react";
import "../globals.css";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

const RootLayout = async ({ children, params }: LayoutProps) => {
  const { locale } = await params;

  // This is the point that we are validating that locale is a
  // supported locale.  In this instance we can treat the locales
  // as a `string[]` since include can take any string to compare
  // with our sorted locales.
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <RootDocumentLayout locale={locale}>{children}</RootDocumentLayout>
    </NextIntlClientProvider>
  );
};

const RootDocumentLayout = ({ children, locale }: { children: ReactNode; locale: string }) => {
  const t = useTranslations("App");
  return (
    <html lang={locale} className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{t("title")}</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="h-full bg-slate-950 text-slate-50 overflow-hidden">{children}</body>
    </html>
  );
};

export default RootLayout;
