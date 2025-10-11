'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { ChangeEvent, useTransition } from 'react';
import { locales, localeMetadata } from '@/types/i18n';
import { ChevronDown } from 'lucide-react';

export default function LocaleSwitcher() {
    const t = useTranslations('localeSwitcher');
    const locale = useLocale();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();

    function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        const nextLocale = event.target.value;

        // Replace the locale in the pathname
        const segments = pathname.split('/');
        segments[1] = nextLocale;
        const newPathname = segments.join('/');

        startTransition(() => {
            router.replace(newPathname);
        });
    }

    return (
        <label className="relative inline-block">
            <span className="sr-only">{t('label')}</span>
            <select
                className="appearance-none bg-card border border-border rounded-lg px-4 py-2 pr-8 text-foreground cursor-pointer hover:border-primary/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                defaultValue={locale}
                disabled={isPending}
                onChange={onSelectChange}
            >
                {locales.map((cur) => (
                    <option key={cur} value={cur}>
                        {localeMetadata[cur].nativeName}
                    </option>
                ))}
            </select>
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                <ChevronDown size={16} />
            </span>
        </label>
    );
}
