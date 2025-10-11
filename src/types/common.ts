import type { ReactNode } from 'react';
import type { Locale } from './i18n';
import type { LucideIcon } from 'lucide-react';

export interface PageProps {
    params: Promise<{ locale: string }>;
}

export interface LayoutProps {
    children: ReactNode;
    params: Promise<{ locale: string }>;
}

export interface LocaleSwitcherProps {
    children: ReactNode;
    defaultValue: string;
    label: string;
}

export interface FeatureCardProps {
    title: string;
    icon: LucideIcon;
}

export interface LocalizedPageProps {
    locale: Locale;
    title: string;
    description?: string;
    path?: string;
}
