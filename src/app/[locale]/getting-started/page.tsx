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
        title: t('gettingStarted.title'),
        description: t('gettingStarted.description'),
    });
}

export default async function GettingStartedPage({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale });

    return (
        <div className="min-h-screen flex flex-col">
            <header className="border-b border-border py-4">
                <div className="container mx-auto px-4 flex justify-between items-center">
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
                        {t('gettingStarted.heading')}
                    </h1>

                    <p className="text-lg text-muted-foreground mb-8">
                        {t('gettingStarted.intro')}
                    </p>

                    <div className="space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">
                                {t('gettingStarted.prerequisites.title')}
                            </h2>
                            <ul className="list-disc list-inside space-y-2 text-foreground/80">
                                <li>{t('gettingStarted.prerequisites.node')}</li>
                                <li>{t('gettingStarted.prerequisites.packageManager')}</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">
                                {t('gettingStarted.installation.title')}
                            </h2>
                            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                                <div>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        {t('gettingStarted.installation.step1')}
                                    </p>
                                    <pre className="bg-muted p-4 rounded overflow-x-auto">
                                        <code className="text-sm">
                                            git clone
                                            https://github.com/azkacrows/next15-boilerplate.git
                                            {'\n'}cd next15-boilerplate
                                        </code>
                                    </pre>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        {t('gettingStarted.installation.step2')}
                                    </p>
                                    <pre className="bg-muted p-4 rounded overflow-x-auto">
                                        <code className="text-sm">npm install</code>
                                    </pre>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        {t('gettingStarted.installation.step3')}
                                    </p>
                                    <pre className="bg-muted p-4 rounded overflow-x-auto">
                                        <code className="text-sm">npm run dev</code>
                                    </pre>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">
                                {t('gettingStarted.nextSteps.title')}
                            </h2>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <span className="text-primary mr-2">•</span>
                                    <span className="text-foreground/80">
                                        {t('gettingStarted.nextSteps.explore')}
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary mr-2">•</span>
                                    <span className="text-foreground/80">
                                        {t('gettingStarted.nextSteps.customize')}
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary mr-2">•</span>
                                    <span className="text-foreground/80">
                                        {t('gettingStarted.nextSteps.build')}
                                    </span>
                                </li>
                            </ul>
                        </section>

                        <div className="flex gap-4 pt-8">
                            <Link
                                href={`/${locale}`}
                                className="px-6 py-3 border border-border text-foreground rounded-lg hover:bg-accent transition-colors"
                            >
                                {t('common.back')}
                            </Link>
                            <Link
                                href={`/${locale}/learn-more`}
                                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                            >
                                {t('homePage.learnMore')}
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="border-t border-border py-8">
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
