import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
    test('should navigate to Getting Started page', async ({ page }) => {
        await page.goto('/en');
        await page.click('text=Get Started');
        await expect(page).toHaveURL('/en/getting-started');
        await expect(
            page.getByRole('heading', { name: /Getting Started with Next.js 16/i })
        ).toBeVisible();
    });

    test('should navigate to Learn More page', async ({ page }) => {
        await page.goto('/en');
        await page.click('text=Learn More');
        await expect(page).toHaveURL('/en/learn-more');
        await expect(
            page.getByRole('heading', { name: /Learn More About This Boilerplate/i })
        ).toBeVisible();
    });

    test('should navigate to Routing Guide page', async ({ page }) => {
        await page.goto('/en');
        await page.click('text=View Routing Guide');
        await expect(page).toHaveURL('/en/routing-guide');
        await expect(
            page.getByRole('heading', { name: /Routing Guide for Next.js 16/i })
        ).toBeVisible();
    });

    test('should navigate back to home from Getting Started', async ({ page }) => {
        await page.goto('/en/getting-started');
        await page.click('a:has-text("←")');
        await expect(page).toHaveURL('/en');
    });

    test('should navigate between pages using header logo', async ({ page }) => {
        await page.goto('/en/learn-more');
        await page.click('h1:has-text("Next.js 16 Boilerplate")');
        await expect(page).toHaveURL('/en');
    });

    test('should redirect root to default locale', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveURL('/en');
    });

    test('should have working internal links on Getting Started page', async ({ page }) => {
        await page.goto('/en/getting-started');

        const learnMoreButton = page.getByRole('link', { name: /Learn More/i });
        await learnMoreButton.click();
        await expect(page).toHaveURL('/en/learn-more');
    });

    test('should have working internal links on Learn More page', async ({ page }) => {
        await page.goto('/en/learn-more');

        const getStartedButton = page.getByRole('link', { name: /Get Started/i });
        await getStartedButton.click();
        await expect(page).toHaveURL('/en/getting-started');
    });

    test('should have working cross-links between all pages', async ({ page }) => {
        await page.goto('/en');

        await page.click('text=Get Started');
        await expect(page).toHaveURL('/en/getting-started');

        await page.getByRole('link', { name: /Learn More/i }).click();
        await expect(page).toHaveURL('/en/learn-more');

        await page.getByRole('link', { name: /Back.*Home/i }).click();
        await expect(page).toHaveURL('/en');

        await page.click('text=View Routing Guide');
        await expect(page).toHaveURL('/en/routing-guide');

        await page.getByRole('link', { name: /Get Started/i }).click();
        await expect(page).toHaveURL('/en/getting-started');
    });
});
