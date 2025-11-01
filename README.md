# Next.js 16 Boilerplate

A production-ready starter template built with Next.js 16, TypeScript, Tailwind CSS 4, and comprehensive internationalization support. This boilerplate is designed for building scalable, performant web applications with modern development practices and static export capabilities.

> **Note:** This boilerplate was created for my learning purposes and to serve as a reference for modern Next.js development best practices. It demonstrates a centralized type system, comprehensive testing, and production-ready architecture.

## Overview

This boilerplate provides a complete foundation for modern web development, incorporating industry-standard tools and patterns:

**Core Technologies**
- Next.js 16 with App Router and React Server Components
- TypeScript with strict mode enabled for comprehensive type safety
- Tailwind CSS 4 for utility-first styling
- next-intl for complete internationalization functionality
- Zustand for lightweight, type-safe state management
- Playwright for end-to-end testing
- Lucide React for professional SVG icons

**Key Features**
- Static export configuration for deployment to any hosting platform
- SEO optimization with Metadata API, robots.txt, and sitemap generation
- Multi-language support (English, Indonesian, Japanese) with extensible architecture
- Type-safe internationalization system with full TypeScript integration
- Zustand state management with persistence
- Semantic HTML structure
- Scalable folder structure
- TypeScript strict mode for type safety

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Internationalization](#internationalization)
- [Static Export Configuration](#static-export-configuration)
- [SEO and Metadata](#seo-and-metadata)
- [Styling System](#styling-system)
- [Environment Configuration](#environment-configuration)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Development Guidelines](#development-guidelines)

## Getting Started

### System Requirements

The following software must be installed on your development machine:

- **Node.js version 20.0 or higher** (required for Next.js 16)
- npm version 7.0 or higher
- Package manager: npm, yarn, pnpm, or bun

### Installation Procedure

1. Bootstrap a new project using the Next.js template:
```bash
npx create-next-app@latest [project-name] -e https://github.com/azkacrows/next16-boilerplate
cd [project-name]
```

2. Install project dependencies:
```bash
npm install
```

Alternatively, use your preferred package manager (yarn, pnpm, or bun).

### Development Workflow

1. Start the development server with Turbopack:
```bash
npm run dev
```

2. Access the application at `http://localhost:3000/en`

The development server includes hot module replacement for rapid iteration.

### Production Build

Generate optimized static files for production deployment:

```bash
npm run build
```

The build process generates static HTML, CSS, and JavaScript files in the `out/` directory, ready for deployment to any static hosting service.

## Project Structure

```
next16-boilerplate/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── [locale]/             # Locale-based routing
│   │   │   ├── layout.tsx        # Root layout with i18n provider
│   │   │   └── page.tsx          # Homepage
│   │   ├── layout.tsx            # Root wrapper layout
│   │   ├── page.tsx              # Root redirect to default locale
│   │   ├── robots.ts             # Robots.txt generator
│   │   ├── sitemap.ts            # Sitemap.xml generator
│   │   └── styles/
│   │       └── globals.css       # Tailwind CSS configuration
│   ├── components/               # React components
│   │   └── LocaleSwitcher/       # Language switcher component
│   ├── config/                   # Configuration files
│   │   └── metadata.ts           # SEO metadata configuration
│   ├── hooks/                    # Custom React hooks
│   │   └── useLocale.ts          # Locale navigation hook
│   ├── i18n/                     # Internationalization
│   │   ├── routing.ts            # i18n routing configuration
│   │   └── request.ts            # Request-scoped i18n config
│   ├── lib/                      # Utility functions
│   │   └── utils.ts              # Common utilities
│   ├── messages/                 # Translation files
│   │   ├── en.json               # English translations
│   │   ├── id.json               # Indonesian translations
│   │   └── ja.json               # Japanese translations
│   ├── stores/                   # Zustand state stores
│   │   └── useUIStore.ts         # UI state management
│   └── types/                    # TypeScript type definitions
│       ├── i18n.ts               # Locale types
│       └── metadata.ts           # Metadata types
├── public/                      # Static assets
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies & scripts
```

### Directory Structure Rationale

The project follows a clean architecture with clear separation of concerns:

- **`/app`**: Contains Next.js App Router pages, layouts, and route handlers
- **`/components`**: Reusable React components
- **`/config`**: Application configuration files
- **`/hooks`**: Custom React hooks
- **`/i18n`**: Internationalization routing and request configuration
- **`/lib`**: Utility functions and helpers
- **`/messages`**: Translation files in JSON format for each supported locale
- **`/stores`**: Zustand state management stores
- **`/types`**: Centralized TypeScript type definitions and interfaces

This structure provides a solid foundation for building scalable applications.

## Internationalization

### Locale Support

The boilerplate includes translation support for three languages:

- English (en) - Default locale
- Indonesian (id) - Bahasa Indonesia
- Japanese (ja) - 日本語

### Extending Locale Support

To add support for additional languages, follow this procedure:

1. Update the locale type definitions in `src/types/i18n.ts`:
```typescript
export type Locale = "en" | "id" | "ja" | "fr";

export const locales: ReadonlyArray<Locale> = ["en", "id", "ja", "fr"];

export const localeMetadata: Record<Locale, { name: string; nativeName: string }> = {
  // existing locales...
  fr: { name: "French", nativeName: "Français" },
};
```

2. Create a corresponding translation file at `src/messages/fr.json` with the complete translation structure:
```json
{
  "metadata": {
    "title": "...",
    "description": "..."
  },
  "common": { ... },
  "navigation": { ... }
}
```

3. Verify the implementation by navigating to `http://localhost:3000/fr`

### Translation Implementation

**Server Component Pattern:**
```typescript
import { getTranslations } from "next-intl/server";

export default async function MyPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "homePage" });
  
  return <h1>{t("title")}</h1>;
}
```

**Client Component Pattern:**
```typescript
"use client";

import { useTranslations } from "next-intl";

export default function MyComponent() {
  const t = useTranslations("common");
  
  return <button>{t("submit")}</button>;
}
```

### URL Routing Structure

The application implements locale-prefixed routing:

- `https://example.com/en` - English content
- `https://example.com/id` - Indonesian content
- `https://example.com/ja` - Japanese content
- `https://example.com/` - Redirects to default locale (en)

## Static Export Configuration

### Technical Overview

This boilerplate implements static site generation through Next.js's `output: "export"` configuration. The static export approach provides the following characteristics:

**Advantages:**
- All pages are pre-rendered at build time, eliminating server-side processing
- No Node.js runtime environment required for deployment
- Compatible with any static hosting platform (Vercel, Netlify, GitHub Pages, AWS S3, etc.)
- Reduced hosting costs and improved performance through CDN distribution

**Limitations:**
- Server-side runtime features unavailable (API routes, middleware, rewrites)
- No on-demand revalidation or Incremental Static Regeneration
- Image optimization requires manual implementation

### Implementation Details

1. **`generateStaticParams`** in `src/app/[locale]/layout.tsx` pre-generates all locale routes:
```typescript
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
```

2. **`setRequestLocale`** enables static rendering for i18n:
```typescript
setRequestLocale(locale);
```

3. **Build output** generates static HTML files:
```bash
npm run build
# Output: out/en/index.html, out/id/index.html, out/ja/index.html
```

### Comparative Analysis

| Feature | Static Export | Server Runtime |
|---------|--------------|----------------|
| Performance | Instant delivery via CDN | Fast with SSR overhead |
| Hosting Cost | Minimal to free | Higher infrastructure costs |
| Dynamic Data | Build-time only | Real-time updates |
| API Routes | Not supported | Full support |
| Incremental Static Regeneration | Not available | Available |
| Image Optimization | Manual implementation | Automatic processing |

### Migration to Server Runtime

To enable server-side features, modify the configuration as follows:

1. Remove static export configuration from `next.config.ts`:
```typescript
const nextConfig: NextConfig = {
  // Remove: output: "export",
  images: {
    // Remove: unoptimized: true,
  },
};
```

2. Deploy to a platform supporting Node.js runtime (Vercel, AWS Lambda, Railway, etc.)

## SEO and Metadata

### Metadata API Implementation

The project implements Next.js's Metadata API for comprehensive SEO optimization:

```typescript
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "homePage" });

  return generatePageMetadata({
    locale: locale as Locale,
    title: t("title"),
    description: t("description"),
  });
}
```

### Search Engine Configuration

**Robots.txt Generation:**
- Production environment: Permits all search engine crawlers
- Non-production environments: Disallows all crawlers
- Environment detection through `NEXT_PUBLIC_ENV` variable

**Sitemap Generation:**
- Automatically generated for all supported locales
- Implements hreflang alternate language tags via `alternates.languages`
- Extensible through `src/app/sitemap.ts` for additional routes

**Social Media Integration:**

Open Graph and Twitter Card metadata configured in `src/shared/constants/metadata.ts`:
- Default Open Graph image location: `/ogImages/default-og.png`
- Recommended image dimensions: 1200x630 pixels
- Twitter card format: `summary_large_image`

## Styling System

### Tailwind CSS 4 Implementation

The styling system utilizes Tailwind CSS 4 with the following configuration:

- Primary configuration file: `src/app/styles/globals.css`
- Theme customization via CSS variables within `@theme inline` directive
- Dark mode support through CSS custom properties (extensible)

### Class Name Utility

The `cn` utility function provides safe merging of Tailwind CSS classes:

```typescript
import { cn } from "@/shared/lib/utils";

<div className={cn("text-base", isActive && "text-primary")} />
```

This utility prevents class name conflicts and ensures predictable styling outcomes.

## Environment Configuration

Environment variables must be defined in `.env.local` for development or `.env.production` for production builds:

```bash
# Application configuration
NEXT_PUBLIC_SITE_URL=https://example.com
NEXT_PUBLIC_SITE_NAME="Application Name"

# Environment identifier (affects robots.txt behavior)
NEXT_PUBLIC_ENV=production  # Options: development, staging, production
```

Note: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser environment.

## Available Scripts

The following npm scripts are available for development and production workflows:

```bash
# Development workflow
npm run dev          # Initialize development server with Turbopack

# Production workflow
npm run build        # Generate optimized static export in /out directory
npm run start        # Serve static files using serve (from out/ folder)

# Code quality assurance
npm run lint         # Execute ESLint analysis
npm run lint:fix     # Automatically resolve ESLint violations
npm run type-check   # Perform TypeScript type validation
npm run validate     # Execute comprehensive validation (types, linting, formatting)
```

## Deployment

### Static Hosting Platforms

The static export architecture enables deployment to various hosting services:

**Vercel Deployment:**
```bash
vercel deploy
```

**Netlify Configuration:**

Create `netlify.toml` in the project root:
```toml
[build]
  command = "npm run build"
  publish = "out"
```

**Alternative Static Hosts:**

For GitHub Pages, AWS S3, or Cloudflare Pages:
1. Execute `npm run build` to generate static files
2. Upload contents of the `out/` directory to the hosting platform

### Server Runtime Deployment

For applications requiring server-side features:
- Deploy to platforms supporting Node.js runtime (Vercel, Railway, Render)
- Ensure production environment uses `npm start` command
- Remove `output: "export"` from `next.config.ts` before deployment

## Development Guidelines

### Performance Optimization

- Utilize Server Components as the default rendering strategy
- Apply `"use client"` directive only for components requiring client-side interactivity
- Implement code splitting through `next/dynamic` for large components
- Optimize images using modern formats (WebP/AVIF) with appropriate `sizes` and `loading` attributes

### TypeScript Standards

- Avoid `any` type; use `unknown` with proper type narrowing when type is indeterminate
- Define explicit return types for all public functions and exported APIs
- Consolidate shared type definitions in the `/types` directory

### Internationalization Patterns

- Implement translations in Server Components when feasible for improved performance
- Use `getTranslations` (async function) within Server Components
- Use `useTranslations` (React hook) within Client Components

### Accessibility Requirements

- Employ semantic HTML elements (`<nav>`, `<main>`, `<article>`, `<section>`)
- Include `aria-label` attributes for interactive elements lacking visible text
- Verify keyboard navigation functionality (Tab, Enter, Escape, Arrow keys)

## Contributing

Contributions are welcome following these procedures:

1. Fork the repository to your GitHub account
2. Create a feature branch: `git checkout -b feature/descriptive-name`
3. Implement changes with clear, descriptive commit messages
4. Push changes to your fork: `git push origin feature/descriptive-name`
5. Submit a Pull Request with detailed description of changes

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute this boilerplate for personal or commercial projects.

## Acknowledgments

This boilerplate is built upon the following open-source technologies:

- [Next.js](https://nextjs.org/) - React-based web application framework
- [next-intl](https://next-intl-docs.vercel.app/) - Internationalization library for Next.js
- [Zustand](https://zustand-demo.pmnd.rs/) - Lightweight state management
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript superset
- [Playwright](https://playwright.dev/) - End-to-end testing framework

---

**Created by:** [azkacrows](https://github.com/azkacrows)
