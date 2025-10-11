import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
import { locales, defaultLocale } from '@/types/i18n';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: locales as unknown as string[],

    // Used when no locale matches
    defaultLocale,

    // The default locale is used when no locale is detected in the URL
    localePrefix: 'always',
});

// Optional: use this to create links and navigate for locale-aware, or else you can use next/navigation instead
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
