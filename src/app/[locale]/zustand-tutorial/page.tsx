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
        title: t('zustandTutorial.title'),
        description: t('zustandTutorial.description'),
    });
}

export default async function ZustandTutorialPage({ params }: Props) {
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
                        {t('zustandTutorial.heading')}
                    </h1>

                    <p className="text-lg text-muted-foreground mb-8">
                        {t('zustandTutorial.intro')}
                    </p>
                    <div className="space-y-8">
                        <Section title={t('zustandTutorial.whatIsZustand.title')}>
                            <p className="text-foreground/90 mb-4">
                                {t('zustandTutorial.whatIsZustand.description')}
                            </p>
                            <ul className="space-y-2 list-disc list-inside text-foreground/80">
                                <li>{t('zustandTutorial.whatIsZustand.feature1')}</li>
                                <li>{t('zustandTutorial.whatIsZustand.feature2')}</li>
                                <li>{t('zustandTutorial.whatIsZustand.feature3')}</li>
                                <li>{t('zustandTutorial.whatIsZustand.feature4')}</li>
                            </ul>
                        </Section>

                        <Section title={t('zustandTutorial.storeStructure.title')}>
                            <p className="text-foreground/90 mb-4">
                                {t('zustandTutorial.storeStructure.description')}
                            </p>
                            <CodeBlock language="typescript" title="src/stores/useUIStore.ts">
                                {`import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UIState {
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
  
  notification: Notification | null;
  setNotification: (notification: Notification | null) => void;
  
  _hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set) => ({
        isSidebarOpen: true,
        notification: null,
        _hasHydrated: false,
        
        setSidebarOpen: (isOpen) => 
          set({ isSidebarOpen: isOpen }, false, "setSidebarOpen"),
        
        toggleSidebar: () => 
          set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
        
        setNotification: (notification) => 
          set({ notification }),
        
        setHasHydrated: (hasHydrated) => 
          set({ _hasHydrated: hasHydrated }),
      }),
      {
        name: "ui-store",
        partialize: (state) => ({
          isSidebarOpen: state.isSidebarOpen,
        }),
        onRehydrateStorage: () => (state) => {
          state?.setHasHydrated(true);
        },
      }
    ),
    { name: "UIStore", enabled: process.env.NODE_ENV === "development" }
  )
);`}
                            </CodeBlock>
                        </Section>

                        <Section title={t('zustandTutorial.basicUsage.title')}>
                            <p className="text-foreground/90 mb-4">
                                {t('zustandTutorial.basicUsage.description')}
                            </p>
                            <CodeBlock language="typescript" title="components/Sidebar.tsx">
                                {`"use client";

import { useUIStore } from "@/stores/useUIStore";

export function Sidebar() {
  const isOpen = useUIStore((state) => state.isSidebarOpen);
  const toggle = useUIStore((state) => state.toggleSidebar);

  return (
    <div className={\`sidebar \${isOpen ? 'open' : 'closed'}\`}>
      <button onClick={toggle}>
        {isOpen ? 'Close' : 'Open'} Sidebar
      </button>
    </div>
  );
}`}
                            </CodeBlock>
                        </Section>

                        <Section title={t('zustandTutorial.selectorHooks.title')}>
                            <p className="text-foreground/90 mb-4">
                                {t('zustandTutorial.selectorHooks.description')}
                            </p>
                            <CodeBlock language="typescript" title="src/stores/useUIStore.ts">
                                {`export const useNotification = () =>
  useUIStore((state) => ({
    notification: state.notification,
    setNotification: state.setNotification,
    dismiss: state.dismissNotification,
  }));

export const useMobileMenu = () =>
  useUIStore((state) => ({
    isOpen: state.isMobileMenuOpen,
    setOpen: state.setMobileMenuOpen,
    toggle: state.toggleMobileMenu,
  }));`}
                            </CodeBlock>
                            <p className="text-foreground/80 mt-4">
                                {t('zustandTutorial.selectorHooks.usage')}
                            </p>
                            <CodeBlock language="typescript">
                                {`"use client";

import { useNotification } from "@/stores/useUIStore";

export function NotificationBar() {
  const { notification, dismiss } = useNotification();
  
  if (!notification) return null;
  
  return (
    <div className="notification">
      <p>{notification.message}</p>
      <button onClick={dismiss}>Dismiss</button>
    </div>
  );
}`}
                            </CodeBlock>
                        </Section>

                        <Section title={t('zustandTutorial.ssrSafety.title')}>
                            <p className="text-foreground/90 mb-4">
                                {t('zustandTutorial.ssrSafety.description')}
                            </p>
                            <CodeBlock language="typescript">
                                {`"use client";

import { useEffect, useState } from "react";
import { useUIStore, useHasHydrated } from "@/stores/useUIStore";

export function ClientComponent() {
  const hasHydrated = useHasHydrated();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !hasHydrated) {
    return <div>Loading...</div>;
  }

  return <div>Hydrated content</div>;
}`}
                            </CodeBlock>
                        </Section>

                        <Section title={t('zustandTutorial.middleware.title')}>
                            <p className="text-foreground/90 mb-4">
                                {t('zustandTutorial.middleware.description')}
                            </p>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2">
                                        {t('zustandTutorial.middleware.persist')}
                                    </h4>
                                    <p className="text-foreground/80 text-sm mb-2">
                                        {t('zustandTutorial.middleware.persistDescription')}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2">
                                        {t('zustandTutorial.middleware.devtools')}
                                    </h4>
                                    <p className="text-foreground/80 text-sm mb-2">
                                        {t('zustandTutorial.middleware.devtoolsDescription')}
                                    </p>
                                </div>
                            </div>
                        </Section>

                        <Section title={t('zustandTutorial.bestPractices.title')}>
                            <ul className="space-y-3 list-disc list-inside text-foreground/80">
                                <li>{t('zustandTutorial.bestPractices.practice1')}</li>
                                <li>{t('zustandTutorial.bestPractices.practice2')}</li>
                                <li>{t('zustandTutorial.bestPractices.practice3')}</li>
                                <li>{t('zustandTutorial.bestPractices.practice4')}</li>
                                <li>{t('zustandTutorial.bestPractices.practice5')}</li>
                            </ul>
                        </Section>

                        <Section title={t('zustandTutorial.resources.title')}>
                            <ul className="space-y-2">
                                <li>
                                    <a
                                        href="https://zustand-demo.pmnd.rs/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline"
                                    >
                                        {t('zustandTutorial.resources.officialDocs')} →
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://github.com/pmndrs/zustand"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline"
                                    >
                                        {t('zustandTutorial.resources.github')} →
                                    </a>
                                </li>
                            </ul>
                        </Section>
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground border-b border-border pb-2">
                {title}
            </h2>
            {children}
        </section>
    );
}

function CodeBlock({
    children,
    language = 'typescript',
    title,
}: {
    children: string;
    language?: string;
    title?: string;
}) {
    return (
        <div className="rounded-lg border border-border overflow-hidden bg-card">
            {title && (
                <div className="px-4 py-2 bg-muted border-b border-border">
                    <p className="text-sm font-mono text-muted-foreground">{title}</p>
                </div>
            )}
            <pre className="p-4 overflow-x-auto">
                <code className={`language-${language} text-sm`}>{children}</code>
            </pre>
        </div>
    );
}
