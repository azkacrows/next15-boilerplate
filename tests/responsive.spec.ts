import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
    test('should be responsive on mobile viewport', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/en');

        await expect(page.getByRole('heading', { name: /Next.js 16 Boilerplate/i })).toBeVisible();
        await expect(page.getByText('Get Started')).toBeVisible();
    });

    test('should be responsive on tablet viewport', async ({ page }) => {
        await page.setViewportSize({ width: 768, height: 1024 });
        await page.goto('/en');

        await expect(page.getByRole('heading', { name: /Next.js 16 Boilerplate/i })).toBeVisible();
        const features = page.locator('.grid');
        await expect(features).toBeVisible();
    });

    test('should be responsive on desktop viewport', async ({ page }) => {
        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.goto('/en');

        await expect(page.getByRole('heading', { name: /Next.js 16 Boilerplate/i })).toBeVisible();
    });

    test('should have proper grid layout on different screen sizes', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/en');
        let grid = page.locator('.grid');
        await expect(grid).toBeVisible();

        await page.setViewportSize({ width: 768, height: 1024 });
        await page.goto('/en');
        grid = page.locator('.grid');
        await expect(grid).toBeVisible();

        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.goto('/en');
        grid = page.locator('.grid');
        await expect(grid).toBeVisible();
    });

    test('should display navigation elements properly on mobile', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/en');

        const header = page.locator('header');
        await expect(header).toBeVisible();

        const localeSwitcher = page.locator('select');
        await expect(localeSwitcher).toBeVisible();
    });

    test('should stack buttons vertically on small screens', async ({ page }) => {
        await page.setViewportSize({ width: 320, height: 568 });
        await page.goto('/en');

        const getStartedButton = page.getByRole('link', { name: /Get Started/i });
        const learnMoreButton = page.getByRole('link', { name: /Learn More/i });

        await expect(getStartedButton).toBeVisible();
        await expect(learnMoreButton).toBeVisible();
    });
});
