import { getTranslations } from "next-intl/server";
import { type Locale, locales } from "@/types/i18n";
import { generatePageMetadata } from "@/shared/constants/metadata";
import Link from "next/link";
import LocaleSwitcher from "@/shared/components/LocaleSwitcher";

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
    title: t("routingGuide.title"),
    description: t("routingGuide.description"),
  });
}

export default async function RoutingGuidePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href={`/${locale}`} className="text-2xl font-bold text-foreground hover:text-primary">
            {t("homePage.heading")}
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
            ← {t("common.back")}
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t("routingGuide.heading")}
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            {t("routingGuide.intro")}
          </p>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t("routingGuide.appRouter.title")}
              </h2>
              <p className="text-foreground/80 mb-4">
                {t("routingGuide.appRouter.description")}
              </p>
              <div className="bg-card border border-border rounded-lg p-6">
                <pre className="text-sm overflow-x-auto">
                  <code>{`app/
├── [locale]/              ← Locale-based routing
│   ├── layout.tsx         ← Layout for all localized pages
│   ├── page.tsx           ← Homepage (/)
│   ├── getting-started/
│   │   └── page.tsx       ← /getting-started
│   ├── learn-more/
│   │   └── page.tsx       ← /learn-more
│   └── routing-guide/
│       └── page.tsx       ← /routing-guide
├── layout.tsx             ← Root layout
└── page.tsx               ← Root redirect`}</code>
                </pre>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t("routingGuide.dynamicRoutes.title")}
              </h2>
              <p className="text-foreground/80 mb-4">
                {t("routingGuide.dynamicRoutes.description")}
              </p>
              
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-foreground mb-2">
                    {t("routingGuide.dynamicRoutes.example1.title")}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {t("routingGuide.dynamicRoutes.example1.description")}
                  </p>
                  <div className="bg-muted p-4 rounded">
                    <code className="text-sm">app/[locale]/blog/[slug]/page.tsx</code>
                  </div>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-foreground mb-2">
                    {t("routingGuide.dynamicRoutes.example2.title")}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {t("routingGuide.dynamicRoutes.example2.description")}
                  </p>
                  <div className="bg-muted p-4 rounded">
                    <code className="text-sm">app/[locale]/products/[category]/[id]/page.tsx</code>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t("routingGuide.navigation.title")}
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {t("routingGuide.navigation.link.title")}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {t("routingGuide.navigation.link.description")}
                  </p>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <pre className="text-sm overflow-x-auto">
                      <code>{`import { Link } from "@/i18n/routing";

export default function MyComponent() {
  return (
    <Link href="/about">
      About Us
    </Link>
  );
}`}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {t("routingGuide.navigation.router.title")}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {t("routingGuide.navigation.router.description")}
                  </p>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <pre className="text-sm overflow-x-auto">
                      <code>{`"use client";

import { useRouter } from "@/i18n/routing";

export default function MyComponent() {
  const router = useRouter();
  
  const handleClick = () => {
    router.push("/dashboard");
  };
  
  return <button onClick={handleClick}>Go to Dashboard</button>;
}`}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {t("routingGuide.navigation.useLocale.title")}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {t("routingGuide.navigation.useLocale.description")}
                  </p>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <pre className="text-sm overflow-x-auto">
                      <code>{`"use client";

import { usePathname, useRouter } from "@/i18n/routing";

export default function MyComponent() {
  const pathname = usePathname();
  const router = useRouter();
  
  // Get current path with locale
  console.log(pathname); // e.g. "/en/about"
  
  // Navigate to a different page
  const handleNavigate = () => {
    router.push("/about"); // Automatically uses current locale
  };
  
  // Get localized path (if needed)
  const aboutPath = "/about"; // Paths are automatically localized by the Link/useRouter
  
  return <button onClick={handleSwitchToJapanese}>Switch to Japanese</button>;
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t("routingGuide.i18nRouting.title")}
              </h2>
              <p className="text-foreground/80 mb-4">
                {t("routingGuide.i18nRouting.description")}
              </p>
              
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">
                    {t("routingGuide.i18nRouting.urlStructure")}
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><code className="bg-muted px-2 py-1 rounded">/en/about</code> - English</li>
                    <li><code className="bg-muted px-2 py-1 rounded">/id/about</code> - Indonesian</li>
                    <li><code className="bg-muted px-2 py-1 rounded">/ja/about</code> - Japanese</li>
                  </ul>
                </div>
                
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">
                    {t("routingGuide.i18nRouting.automatic")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("routingGuide.i18nRouting.automaticDescription")}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t("routingGuide.bestPractices.title")}
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-foreground/80">{t("routingGuide.bestPractices.practice1")}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-foreground/80">{t("routingGuide.bestPractices.practice2")}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-foreground/80">{t("routingGuide.bestPractices.practice3")}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-foreground/80">{t("routingGuide.bestPractices.practice4")}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-foreground/80">{t("routingGuide.bestPractices.practice5")}</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t("routingGuide.examples.title")}
              </h2>
              
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  {t("routingGuide.examples.createPage")}
                </h3>
                <pre className="text-sm overflow-x-auto">
                  <code>{`// app/[locale]/products/page.tsx
import { getTranslations } from "next-intl/server";
import { type Locale, locales } from "@/types/i18n";
import { generatePageMetadata } from "@/shared/constants/metadata";

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
    title: t("products.title"),
    description: t("products.description"),
  });
}

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <div>
      <h1>{t("products.heading")}</h1>
      <p>{t("products.description")}</p>
    </div>
  );
}`}</code>
                </pre>
              </div>
            </section>

            <div className="flex gap-4 pt-8">
              <Link
                href={`/${locale}`}
                className="px-6 py-3 border border-border text-foreground rounded-lg hover:bg-accent transition-colors"
              >
                {t("common.back")}
              </Link>
              <Link
                href={`/${locale}/getting-started`}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                {t("homePage.getStarted")}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </p>
          <p className="text-xs text-muted-foreground/80">
            {t("footer.madeWith")}
          </p>
        </div>
      </footer>
    </div>
  );
}
