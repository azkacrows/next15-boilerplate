import { test, expect } from '@playwright/test';
import { existsSync } from 'fs';
import { join } from 'path';

const locales = ['en', 'id', 'ja'];

test.describe('Static Export Build Verification', () => {
    test('build output directory should exist', () => {
        const outDir = join(process.cwd(), 'out');
        expect(existsSync(outDir)).toBeTruthy();
    });

    test('all locale directories should be generated', () => {
        const outDir = join(process.cwd(), 'out');

        for (const locale of locales) {
            const localeDir = join(outDir, locale);
            expect(existsSync(localeDir), `Locale directory ${locale} should exist`).toBeTruthy();
        }
    });

    test('index.html should exist in each locale', () => {
        const outDir = join(process.cwd(), 'out');

        for (const locale of locales) {
            const indexPath = join(outDir, locale, 'index.html');
            expect(
                existsSync(indexPath),
                `index.html should exist for locale ${locale}`
            ).toBeTruthy();
        }
    });

    test('key pages should be generated for each locale', () => {
        const outDir = join(process.cwd(), 'out');
        const keyPages = ['getting-started', 'learn-more', 'routing-guide', 'changelog'];

        for (const locale of locales) {
            for (const page of keyPages) {
                const pagePath = join(outDir, locale, page, 'index.html');
                expect(
                    existsSync(pagePath),
                    `${page}/index.html should exist for locale ${locale}`
                ).toBeTruthy();
            }
        }
    });

    test('404.html should be generated', () => {
        const outDir = join(process.cwd(), 'out');
        const notFoundPath = join(outDir, '404.html');
        expect(existsSync(notFoundPath)).toBeTruthy();
    });

    test('static assets directory should exist', () => {
        const outDir = join(process.cwd(), 'out');
        const nextDir = join(outDir, '_next');
        expect(existsSync(nextDir)).toBeTruthy();
    });
});

test.describe('Page Accessibility Tests', () => {
    for (const locale of locales) {
        test.describe(`Locale: ${locale}`, () => {
            test(`homepage (/${locale}/) should return 200`, async ({ page }) => {
                const response = await page.goto(`/${locale}/`);
                expect(response?.status()).toBe(200);
            });

            test(`getting-started page should return 200`, async ({ page }) => {
                const response = await page.goto(`/${locale}/getting-started/`);
                expect(response?.status()).toBe(200);
            });

            test(`learn-more page should return 200`, async ({ page }) => {
                const response = await page.goto(`/${locale}/learn-more/`);
                expect(response?.status()).toBe(200);
            });

            test(`routing-guide page should return 200`, async ({ page }) => {
                const response = await page.goto(`/${locale}/routing-guide/`);
                expect(response?.status()).toBe(200);
            });

            test(`changelog page should return 200`, async ({ page }) => {
                const response = await page.goto(`/${locale}/changelog/`);
                expect(response?.status()).toBe(200);
            });
        });
    }
});

test.describe('Content Verification', () => {
    test('homepage should have correct title for English', async ({ page }) => {
        await page.goto('/en/');
        await expect(page).toHaveTitle(/Next\.js 16 Boilerplate/);
    });

    test('homepage should have main heading', async ({ page }) => {
        await page.goto('/en/');
        const heading = page.locator('h1').first();
        await expect(heading).toBeVisible();
        await expect(heading).toContainText('Next.js 16 Boilerplate');
    });

    test('changelog should display content', async ({ page }) => {
        await page.goto('/en/changelog/');
        const article = page.locator('article');
        await expect(article).toBeVisible();
        await expect(page.locator('h1')).toContainText('Changelog');
    });

    test('locale switcher should be present on all pages', async ({ page }) => {
        const pages = ['/en/', '/en/getting-started/', '/en/learn-more/', '/en/changelog/'];

        for (const pagePath of pages) {
            await page.goto(pagePath);
            const localeSwitcher = page.locator('select');
            await expect(localeSwitcher).toBeVisible();
        }
    });
});

test.describe('Performance Checks', () => {
    test('homepage should load quickly', async ({ page }) => {
        const startTime = Date.now();
        await page.goto('/en/');
        const loadTime = Date.now() - startTime;

        expect(loadTime).toBeLessThan(3000);
    });

    test('no console errors on homepage', async ({ page }) => {
        const errors: string[] = [];
        page.on('console', (msg) => {
            if (msg.type() === 'error') {
                errors.push(msg.text());
            }
        });

        await page.goto('/en/');
        await page.waitForLoadState('networkidle');

        expect(errors).toEqual([]);
    });
});
