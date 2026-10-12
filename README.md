# Healthcare HR Management System

Welcome to the **Healthcare HR Management System** repository. This enterprise monorepo houses the complete system architecture, the mobile client application, and the NestJS backend API service for the Healthcare Human Resources (HR) Management platform.

Designed specifically for acute, ambulatory, and clinical hospital environments, the system automates staff profiling, regulatory council licensing verification (**Nepal Nursing Council [NNC]**, **Nepal Pharmacy Council [NPC]**, **Nepal Medical Council [NMC]**), geofenced and biometric attendance tracking, rotational shift scheduling, multi-tier leave workflows, and compassionate staff engagement gamification.

---

## 📚 Complete Project Documentation Index

| Document | Location | Purpose & Scope |
| :--- | :--- | :--- |
| **[README.md](README.md)** | Root | Master repository portal, quick start guides, and monorepo overview. |
| **[CHANGELOG.md](CHANGELOG.md)** | Root | **Release Changelog**: Semantic versioning records detailing unreleased and tagged version updates. |
| **[LICENSE.md](LICENSE.md)** | Root | **Project License**: MIT open-source license terms and copyright. |
| **[PRD.md](docs/PRD.md)** | `docs/` | **Product Requirements Document**: Clinical personas, regulatory compliance, functional & non-functional requirements. |
| **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** | `docs/` | **System Architecture**: High-level topology, mobile client, backend services, ERD, and offline sync mechanics. |
| **[DESIGN.md](docs/DESIGN.md)** | `docs/` | **Design System & Tokens**: Pink Healthcare theme tokens, typography, glove-friendly ergonomics, and component specs. |
| **[GDD.md](docs/GDD.md)** | `docs/` | **Gamification Design Document**: Staff engagement engine, Vitality Points, punctuality streaks, and anti-burnout guardrails. |
| **[ROADMAP.md](docs/ROADMAP.md)** | `docs/` | **Product & Engineering Roadmap**: Multi-phase milestones from foundation through enterprise hospital scale. |
| **[TESTING.md](docs/TESTING.md)** | `docs/` | **Testing Strategy & Guide**: Unit testing, mobile component testing (RNTL), E2E flows (Maestro), and API testing. |
| **[DEVLOG.md](docs/DEVLOG.md)** | `docs/` | **Developer Engineering Journal**: Chronological sprint chronicles, technical hurdles, and implementation notes. |

*For deep architectural blueprints and wireframe schematics, refer to the [`docs/`](./docs) directory.*

---

## 📁 Repository Structure

```
hr/
├── Mobile/                  # React Native (Expo SDK 57) Mobile Application
│   ├── assets/              # Static media, icons, and splash screens
│   ├── src/                 # Expo Router typed screens, components, hooks, stores
│   ├── app.json             # Expo config plugins (Continuous Native Generation)
│   ├── package.json         # Mobile dependencies and run scripts
│   ├── tsconfig.json        # TypeScript configuration
│   └── .env.example         # Mobile environment variable template
├── server/                  # NestJS REST API Gateway & Backend Service
│   ├── src/                 # NestJS controllers, services, guards, Prisma client
│   ├── test/                # E2E integration test suites (Supertest)
│   ├── nest-cli.json        # NestJS CLI configuration
│   ├── package.json         # Backend dependencies and run scripts
│   ├── tsconfig.json        # TypeScript configuration
│   └── .env.example         # Backend environment variable template
├── docs/                    # Central Documentation Hub
│   ├── PRD.md               # Product Requirements Document
│   ├── ARCHITECTURE.md      # System topology & data architecture
│   ├── DESIGN.md            # Pink Healthcare design tokens & UI specs
│   ├── GDD.md               # Gamification & staff engagement engine
│   ├── ROADMAP.md           # Strategic release roadmap
│   ├── TESTING.md           # Monorepo testing strategies & test harnesses
│   ├── DEVLOG.md            # Chronological developer log
│   ├── 01-features-specification.md
│   ├── 02-user-roles-and-permissions.md
│   ├── 03-design-system.md
│   ├── 04-screens-and-wireframes.md
│   ├── 05-mobile-architecture.md
│   ├── 06-api-backend-integration.md
│   ├── 07-mobile-testing-plan.md
│   ├── 08-miro-board-blueprint.md
│   └── README.md
├── AGENTS.md                # AI agent instructions & workspace rules
├── CHANGELOG.md             # Semantic version release records
├── LICENSE.md               # MIT License
└── README.md                # Master monorepo guide
```

