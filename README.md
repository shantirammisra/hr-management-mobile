# Healthcare HR Management System

Welcome to the **Healthcare HR Management System** repository. This repository houses the complete design blueprints, architecture specifications, and mobile client implementation for the Healthcare Human Resources (HR) Management platform.

---

## 📁 Repository Structure

```
hr/
├── Mobile/              # React Native (Expo SDK 52+) Mobile Application
│   ├── assets/          # Static assets (images, icons)
│   ├── src/             # Application source code (Expo Router screens, components)
│   ├── app.json         # Expo configuration
│   ├── package.json     # Mobile dependencies and scripts
│   └── tsconfig.json    # TypeScript configuration
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
└── AGENTS.md            # Development & AI agent instructions
```

---

## 📱 Mobile Application

The mobile app is located in the [`Mobile/`](./Mobile) directory. It is built using:
- **Framework:** React Native with Expo SDK 52+ (Managed Workflow)
- **Routing:** Expo Router (file-based navigation)
- **Language:** TypeScript
- **Package Manager:** Bun

### Getting Started

To run the mobile app locally:

```bash
cd Mobile

# Install dependencies
bun install

# Start the Expo development server
bunx expo start
```

### Verification & Testing Commands

Run from the `Mobile/` directory:

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
