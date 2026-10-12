# Product & Technical Roadmap

> **Healthcare HR Management Platform**  
> Strategic release roadmap covering technical architecture, mobile client capabilities, clinical compliance, and enterprise milestones.

---

## 🧭 Strategic Vision

To provide hospitals, clinics, and medical diagnostic centers with an accessible, mobile-first human resource management system that alleviates administrative burnout, eliminates attendance disputes, automates regulatory licensing tracking (Nepal Nursing Council, Nepal Pharmacy Council, Nepal Medical Council), and fosters staff punctuality and morale through respectful gamification.

---

## 🗺️ High-Level Roadmap Overview

```
2026 Q1 - Q2                2026 Q3                     2026 Q4                     2027 Q1+
[Phase 1: Foundation] ────► [Phase 2: Core HR] ────► [Phase 3: Shifts] ─────► [Phase 4: Scale]
 • Monorepo Setup            • Staff Profiles           • Dynamic Rosters          • Multi-Hospital
 • NestJS & Expo Setup       • Council Licensing        • Smart Shift Swaps        • Offline-First Engine
 • Pink Design System        • Biometric Punch          • Gamification V1          • AI Roster Optimizer
 • Environment Configs       • Split Calendar View      • Leave Workflows          • Enterprise Auditing
```

---

## 🚀 Release Phases & Milestones

### Phase 1: Architecture Baseline & Monorepo Foundation `[COMPLETED]`
*Target: Q2 2026*

| Feature / Initiative | Scope | Priority | Status |
| :--- | :--- | :--- | :--- |
| **Monorepo Separation** | Structure `Mobile/` (Expo SDK 57) and `server/` (NestJS v12) | P0 | ✅ Complete |
| **Design System & Tokens** | Author `DESIGN.md` with Pink Healthcare theme tokens | P0 | ✅ Complete |
| **Environment Hardening** | Segregated `.env.local` / `.env.production` profiles | P0 | ✅ Complete |
| **Architecture Blueprints** | Full specification suite in `docs/` (01 through 08) | P1 | ✅ Complete |
| **Lint & Quality Harness** | Oxlint, Vitest, Expo lint, and TypeScript strict checks | P1 | ✅ Complete |

---

### Phase 2: Core Clinical HR & Visual Attendance `[IN PROGRESS]`
*Target: Q3 2026*

| Feature / Initiative | Scope | Priority | Status |
| :--- | :--- | :--- | :--- |
| **Authentication & Sessions** | JWT refresh token rotation, biometric unlock (FaceID/Fingerprint) | P0 | 🔄 In Progress |
| **Staff Profile & Medical Councils** | Profiles with NNC (Nursing), NPC (Pharmacy), NMC (Medical) license tracking | P0 | 🔄 In Progress |
| **Split Visual Attendance Calendar** | Monthly 45% grid view + 55% daily card punch stream | P0 | 🔄 In Progress |
| **Dual Punch Engine** | Geofenced mobile GPS punch + integration with hospital biometric logs | P1 | 📋 Planned |
| **Role-Based Access (RBAC)** | Role guards for Super Admin, HR Admin, Dept Head, Staff, Auditor | P0 | 📋 Planned |

---

### Phase 3: Shift Management, Leave Workflows & Gamification V1 `[PLANNED]`
*Target: Q4 2026*

| Feature / Initiative | Scope | Priority | Status |
| :--- | :--- | :--- | :--- |
| **Departmental Shift Rosters** | Morning, Evening, Night (Rotational) shift assignment | P0 | 📋 Planned |
| **Peer Shift Swap Engine** | Staff-initiated swap requests with two-tier supervisor approval | P1 | 📋 Planned |
| **Clinical Leave Workflows** | Casual, Sick, Maternity, Study leave applications with proof upload | P0 | 📋 Planned |
| **Emergency Shortage Alerts** | Urgent broadcast notifications when critical ward staffing drops | P1 | 📋 Planned |
| **Gamification Engine V1** | Punctuality streaks, Shift Hero badges, and wellness challenge tracking | P2 | 📋 Planned |

---

### Phase 4: Offline-First Reliability & Enterprise Hospital Scaling `[FUTURE]`
*Target: Q1 2027*

| Feature / Initiative | Scope | Priority | Status |
| :--- | :--- | :--- | :--- |
| **Offline-First Synchronization** | TanStack Query persistence + MMKV background queue for zero-signal wards | P0 | 📋 Future |
| **Regulatory Compliance Auditing** | One-click PDF/Excel compliance exports for health ministry audits | P1 | 📋 Future |
| **AI Smart Rostering** | Automated shift assignment balancing fatigue limits and council ratios | P2 | 📋 Future |
| **Multi-Hospital Organization Support** | Tenant separation for healthcare hospital networks and university clinics | P1 | 📋 Future |

---

## 📊 Milestone Tracking & Governance

- **Release Cadence**: Bi-weekly sprints with automated testing gates (`tsc`, `lint`, `vitest`).
- **Mobile Builds**: Continuous preview builds dispatched via EAS CLI (`bunx eas-cli`).
- **Versioning Strategy**: Semantic Versioning (`vMAJOR.MINOR.PATCH`) with strict changelog maintenance.