---

## ⚡ Quick Start Guide

### 1. Prerequisites
- **Node.js**: v20+
- **Bun**: v1.1+ (`curl -fsSL https://bun.sh/install | bash`)

---

### 2. Backend Service Setup (`server/`)

The backend API is built with **NestJS**, designed with strict RBAC, JWT authentication with refresh token rotation, and Prisma ORM connecting to Supabase PostgreSQL.

```bash
cd server

# 1. Copy environment template
cp .env.example .env.local

# 2. Install dependencies
bun install

# 3. Start development server
bun run start:dev
```

#### Backend Verification Commands
```bash
cd server
bun run build       # Build production bundle
bun run test        # Execute Vitest unit test suite
bun run lint        # Execute oxlint linter
```

---

### 3. Mobile Application Setup (`Mobile/`)

The mobile client is built with **React Native** and **Expo SDK 57** (Continuous Native Generation & Expo Router).

```bash
cd Mobile

# 1. Copy environment template
cp .env.example .env.local

# 2. Install dependencies
bun install

# 3. Start Expo development server
bunx expo start
```

#### Mobile Verification Commands
```bash
cd Mobile
bunx expo-doctor    # Run Expo dependency diagnostic checks
bunx expo lint      # Run ESLint validation
bunx tsc --noEmit   # Run TypeScript strict type-checking
```

---

## 🌐 Environment Configurations

Segregated environment configurations ensure local safety and production isolation. All active `.env*` files are strictly git-ignored:

| Scope | Environment | Active File (Ignored) | Template (Committed) | Key Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Server** | Local Dev | `server/.env.local` | `server/.env.example` | Local PostgreSQL, dev JWT secrets, debug logging, CORS `*` |
| **Server** | Production | `server/.env.production` | `server/.env.example` | Production DB with SSL, strict CORS, 64-char JWT secrets |
| **Mobile** | Local Dev | `Mobile/.env.local` | `Mobile/.env.example` | `http://localhost:3000/api/v1`, debug logs enabled |
| **Mobile** | Production | `Mobile/.env.production` | `Mobile/.env.example` | `https://api.healthcare-hr.hospital.org/api/v1`, EAS builds |
| **Root** | Local / Monorepo | `.env.local` | `.env.example` | Root monorepo orchestration |
| **Root** | Production | `.env.production` | `.env.example` | Monorepo production deployment reference |

### Mobile API Host Notes for Local Testing
- **Web & iOS Simulator:** `http://localhost:3000/api/v1`
- **Android Emulator:** `http://10.0.2.2:3000/api/v1` (10.0.2.2 maps to host machine localhost)
- **Physical Mobile Device:** `http://<YOUR_LAN_IP>:3000/api/v1` (ensure device is on the same local Wi-Fi)

---

## 🎨 Design System & Glove-Friendly UX

The mobile application utilizes the **Pink Healthcare Theme** (`#BE185D` Primary, `#FFF1F7` Canvas):
- **Ocular Comfort**: Soft Petal Tint canvas mitigates harsh display glare during late night hospital ward rounds.
- **Nitrile Glove Accessibility**: Minimum **48x48 dp** touch targets across all interactive buttons, calendar cells, and navigation tabs.
- **Full Token Reference**: See [DESIGN.md](docs/DESIGN.md).

---

## 🔒 Security & Compliance Guidelines

- **Zero Committed Secrets**: Strict git hygiene prevents leakage of credentials, tokens, and certificates.
- **Regulatory Tracking**: Built-in support for statutory medical council verification (Nepal Nursing Council, Pharmacy Council, Medical Council).
- **Transport Security**: Enforced TLS 1.3 across all communication channels.
- **Audit Trails**: Immutable logs for all shift roster adjustments, attendance overrides, and leave approvals.
