import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
import { locales, defaultLocale } from '@/types/i18n';

export const routing = defineRouting({
    locales: locales as unknown as string[],
    defaultLocale,
    localePrefix: 'always',
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
