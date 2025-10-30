import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Inter } from 'next/font/google';
import { locales, type Locale, type LayoutProps } from '@/types';
import { generateMetadata as generateSiteMetadata } from '@/shared/constants/metadata';
import '../styles/globals.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
    preload: true,
    fallback: [
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Arial',
        'sans-serif',
    ],
});

export async function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps) {
    const { locale } = await params;
    return generateSiteMetadata(locale as Locale);
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
    const { locale } = await params;

    if (!locales.includes(locale as Locale)) {
        notFound();
    }

    setRequestLocale(locale);
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className={inter.variable} suppressHydrationWarning>
                <NextIntlClientProvider
                    messages={messages}
                    locale={locale}
                    timeZone="UTC"
                    now={new Date()}
                >
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
