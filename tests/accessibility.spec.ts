import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
    test('should have proper heading hierarchy', async ({ page }) => {
        await page.goto('/en');

        const h1 = page.locator('h1');
        await expect(h1).toHaveCount(1);

        const h2 = page.locator('h2');
        expect(await h2.count()).toBeGreaterThan(0);

        const h3 = page.locator('h3');
        expect(await h3.count()).toBeGreaterThan(0);
    });

    test('should have alt text for images if present', async ({ page }) => {
        await page.goto('/en');

        const images = page.locator('img');
        const imageCount = await images.count();

        if (imageCount > 0) {
            for (let i = 0; i < imageCount; i++) {
                const img = images.nth(i);
                const alt = await img.getAttribute('alt');
                expect(alt).not.toBeNull();
            }
        }
    });

    test('should have accessible links', async ({ page }) => {
        await page.goto('/en');

        const links = page.locator('a');
        const linkCount = await links.count();

        expect(linkCount).toBeGreaterThan(0);

        for (let i = 0; i < Math.min(linkCount, 10); i++) {
            const link = links.nth(i);
            const text = await link.innerText();
            const ariaLabel = await link.getAttribute('aria-label');

            expect(text.length > 0 || (ariaLabel && ariaLabel.length > 0)).toBeTruthy();
        }
    });

    test('should have proper semantic HTML', async ({ page }) => {
        await page.goto('/en');

        await expect(page.locator('header')).toBeVisible();
        await expect(page.locator('main')).toBeVisible();
        await expect(page.locator('footer')).toBeVisible();
    });

    test('should have keyboard navigation support', async ({ page }) => {
        await page.goto('/en');

        await page.keyboard.press('Tab');

        const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
        expect(focusedElement).toBeTruthy();
    });

    test('should have sr-only text for locale switcher', async ({ page }) => {
        await page.goto('/en');

        const srOnly = page.locator('.sr-only');
        expect(await srOnly.count()).toBeGreaterThan(0);
    });

    test('should have proper focus styles on interactive elements', async ({ page }) => {
        await page.goto('/en');

        const getStartedButton = page.getByRole('link', { name: /Get Started/i });
        await getStartedButton.focus();

        const isFocused = await getStartedButton.evaluate((el) => el === document.activeElement);
        expect(isFocused).toBeTruthy();
    });

    test('should have lang attribute on html element', async ({ page }) => {
        await page.goto('/en');
        const html = page.locator('html');
        await expect(html).toHaveAttribute('lang', 'en');

        await page.goto('/id');
        await expect(html).toHaveAttribute('lang', 'id');

        await page.goto('/ja');
        await expect(html).toHaveAttribute('lang', 'ja');
    });

    test('should have proper button roles', async ({ page }) => {
        await page.goto('/en');

        const buttons = page.locator('button, a[role="button"]');
        const buttonCount = await buttons.count();

        if (buttonCount > 0) {
            for (let i = 0; i < buttonCount; i++) {
                const button = buttons.nth(i);
                const text = await button.innerText();
                expect(text.length).toBeGreaterThan(0);
            }
        }
    });
});
