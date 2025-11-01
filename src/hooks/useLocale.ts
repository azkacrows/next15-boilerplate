"use client";

import { useLocale as useNextIntlLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { type Locale } from "@/types/i18n";

export function useLocale() {
  const locale = useNextIntlLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (newLocale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPathname = segments.join("/");

    startTransition(() => {
      router.replace(newPathname);
    });
  };

  const getLocalizedPath = (path: string, targetLocale?: Locale) => {
    const localeToUse = targetLocale || locale;
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `/${localeToUse}${cleanPath}`;
  };

  const getCurrentPath = () => {
    const segments = pathname.split("/");
    segments.splice(1, 1);
    return segments.join("/") || "/";
  };

  return {
    locale,
    switchLocale,
    getLocalizedPath,
    getCurrentPath,
    isPending,
  };
}