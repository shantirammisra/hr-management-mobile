# Healthcare HR Management System

Welcome to the **Healthcare HR Management System** repository. This monorepo houses the complete system architecture, the mobile client application, and the NestJS backend API service for the Healthcare Human Resources (HR) Management platform.

---

## 📁 Repository Structure

```
hr/
├── Mobile/              # React Native (Expo SDK 52+) Mobile Application
│   ├── assets/          # Static assets (images, icons)
│   ├── src/             # Application source code (Expo Router screens, components)
│   ├── app.json         # Expo configuration
│   ├── package.json     # Mobile dependencies and scripts
│   ├── tsconfig.json    # TypeScript configuration
│   └── .env.example     # Environment variable template
├── server/              # NestJS REST API Gateway & Backend Service
│   ├── src/             # NestJS controllers, services, modules
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── app.service.ts
│   │   └── main.ts
│   ├── test/            # E2E integration test suites
│   ├── nest-cli.json    # NestJS CLI configuration
│   ├── package.json     # Backend dependencies and scripts
│   ├── tsconfig.json    # TypeScript configuration
│   └── .env.example     # Environment variable template
├── docs/                # Comprehensive blueprints & system architecture
│   ├── 01-features-specification.md
│   ├── 02-user-roles-and-permissions.md
│   ├── 03-design-system.md
│   ├── 04-screens-and-wireframes.md
│   ├── 05-mobile-architecture.md
│   ├── 06-api-backend-integration.md
│   ├── 07-mobile-testing-plan.md
│   ├── 08-miro-board-blueprint.md
│   └── README.md
├── .gitignore           # Unified repository-wide ignore rules
├── AGENTS.md            # AI agent development rules & guidelines
└── LICENSE              # Project license
```

---

## ⚡ Quick Start

### 1. Prerequisites
- **Node.js**: v20+
- **Bun**: v1.1+ (`curl -fsSL https://bun.sh/install | bash`)

---

## 🖥️ Backend Service (`server/`)

The backend API is built with **NestJS**, designed with strict RBAC, JWT authentication, and modular architecture.

### Getting Started

```bash
cd server

# 1. Copy environment template
cp .env.example .env

# 2. Install dependencies
bun install

# 3. Start development server
bun run start:dev
```

### Verification & Testing Commands

```bash
cd server

# Build the application
bun run build

# Run unit tests
bun run test

# Run linter
bun run lint
```

---

## 📱 Mobile Application (`Mobile/`)

The mobile app is located in the [`Mobile/`](./Mobile) directory. It is built using:
- **Framework:** React Native with Expo SDK 52+ (Managed Workflow)
- **Routing:** Expo Router (file-based navigation)
- **Language:** TypeScript
- **Package Manager:** Bun

### Getting Started

```bash
cd Mobile

# 1. Copy environment template
cp .env.example .env.local

# 2. Install dependencies
bun install

# 3. Start Expo development server
bunx expo start
```

### Verification & Testing Commands

```bash
cd Mobile

# Run Expo Doctor diagnostic checks
bunx expo-doctor

# Run ESLint
bunx expo lint

# Run TypeScript type check
bunx tsc --noEmit
```

---

## 🔒 Security & Public Repository Guidelines

This repository is prepared for public distribution. Please adhere to these guidelines:
- **Zero Secrets Committed:** Never commit `.env` files, API keys, private certificates (`.pem`, `.key`), or keystores (`.jks`, `.keystore`).
- **Unified `.gitignore`:** All sensitive credentials, build outputs (`dist/`, `build/`, `.expo/`), and `node_modules/` are managed by the single root `.gitignore`.
- **Environment Templates:** Always document newly introduced environment variables in `server/.env.example` or `Mobile/.env.example`.

---

## 📖 Blueprint & Architecture Documentation

For complete design and architectural details, refer to the [`docs/`](./docs) directory:
- [01 - Functional Features Specification](docs/01-features-specification.md)
- [02 - User Roles & RBAC Matrix](docs/02-user-roles-and-permissions.md)
- [03 - Pink Healthcare UI Design System](docs/03-design-system.md)
- [04 - Screen Map & Wireframes](docs/04-screens-and-wireframes.md)
- [05 - Mobile Architecture](docs/05-mobile-architecture.md)
- [06 - API & Backend Integration Contracts](docs/06-api-backend-integration.md)
- [07 - Mobile Testing Plan](docs/07-mobile-testing-plan.md)
- [08 - Miro Board Deliverables & Roadmap](docs/08-miro-board-blueprint.md)
