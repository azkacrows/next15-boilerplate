import { test, expect } from '@playwright/test';

test.describe('Internationalization', () => {
    test('should load English locale', async ({ page }) => {
        await page.goto('/en');
        await expect(page.getByText('Next.js 16 Boilerplate')).toBeVisible();
        await expect(page.getByText('Get Started')).toBeVisible();
    });

    test('should load Indonesian locale', async ({ page }) => {
        await page.goto('/id');
        await expect(page.getByText('Next.js 16 Boilerplate')).toBeVisible();
        await expect(page.getByText('Memulai')).toBeVisible();
    });

    test('should load Japanese locale', async ({ page }) => {
        await page.goto('/ja');
        await expect(page.getByText('Next.js 16 Boilerplate')).toBeVisible();
        await expect(page.getByText('始める')).toBeVisible();
    });

    test('should have working locale switcher', async ({ page }) => {
        await page.goto('/en');

        const localeSelect = page.locator('select');
        await expect(localeSelect).toBeVisible();

        await localeSelect.selectOption('id');
        await page.waitForURL('/id');
        await expect(page).toHaveURL('/id');
        await expect(page.getByText('Memulai')).toBeVisible();
    });

    test('should maintain path when switching locales', async ({ page }) => {
        await page.goto('/en/getting-started');

        const localeSelect = page.locator('select');
        await localeSelect.selectOption('id');

        await page.waitForURL('/id/getting-started');
        await expect(page).toHaveURL('/id/getting-started');
    });

    test('should have correct lang attribute for each locale', async ({ page }) => {
        await page.goto('/en');
        await expect(page.locator('html')).toHaveAttribute('lang', 'en');

        await page.goto('/id');
        await expect(page.locator('html')).toHaveAttribute('lang', 'id');

        await page.goto('/ja');
        await expect(page.locator('html')).toHaveAttribute('lang', 'ja');
    });

    test('should translate footer in all locales', async ({ page }) => {
        await page.goto('/en');
        await expect(page.getByText(/Made with ☕ and 😴 by azkacrows/)).toBeVisible();

        await page.goto('/id');
        await expect(page.getByText(/Dibuat dengan ☕ dan 😴 oleh azkacrows/)).toBeVisible();

        await page.goto('/ja');
        await expect(page.getByText(/azkacrowsが☕と😴で作成/)).toBeVisible();
    });
});
