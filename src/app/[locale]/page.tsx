import { getTranslations } from 'next-intl/server';
import { type Locale, locales } from '@/types/i18n';
import { generatePageMetadata } from '@/config/metadata';
import LocaleSwitcher from '@/components/LocaleSwitcher';

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
        title: t('homePage.title'),
        description: t('homePage.description'),
    });
}

export default async function HomePage({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale });

    return (
        <div className="min-h-screen flex flex-col">
            <header className="border-b border-border py-4 min-h-[72px]">
                <div className="container mx-auto px-4 flex justify-between items-center gap-4 min-h-14">
                    <h1 className="text-2xl font-bold text-foreground">{t('homePage.heading')}</h1>
                    <div className="flex items-center gap-4">
                        <LocaleSwitcher />
                    </div>
                </div>
            </header>

            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                            {t('homePage.heading')}
                        </h2>
                        <p className="text-xl text-muted-foreground">{t('homePage.subtitle')}</p>
                        <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                            {t('homePage.description')}
                        </p>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <a
                            href="https://github.com/azkacrows/next16-boilerplate"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                        >
                            {t('homePage.getStarted')}
                        </a>
                        <a
                            href="https://nextjs.org/docs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 border border-border text-foreground rounded-lg hover:bg-accent transition-colors"
                        >
                            {t('homePage.learnMore')}
                        </a>
                    </div>

                    <div className="mt-16">
                        <h3 className="text-2xl font-bold mb-8 text-foreground">
                            {t('homePage.features.title')}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <FeatureCard title={t('homePage.features.typescript')} icon="🔷" />
                            <FeatureCard title={t('homePage.features.tailwind')} icon="🎨" />
                            <FeatureCard title={t('homePage.features.i18n')} icon="🌐" />
                            <FeatureCard title={t('homePage.features.seo')} icon="🔍" />
                            <FeatureCard title={t('homePage.features.staticExport')} icon="📦" />
                            <FeatureCard title={t('homePage.features.performance')} icon="⚡" />
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

function FeatureCard({ title, icon }: { title: string; icon: string }) {
    return (
        <div className="p-6 border border-border rounded-lg hover:border-primary/50 transition-colors bg-card min-h-[140px] flex flex-col">
            <div className="text-4xl mb-3 leading-none" style={{ height: '48px' }}>
                {icon}
            </div>
            <h4 className="font-semibold text-card-foreground flex-1">{title}</h4>
        </div>
    );
}
