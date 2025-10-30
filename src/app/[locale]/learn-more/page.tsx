import { getTranslations } from 'next-intl/server';
import { type Locale, locales } from '@/types/i18n';
import { generatePageMetadata } from '@/shared/constants/metadata';
import Link from 'next/link';
import LocaleSwitcher from '@/shared/components/LocaleSwitcher';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale });

    return generatePageMetadata({
        locale: locale as Locale,
        title: t('learnMore.title'),
        description: t('learnMore.description'),
    });
}

export default async function LearnMorePage({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale });

    return (
        <div className="min-h-screen flex flex-col">
            <header className="border-b border-border py-4 min-h-[72px]">
                <div className="container mx-auto px-4 flex justify-between items-center min-h-14">
                    <Link
                        href={`/${locale}`}
                        className="text-2xl font-bold text-foreground hover:text-primary"
                    >
                        {t('homePage.heading')}
                    </Link>
                    <LocaleSwitcher />
                </div>
            </header>

            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <Link
                        href={`/${locale}`}
                        className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block"
                    >
                        ← {t('common.back')}
                    </Link>

                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                        {t('learnMore.heading')}
                    </h1>

                    <p className="text-lg text-muted-foreground mb-8">{t('learnMore.intro')}</p>

                    <div className="space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">
                                {t('learnMore.architecture.title')}
                            </h2>
                            <p className="text-foreground/80 mb-4">
                                {t('learnMore.architecture.description')}
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                                <li>{t('learnMore.architecture.feature1')}</li>
                                <li>{t('learnMore.architecture.feature2')}</li>
                                <li>{t('learnMore.architecture.feature3')}</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">
                                {t('learnMore.technologies.title')}
                            </h2>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="border border-border rounded-lg p-6 min-h-[120px]">
                                    <h3 className="font-semibold text-foreground mb-2">
                                        Next.js 16
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {t('learnMore.technologies.nextjs')}
                                    </p>
                                </div>
                                <div className="border border-border rounded-lg p-6 min-h-[120px]">
                                    <h3 className="font-semibold text-foreground mb-2">
                                        TypeScript
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {t('learnMore.technologies.typescript')}
                                    </p>
                                </div>
                                <div className="border border-border rounded-lg p-6 min-h-[120px]">
                                    <h3 className="font-semibold text-foreground mb-2">
                                        Tailwind CSS 4
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {t('learnMore.technologies.tailwind')}
                                    </p>
                                </div>
                                <div className="border border-border rounded-lg p-6 min-h-[120px]">
                                    <h3 className="font-semibold text-foreground mb-2">
                                        next-intl
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {t('learnMore.technologies.i18n')}
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">
                                {t('learnMore.features.title')}
                            </h2>
                            <div className="space-y-4">
                                <div className="border-l-4 border-primary pl-4">
                                    <h3 className="font-semibold text-foreground mb-1">
                                        {t('learnMore.features.staticExport.title')}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {t('learnMore.features.staticExport.description')}
                                    </p>
                                </div>
                                <div className="border-l-4 border-primary pl-4">
                                    <h3 className="font-semibold text-foreground mb-1">
                                        {t('learnMore.features.seo.title')}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {t('learnMore.features.seo.description')}
                                    </p>
                                </div>
                                <div className="border-l-4 border-primary pl-4">
                                    <h3 className="font-semibold text-foreground mb-1">
                                        {t('learnMore.features.performance.title')}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {t('learnMore.features.performance.description')}
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">
                                {t('learnMore.resources.title')}
                            </h2>
                            <div className="bg-card border border-border rounded-lg p-6">
                                <ul className="space-y-3">
                                    <li>
                                        <a
                                            href="https://nextjs.org/docs"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:underline"
                                        >
                                            {t('learnMore.resources.nextjsDocs')}
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.typescriptlang.org/docs/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:underline"
                                        >
                                            {t('learnMore.resources.typescriptDocs')}
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://tailwindcss.com/docs"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:underline"
                                        >
                                            {t('learnMore.resources.tailwindDocs')}
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://next-intl-docs.vercel.app/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:underline"
                                        >
                                            {t('learnMore.resources.nextIntlDocs')}
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://zustand-demo.pmnd.rs/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:underline"
                                        >
                                            {t('learnMore.resources.zustandDocs')}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <div className="flex gap-4 pt-8">
                            <Link
                                href={`/${locale}/getting-started`}
                                className="px-6 py-3 border border-border text-foreground rounded-lg hover:bg-accent transition-colors"
                            >
                                {t('homePage.getStarted')}
                            </Link>
                            <Link
                                href={`/${locale}`}
                                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                            >
                                {t('common.back')} {t('navigation.home')}
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="border-t border-border py-8 min-h-[120px]">
                <div className="container mx-auto px-4 text-center space-y-2">
                    <p className="text-sm text-muted-foreground">
                        {t('footer.copyright', { year: new Date().getFullYear() })}
                    </p>
                    <p className="text-xs text-muted-foreground/80">{t('footer.madeWith')}</p>
                </div>
            </footer>
        </div>
    );
}
