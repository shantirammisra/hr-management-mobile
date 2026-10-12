# Changelog

All notable changes to the **Healthcare HR Management Platform** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- Geofenced mobile punch-in/out verification with latitude/longitude boundary checking.
- Automated shift swap workflow with peer acceptance and supervisor approval tiers.
- Push notifications for upcoming night shifts and pending leave requests via Expo Notifications.
- Biometric local authentication (FaceID / Fingerprint) integration using `expo-local-authentication`.

---

## [0.3.0] - 2026-10-12

### Added
- Standardized repository documentation suite:
  - `DESIGN.md`: Machine-readable YAML design tokens and UI rationale.
  - `DEVLOG.md`: Chronological engineering notes and sprint logs.
  - `PRD.md`: Product Requirements Document with clinical user personas and council compliance.
  - `GDD.md`: Gamification Design Document for healthcare staff retention and shift punctuality.
  - `ROADMAP.md`: Multi-phase product and engineering roadmap.
  - `ARCHITECTURE.md`: Monorepo, client, backend, and security architecture.
  - `TESTING.md`: Monorepo testing strategies across Vitest, Jest, RNTL, and Maestro.
  - `LICENSE.md`: MIT Open Source License.
- Updated root `README.md` as the unified master portal for developers and auditors.

### Changed
- Re-aligned mobile styling references to strict 48x48 dp touch target metrics to support clinical nitrile glove usage.
- Refined environment segregation guides across local development and production environments.

---

## [0.2.0] - 2026-10-12

### Added
- Monorepo structure separating client application (`Mobile/`) and backend services (`server/`).
- Mobile framework baseline utilizing Expo SDK 57, Expo Router, TypeScript, and Continuous Native Generation (CNG).
- Backend service scaffolding utilizing NestJS v12 with modular architecture, Prisma ORM, and Supabase PostgreSQL.
- Comprehensive blueprints in `docs/`:
  - `01-features-specification.md`: Functional requirements for clinical HR.
  - `02-user-roles-and-permissions.md`: RBAC matrix across Super Admin, HR Admin, Dept Head, Staff, and Auditor.
  - `03-design-system.md`: Pink Healthcare theme specifications and StyleSheet tokens.
  - `04-screens-and-wireframes.md`: Mobile wireframes for 16 core screens.
  - `05-mobile-architecture.md`: Zustand, TanStack Query, and offline sync mechanics.
  - `06-api-backend-integration.md`: REST API contracts and DTO schemas.
  - `07-mobile-testing-plan.md`: Unit, component, and E2E testing outlines.
  - `08-miro-board-blueprint.md`: Miro board structure and deliverables.
- Segregated environment files (`.env.local`, `.env.production`) and `.env.example` templates.

### Security
- Verified strict zero-secret policy with repository-wide `.gitignore` rules.
- Defined JWT access token (15m) and refresh token (7d) rotation mechanism.

---

## [0.1.0] - 2026-10-12

### Added
- Initial project repository creation.
- License initialization.
- Base monorepo directory skeleton.
