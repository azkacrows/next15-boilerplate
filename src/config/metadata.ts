import type { Metadata } from 'next';
import type { Locale } from '@/types/i18n';
import type { SiteMetadata } from '@/types/metadata';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Next.js 16 Boilerplate';

export const siteMetadata: SiteMetadata = {
    title: 'Next.js 16 Boilerplate',
    description:
        'Production-ready Next.js 16 boilerplate with TypeScript, Tailwind CSS, Zustand, and internationalization',
    keywords: [
        'Next.js 16',
        'React 19',
        'TypeScript',
        'Tailwind CSS',
        'Zustand',
        'i18n',
        'SEO',
        'Static Export',
        'shadcn/ui',
        'App Router',
        'Server Components',
        'Modern Web Development',
    ],
    author: 'Your Name',
    siteUrl: SITE_URL,
    siteName: SITE_NAME,
    twitterHandle: '@yourusername',
    ogImage: `${SITE_URL}/ogImages/default-og.png`,
};

export function generateMetadata(locale: Locale, pageTitle?: string): Metadata {
    const title = pageTitle ? `${pageTitle} | ${siteMetadata.siteName}` : siteMetadata.siteName;

    return {
        title: {
            default: title,
            template: `%s | ${siteMetadata.siteName}`,
        },
        description: siteMetadata.description,
        keywords: siteMetadata.keywords,
        authors: [{ name: siteMetadata.author }],
        creator: siteMetadata.author,
        publisher: siteMetadata.author,
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
        },
        metadataBase: new URL(siteMetadata.siteUrl),
        alternates: {
            canonical: `/${locale}`,
            languages: {
                en: '/en',
                id: '/id',
                ja: '/ja',
            },
        },
        openGraph: {
            type: 'website',
            locale: locale,
            url: siteMetadata.siteUrl,
            siteName: siteMetadata.siteName,
            title: title,
            description: siteMetadata.description,
            images: [
                {
                    url: siteMetadata.ogImage || `${siteMetadata.siteUrl}/ogImages/default-og.png`,
                    width: 1200,
                    height: 630,
                    alt: siteMetadata.siteName,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            site: siteMetadata.twitterHandle,
            creator: siteMetadata.twitterHandle,
            title: title,
            description: siteMetadata.description,
            images: [siteMetadata.ogImage || `${siteMetadata.siteUrl}/ogImages/default-og.png`],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        icons: {
            icon: [
                { url: '/favicon.ico' },
                { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
                { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            ],
            apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
        },
    };
}

export function generatePageMetadata({
    locale,
    title,
    description,
    path = '',
    ogImage,
}: {
    locale: Locale;
    title: string;
    description?: string;
    path?: string;
    ogImage?: string;
}): Metadata {
    const pageDescription = description || siteMetadata.description;
    const fullUrl = `${siteMetadata.siteUrl}/${locale}${path}`;
    const imageUrl =
        ogImage || siteMetadata.ogImage || `${siteMetadata.siteUrl}/ogImages/default-og.png`;

    return {
        title,
        description: pageDescription,
        alternates: {
            canonical: fullUrl,
            languages: {
                en: `/en${path}`,
                id: `/id${path}`,
                ja: `/ja${path}`,
            },
        },
        openGraph: {
            type: 'website',
            locale: locale,
            url: fullUrl,
            siteName: siteMetadata.siteName,
            title: `${title} | ${siteMetadata.siteName}`,
            description: pageDescription,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            site: siteMetadata.twitterHandle,
            creator: siteMetadata.twitterHandle,
            title: `${title} | ${siteMetadata.siteName}`,
            description: pageDescription,
            images: [imageUrl],
        },
    };
}
