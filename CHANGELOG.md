# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-10-30

### Added
- **Zustand State Management**: Implemented SSR-safe Zustand store (`useUIStore`) with:
  - Sidebar state control
  - Notification banner management
  - localStorage persistence
  - DevTools integration (development only)
  - Full TypeScript support with strict types
- **Changelog System**: Created `/changelog` route to display version history
- **CLS Prevention**: Enhanced Cumulative Layout Shift prevention with:
  - Fixed minimum heights for header (72px) and footer (120px)
  - Reserved dimensions for feature cards (140px min-height)
  - Fixed icon container heights (48px)
  - Target CLS score: < 0.05
- **Smoke Tests**: Added build verification test to ensure static export succeeds
- **Documentation**: Expanded README with:
  - Zustand usage examples
  - CLS optimization strategies
  - Migration steps and rollback procedures
  - Known issues and limitations

### Changed
- **Next.js**: Upgraded from 15.x to 16.0.0
  - Updated to use latest App Router optimizations
  - Verified static export compatibility
  - Applied official codemods where applicable
- **React**: Upgraded from 18.x to 19.1.0
  - Migrated to new JSX transform
  - Updated type definitions
  - Verified Server Components compatibility
- **React DOM**: Upgraded from 18.x to 19.1.0
- **ESLint Config**: Updated `eslint-config-next` to 16.0.0
- **next-intl**: Verified compatibility with Next.js 16 (4.3.12)
- **Package Engines**: Maintained Node.js >=20.0.0 requirement
- **Build Process**: Optimized static export generation
- **Type Safety**: Enforced strict TypeScript with no `any` types

### Fixed
- **Hydration**: Ensured proper SSR/CSR hydration with Zustand
- **Type Errors**: Resolved all TypeScript strict mode violations

## [1.2.0] - 2025-10-20

### Added
- Comprehensive Playwright test suite:
  - Homepage functionality tests
  - Internationalization tests
  - Navigation tests
  - Accessibility tests
  - Responsive design tests
  - SEO metadata tests
- Smoke test script for CI/CD pipelines

### Changed
- Improved test coverage to > 80%
- Enhanced accessibility compliance

## [1.1.0] - 2025-10-15

### Added
- Japanese (ja) locale support
- Indonesian (id) locale support
- Locale switcher component
- SEO metadata for all locales

### Changed
- Restructured i18n configuration for better scalability
- Updated translation file structure

## [1.0.0] - 2025-10-01

### Added
- Initial release with Next.js 16
- App Router architecture
- TypeScript strict mode
- Tailwind CSS 4
- next-intl internationalization
- Static export configuration
- English (en) locale
- SEO optimization (robots.txt, sitemap.xml)
- Development tooling (ESLint, Prettier)
- Production-ready folder structure

---

## Version History

| Version | Release Date | Next.js | React | Notable Changes |
|---------|--------------|---------|-------|-----------------|
| 2.0.0   | 2025-10-30   | 16.0.0  | 19.1.0| Next.js 16 upgrade, Zustand, CLS fixes |
| 1.2.0   | 2025-10-20   | 15.x    | 18.x  | Playwright test suite |
| 1.1.0   | 2025-10-15   | 15.x    | 18.x  | Multi-language support |
| 1.0.0   | 2025-10-01   | 15.x    | 18.x  | Initial release |

---

## Breaking Changes

### v2.0.0
- **React 19**: Some React 18 patterns may be deprecated. Review [React 19 upgrade guide](https://react.dev/blog/2025/04/25/react-19).
- **Next.js 16**: Minor API changes in metadata handling. See [Next.js 16 release notes](https://nextjs.org/blog/next-16).

### v1.0.0
- Initial release, no breaking changes.

---

## Contributing

When contributing to this project:
1. Update this CHANGELOG.md with your changes under `[Unreleased]`
2. Follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages
3. Categorize changes as: Added, Changed, Deprecated, Removed, Fixed, Security
4. Include relevant issue/PR references

## Release Process

1. Move changes from `[Unreleased]` to new version section
2. Update version number in `package.json`
3. Create git tag: `git tag -a v2.0.0 -m "Release v2.0.0"`
4. Push tag: `git push origin v2.0.0`
5. Create GitHub release with CHANGELOG excerpt

---

**Maintained by**: [azkacrows](https://github.com/azkacrows)  
