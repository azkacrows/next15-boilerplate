import { test, expect } from '@playwright/test';

test.describe('SEO & Metadata', () => {
    test('should have correct page title on homepage', async ({ page }) => {
        await page.goto('/en');
        await expect(page).toHaveTitle(/Next.js 15 Boilerplate/);
    });

    test('should have meta description', async ({ page }) => {
        await page.goto('/en');
        const metaDescription = page.locator('meta[name="description"]');
        await expect(metaDescription).toHaveAttribute('content', /.+/);
    });

    test('should have meta keywords', async ({ page }) => {
        await page.goto('/en');
        const metaKeywords = page.locator('meta[name="keywords"]');
        const content = await metaKeywords.getAttribute('content');
        expect(content).toContain('Next.js');
        expect(content).toContain('TypeScript');
    });

    test('should have author meta tag', async ({ page }) => {
        await page.goto('/en');
        const metaAuthor = page.locator('meta[name="author"]');
        await expect(metaAuthor).toHaveAttribute('content', 'Your Name');
    });

    test('should have Open Graph meta tags', async ({ page }) => {
        await page.goto('/en');
        
        const ogTitle = page.locator('meta[property="og:title"]');
        await expect(ogTitle).toHaveCount(1);
        
        const ogDescription = page.locator('meta[property="og:description"]');
        await expect(ogDescription).toHaveCount(1);
        
        const ogType = page.locator('meta[property="og:type"]');
        await expect(ogType).toHaveAttribute('content', 'website');
        
        const ogLocale = page.locator('meta[property="og:locale"]');
        await expect(ogLocale).toHaveAttribute('content', 'en');
    });

    test('should have Twitter Card meta tags', async ({ page }) => {
        await page.goto('/en');
        
        const twitterCard = page.locator('meta[name="twitter:card"]');
        await expect(twitterCard).toHaveAttribute('content', 'summary_large_image');
        
        const twitterSite = page.locator('meta[name="twitter:site"]');
        await expect(twitterSite).toHaveCount(1);
    });

    test('should have correct canonical URL', async ({ page }) => {
        await page.goto('/en');
        const canonical = page.locator('link[rel="canonical"]');
        await expect(canonical).toHaveCount(1);
        const href = await canonical.getAttribute('href');
        expect(href).toContain('/en');
    });

    test('should have alternate language links', async ({ page }) => {
        await page.goto('/en');
        
        const alternates = page.locator('link[rel="alternate"]');
        const count = await alternates.count();
        expect(count).toBeGreaterThan(0);
        
        // Check for specific language alternates
        const enAlternate = page.locator('link[rel="alternate"][hreflang="en"]');
        await expect(enAlternate).toHaveCount(1);
        
        const idAlternate = page.locator('link[rel="alternate"][hreflang="id"]');
        await expect(idAlternate).toHaveCount(1);
        
        const jaAlternate = page.locator('link[rel="alternate"][hreflang="ja"]');
        await expect(jaAlternate).toHaveCount(1);
    });

    test('should have correct locale in Open Graph for each language', async ({ page }) => {
        await page.goto('/en');
        let ogLocale = page.locator('meta[property="og:locale"]');
        await expect(ogLocale).toHaveAttribute('content', 'en');
        
        await page.goto('/id');
        ogLocale = page.locator('meta[property="og:locale"]');
        await expect(ogLocale).toHaveAttribute('content', 'id');
        
        await page.goto('/ja');
        ogLocale = page.locator('meta[property="og:locale"]');
        await expect(ogLocale).toHaveAttribute('content', 'ja');
    });

    test('should have favicon links', async ({ page }) => {
        await page.goto('/en');
        
        const favicon = page.locator('link[rel="icon"]');
        await expect(favicon).toHaveCount(1);
        
        const appleTouchIcon = page.locator('link[rel="apple-touch-icon"]');
        await expect(appleTouchIcon).toHaveCount(1);
    });

    test('should have manifest link', async ({ page }) => {
        await page.goto('/en');
        const manifest = page.locator('link[rel="manifest"]');
        await expect(manifest).toHaveAttribute('href', '/site.webmanifest');
    });
});
