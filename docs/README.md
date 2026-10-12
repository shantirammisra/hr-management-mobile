# Healthcare HR Management Mobile Application Blueprint

> **System Blueprint & Architecture Documentation**  
> **Platform:** React Native (Expo SDK 52+, TypeScript)  
> **Target OS:** Android & iOS (Mobile Only)  
> **Design Theme:** Pink & White Healthcare (#BE185D, #FCE7F3, #FFF1F7)  
> **Backend Target:** NestJS REST API with PostgreSQL & Prisma  

---

## 1. Executive Summary

This documentation repository contains the complete engineering, architectural, and UI/UX design blueprint for a mobile-first **Healthcare Human Resources (HR) Management Application**. 

Designed specifically for clinical, administrative, and paramedical operations in healthcare environments (hospitals, clinics, diagnostic centers), the application streamlines authentication, staff profiling (including regulatory council registrations like **Nepal Nursing Council [NNC]** and **Nepal Pharmacy Council [NPC]**), daily attendance tracking, shift monitoring, leave workflows, and executive reporting.

The application adheres strictly to **mobile-first architectural principles**, providing an intuitive, touch-friendly, high-contrast, accessible interface designed around an elegant healthcare pink-and-white theme.

---

## 2. Blueprint Documentation Structure

The documentation is organized into modular specifications covering all facets of the mobile application lifecycle:

| Document | Title | Description |
| :--- | :--- | :--- |
| **[PRD.md](PRD.md)** | **Product Requirements Document** | Clinical personas, statutory councils (NNC/NPC/NMC), attendance requirements, and hospital metrics. |
| **[ARCHITECTURE.md](ARCHITECTURE.md)** | **System Architecture & ERD** | Monorepo topology, mobile and backend design, database entity diagrams, and offline synchronization. |
| **[DESIGN.md](DESIGN.md)** | **Design System Tokens** | Machine-readable YAML design tokens, typography, glove-friendly ergonomics, and component specs. |
| **[GDD.md](GDD.md)** | **Gamification Design Document** | Staff engagement engine, Vitality Points, shift hero badges, punctuality streaks, and anti-burnout rules. |
| **[ROADMAP.md](ROADMAP.md)** | **Strategic Product Roadmap** | Release roadmap from monorepo foundation to enterprise hospital multi-tenant scaling. |
| **[TESTING.md](TESTING.md)** | **Testing Strategy & Harness** | Full-stack testing pyramid: Vitest, RNTL component tests, Maestro mobile E2E flows, and CI gates. |
| **[DEVLOG.md](DEVLOG.md)** | **Developer Engineering Log** | Chronological sprint chronicles, technical hurdles, architecture milestones, and active tasks. |
| **[01-features-specification.md](01-features-specification.md)** | **Functional Features Specification** | Exhaustive functional specifications for Auth, Profiles, Attendance Calendar, Leave Management, Role-Based Dashboards, Directories, Reports, and System Settings. |
| **[02-user-roles-and-permissions.md](02-user-roles-and-permissions.md)** | **User Roles & RBAC Matrix** | Role definitions (Super Admin, HR Admin, Dept Head, Staff, Auditor) and granular screen/action-level permission matrix. |
| **[03-design-system.md](03-design-system.md)** | **Pink Healthcare UI Design System** | Color tokens, typography, elevation, iconography, status palettes, touch target metrics, and React Native StyleSheet design tokens. |
| **[04-screens-and-wireframes.md](04-screens-and-wireframes.md)** | **Screen Map & Mobile Wireframes** | Complete screen map and ASCII/structural wireframes for all 16 mobile screens, including responsive behavior and state variants. |
| **[05-mobile-architecture.md](05-mobile-architecture.md)** | **Mobile Application Architecture** | Folder architecture, state management (TanStack Query + Zustand), form validation (React Hook Form + Zod), secure storage, offline sync, and TypeScript models. |
| **[06-api-backend-integration.md](06-api-backend-integration.md)** | **API Integration & Contracts** | NestJS REST API endpoints, DTO contracts, JWT session mechanics, error schemas, and mobile networking layer. |
| **[07-mobile-testing-plan.md](07-mobile-testing-plan.md)** | **Mobile Testing Strategy** | Unit/Component testing (Jest + RNTL), E2E test scripts (Maestro), Supertest API integration tests, offline resilience, and device matrix. |
| **[08-miro-board-blueprint.md](08-miro-board-blueprint.md)** | **Miro Board Deliverables & Roadmap** | 12 interactive visual board items: sitemaps, flowcharts, component trees, state transition diagrams, access matrices, and MVP roadmap. |

---

## 3. Technology & Framework Baseline

```
+-----------------------------------------------------------------+
|                    Mobile Client Application                    |
|  - React Native 0.76+ (React 18 / React 19 architecture)        |
|  - Expo SDK (Managed Workflow, CNG - Continuous Native Gen)     |
|  - Expo Router (File-based typed routing)                       |
|  - TypeScript (Strict mode enabled)                             |
|  - UI: React Native StyleSheet + Custom Pink Design Tokens      |
|  - State: Zustand (Global/Session) + TanStack Query v5 (Server) |
|  - Storage: expo-secure-store (Keychain/Keystore) + MMKV        |
+-----------------------------------------------------------------+
                                | HTTPS / TLS 1.3
                                v
+-----------------------------------------------------------------+
|                      NestJS Backend REST API                    |
|  - Modular NestJS Controllers, Services & Guards                |
|  - Passport JWT / Refresh Token Rotation Strategy               |
|  - Prisma ORM + PostgreSQL Database                             |
+-----------------------------------------------------------------+
```

---

## 4. Design Tenets & Mobile Rules

1. **Strictly Mobile:** No desktop wide-tables, web layout conventions, or browser APIs. All interactions rely on native mobile primitives: touch gestures, bottom sheets, floating action bars, compact lists, and modal drawers.
2. **Healthcare Regulatory Compliance:** Explicit support for South Asian/Nepalese healthcare bodies (**Nepal Nursing Council - NNC**, **Nepal Pharmacy Council - NPC**, **Nepal Medical Council - NMC**).
3. **Robust Attendance First:** Mobile calendar display prioritizes the monthly visual calendar grid on the upper half, with date-wise check-in/out, shift details, and punch remarks displayed directly beneath in tactile cards.
4. **Resilient Offline UX:** Graceful degradation with optimistic UI updates for leave requests and offline viewing of synced attendance/profile data.
