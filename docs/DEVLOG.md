# Engineering Developer Log (DEVLOG)

> **Healthcare HR Management Platform — Monorepo Engineering Chronicles**  
> Tracks architectural milestones, technical decisions, bug triage, and implementation progress.

---

## 📅 Chronological Engineering Journal

### Sprint 1: Repository Genesis & Monorepo Separation
**Date:** 2026-10-12  
**Focus:** Monorepo restructuring, architecture alignment, and environment configuration hardening.

#### 🎯 Objectives
- Disentangle mixed repository assets into clean boundaries: `Mobile/` (Expo SDK 57 / React Native) and `server/` (NestJS REST API).
- Author comprehensive system blueprints and clinical domain models in `docs/`.
- Establish zero-secret git hygiene and segregated environment templates (`.env.local` vs `.env.production`).

#### 🛠️ Work Done
1. **Directory Modularization**:
   - Isolated Expo React Native app in `Mobile/` with Continuous Native Generation (CNG) principles.
   - Isolated NestJS backend service in `server/` with modular controllers, services, and Prisma ORM integration.
   - Unified repository gitignore to prevent leakage of credentials, build caches, and sensitive keys.
2. **Environment Template Engine**:
   - Authored `.env.example` templates across root, `Mobile/`, and `server/`.
   - Created active `.env.local` and `.env.production` profiles for local containerized dev and production deployments.
3. **Clinical Blueprinting**:
   - Documented 8 core blueprint modules covering functional specifications, RBAC matrix, Pink Healthcare UI tokens, wireframes, mobile architecture, API contracts, testing strategy, and Miro boards.

#### 💡 Key Decisions & Rationale
- **Pink Healthcare Palette**: Abandoned generic hospital blue in favor of deep raspberry rose (`#BE185D`) on petal tint (`#FFF1F7`) to lower night-shift eye fatigue and improve visual warmth while retaining clinical authority.
- **Expo Router & CNG**: Strictly prohibited manual editing of `ios/` and `android/` folders. Native capabilities will be managed through Expo config plugins to prevent drift across updates.
- **Supabase & Prisma**: Selected Supabase as the PostgreSQL host, using port 6543 (transaction pooler) for runtime server queries and port 5432 for direct migrations.

---

### Sprint 2: Clinical Domain Modeling & Regulatory Council Compliance
**Date:** 2026-10-12  
**Focus:** Healthcare regulatory compliance models (NNC, NPC, NMC) and mobile state management architecture.

#### 🎯 Objectives
- Define Prisma schema models for staff profiles with medical council registration verification.
- Establish Zustand stores and TanStack Query caching policies for attendance calendars and shift rosters.

#### 🛠️ Work Done
1. **Medical Council Integration**:
   - Integrated regulatory body fields:
     - **Nepal Nursing Council (NNC)**: Registration number, issue date, renewal validity.
     - **Nepal Pharmacy Council (NPC)**: License verification and grade level.
     - **Nepal Medical Council (NMC)**: Specialist certification and doctor registration.
2. **Attendance & Punch Mechanics**:
   - Designed dual punch engine: geofenced GPS mobile validation and biometric terminal fallback.
   - Formulated visual split-calendar: top monthly status grid + bottom daily tactile card stream.

#### 🐛 Hurdles & Mitigations
- **Issue**: Nitrile gloves on clinical wards cause touch target misses on compact mobile screens.
- **Solution**: Enforced a minimum 48x48 dp touch target rule across all interactive chips, tab bars, and calendar cells.

---

### Sprint 3: Documentation Hub & Monorepo Governance
**Date:** 2026-10-12  
**Focus:** Repository-level documentation standardization (`DESIGN.md`, `PRD.md`, `ROADMAP.md`, `GDD.md`, `ARCHITECTURE.md`, `TESTING.md`).

#### 🎯 Objectives
- Establish complete root-level markdown documentation to guide open-source contributors, QA automation engineers, and clinical auditors.
- Define Gamification Design Document (`GDD.md`) tailored to clinical shift wellness and punctuality streaks.

#### 🛠️ Work Done
- Generated standardized documentation suite covering product requirements, gaming/engagement mechanics, system architecture, test harnesses, release changelogs, and licensing.
- Updated root `README.md` as the unified master portal.

---

## 🔭 Next Sprint Backlog

- [ ] **Mobile Auth Flow**: Implement Expo Router `(auth)/login` screen with biometrics and refresh token rotation.
- [ ] **Calendar Component**: Build high-performance monthly grid with day-level color dots using React Native Reanimated.
- [ ] **NestJS Attendance Module**: Scaffold `attendance.controller.ts`, `attendance.service.ts`, and Prisma schema migrations.
- [ ] **Maestro E2E Flows**: Write automated test flow for punch-in, shift view, and leave request submission.
