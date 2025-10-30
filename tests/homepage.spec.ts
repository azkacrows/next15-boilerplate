import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
    test('should load homepage successfully', async ({ page }) => {
        await page.goto('/en');
        await expect(page).toHaveTitle(/Next.js 16 Boilerplate/);
    });

    test('should display main heading', async ({ page }) => {
        await page.goto('/en');
        const heading = page.getByRole('heading', { name: /Next.js 16 Boilerplate/i });
        await expect(heading).toBeVisible();
    });

    test('should display feature cards', async ({ page }) => {
        await page.goto('/en');

        const features = [
            'TypeScript with strict mode',
            'Tailwind CSS 4 with custom theming',
            'Full internationalization support',
            'SEO-ready with metadata API',
            'Static export configured',
            'Optimized for performance',
        ];

        for (const feature of features) {
            await expect(page.getByText(feature)).toBeVisible();
        }
    });

    test('should have working Get Started button', async ({ page }) => {
        await page.goto('/en');
        const getStartedButton = page.getByRole('link', { name: /Get Started/i });
        await expect(getStartedButton).toBeVisible();
        await expect(getStartedButton).toHaveAttribute('href', '/en/getting-started');
    });

    test('should have working Learn More button', async ({ page }) => {
        await page.goto('/en');
        const learnMoreButton = page.getByRole('link', { name: /Learn More/i });
        await expect(learnMoreButton).toBeVisible();
        await expect(learnMoreButton).toHaveAttribute('href', '/en/learn-more');
    });

    test('should display routing guide callout', async ({ page }) => {
        await page.goto('/en');
        await expect(page.getByText('Need Help with Routing?')).toBeVisible();
        const routingGuideLink = page.getByRole('link', { name: /View Routing Guide/i });
        await expect(routingGuideLink).toHaveAttribute('href', '/en/routing-guide');
    });

    test('should display footer with copyright', async ({ page }) => {
        await page.goto('/en');
        const currentYear = new Date().getFullYear();
        await expect(
            page.getByText(new RegExp(`© ${currentYear} All rights reserved`))
        ).toBeVisible();
    });

    test('should display footer with author credit', async ({ page }) => {
        await page.goto('/en');
        await expect(page.getByText(/Made with ☕ and 😴 by azkacrows/)).toBeVisible();
    });

    test('should have Lucide icons rendered', async ({ page }) => {
        await page.goto('/en');
        const icons = page.locator('svg');
        const iconCount = await icons.count();
        expect(iconCount).toBeGreaterThan(0);
    });
});
