# Product Requirements Document (PRD)

> **Healthcare HR Management Platform**  
> **Document Version:** 1.0.0  
> **Target Platform:** Mobile-First (React Native / Expo SDK 57) + NestJS Backend  
> **Primary Audience:** Engineering, Product, QA, Hospital Operations, and Healthcare Compliance Auditors

---

## 1. Executive Summary & Problem Statement

### 1.1 The Challenge
Modern hospitals, clinics, and medical centers face intense operational pressures:
- **High Cognitive Fatigue & Burnout**: Nurses, doctors, and paramedical staff endure rotational shifts (day, evening, night) under severe physical and mental load.
- **Attendance Disputes & Fragmented Records**: Manual paper registers and distant biometric wall clocks lead to long queues at shift handovers, disputed overtime, and payroll delays.
- **Regulatory Licensing Risks**: Failure to track expiring medical licenses with statutory healthcare bodies (**Nepal Nursing Council [NNC]**, **Nepal Pharmacy Council [NPC]**, **Nepal Medical Council [NMC]**) risks hospital accreditation, heavy fines, and patient safety compromises.
- **Inflexible Shift Swapping**: Emergency shift coverage requires cumbersome phone chains and verbal promises that frequently lead to understaffed ICU/ward crises.

### 1.2 The Solution
A unified, mobile-first **Healthcare HR Management System** designed around an accessible, calming **Pink Healthcare Theme (`#BE185D`)**. The platform streamlines mobile authentication, geofenced and biometric attendance punching, monthly visual calendar tracking, regulatory council verification, rotational shift rosters, and multi-tier leave approvals.

---

## 2. Product Objectives & Success Metrics

| Goal | Metric / KPI | Target |
| :--- | :--- | :--- |
| **Punctual Attendance** | Average mobile punch-in time | `< 3 seconds` |
| **Regulatory Compliance** | Zero expired council licenses (NNC/NPC/NMC) | `100% active compliance` |
| **Shift Handover Efficiency** | Emergency peer shift swap turnaround | `< 30 minutes` |
| **Paperless Operations** | Transition from manual leave slips to digital mobile requests | `> 95% adoption within 60 days` |
| **App Usability & Stability** | Crash-free user sessions across iOS and Android | `> 99.8%` |

---

## 3. User Personas & Role Matrix

### 3.1 Personas
1. **Clinical Staff Nurse (Sarita)**: Works 8-hour rotating ward shifts; wears nitrile gloves; needs instant check-in, real-time schedule checks, and simple leave requests.
2. **Resident Physician (Dr. Rohan)**: On-call across emergency and ICU; requires fast shift visibility, on-call allowance tracking, and CME license renewal alerts.
3. **Nursing Matron / Dept Head (Sister Kamala)**: Manages 45 ward nurses; needs quick approval tools, daily roster gap visibility, and emergency short-staffing broadcasts.
4. **Hospital HR Administrator (Bikash)**: Oversees hospital payroll inputs, medical council compliance reports, audit trails, and biometric hardware syncing.
5. **Hospital Quality Auditor (Pooja)**: Inspects hospital readiness for accreditation; requires immutable audit trails and council registration validity verification.

### 3.2 Role-Based Access Control (RBAC) Matrix

| Feature Module | Super Admin | HR Admin | Dept Head | Clinical Staff | Auditor |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Biometric / Mobile Punch** | View All | View All | View Ward | Punch Own | View Logs |
| **Calendar Split View** | Full Access | Full Access | Department | Personal | Read-Only |
| **Council License Verification** | Edit / Verify | Edit / Verify | View Dept | View / Submit Own | Read-Only |
| **Shift Roster Management** | Full CRUD | Full CRUD | Manage Dept | View Own | Read-Only |
| **Leave Approval Tier 1** | Override | Approve All | Approve Dept | Apply Own | Read-Only |
| **Audit Trails & Exports** | Full Access | Full Access | Dept Logs | None | Export Reports |

---

## 4. Functional Requirements

### 4.1 Module 1: Authentication & Identity Management
- **FR-1.1**: Email/Employee ID and password authentication with JWT access tokens (15-minute lifetime) and refresh tokens (7-day lifetime) stored in `expo-secure-store`.
- **FR-1.2**: Biometric quick-unlock (FaceID / TouchID / Fingerprint) via `expo-local-authentication`.
- **FR-1.3**: Automated session invalidation upon credential update or admin revocation.

### 4.2 Module 2: Staff Profiling & Medical Council Tracking
- **FR-2.1**: Complete employee profile displaying demographic, emergency contact, blood group, department, and designation.
- **FR-2.2**: Dedicated **Regulatory Councils Module** supporting:
  - **Nepal Nursing Council (NNC)**: License number, category, issue date, validity expiry.
  - **Nepal Pharmacy Council (NPC)**: Registration number, pharmacist grade.
  - **Nepal Medical Council (NMC)**: Permanent/temporary doctor registration and clinical specialty.
- **FR-2.3**: Automated notification trigger at 90, 60, 30, and 7 days prior to council license expiration.

### 4.3 Module 3: Attendance Tracking & Split Visual Calendar
- **FR-3.1**: Dual Punch Engine:
  - Mobile GPS Punch with hospital geofence verification (latitude, longitude, radius tolerance).
  - Sync with hospital wall biometric punch machines (fingerprint/facial scanners).
- **FR-3.2**: Split Calendar Interface:
  - Upper 45% screen height: Monthly visual calendar grid with status dot badges (Green = Present, Amber = Late, Red = Absent, Violet = Leave, Slate = Off, Teal = Holiday).
  - Lower 55% screen height: Scrollable tactile card feed showing punch-in timestamp, punch-out timestamp, effective hours, break duration, and manager punch notes for the selected date.

### 4.4 Module 4: Shift Management & Peer Swapping
- **FR-4.1**: Visual weekly/monthly roster with morning (07:00–15:00), evening (15:00–23:00), and night (23:00–07:00) shift indicators.
- **FR-4.2**: Peer Shift Swap Workflow:
  - Staff selects shift and proposes a swap to a peer in the same department.
  - Peer accepts via mobile notification.
  - Department Head receives actionable approval sheet with automatic fatigue/overtime warnings.

### 4.5 Module 5: Leave Management & Multi-Tier Approvals
- **FR-5.1**: Leave balance overview (Casual, Sick, Maternity/Paternity, Study, Compensatory).
- **FR-5.2**: Leave submission with date range picker, reason notes, and medical certificate attachment upload.
- **FR-5.3**: Department Head and HR Admin approval dashboard with one-tap Approve/Reject and rejection remarks.

---

## 5. Non-Functional Requirements

### 5.1 Usability & Clinical Ergonomics
- **NFR-1.1**: Minimum touch target of **48x48 dp** on all interactive components to ensure seamless operation while wearing clinical nitrile gloves.
- **NFR-1.2**: Calming Pink Healthcare aesthetic (`#BE185D` primary on `#FFF1F7` background) with high-contrast text (`#334155`) fulfilling WCAG 2.1 AA standards.
- **NFR-1.3**: Single-thumb ergonomics: high-frequency actions placed in the bottom 50% of the viewport.

### 5.2 Performance & Responsiveness
- **NFR-2.1**: App launch to interactive dashboard in `< 1.8 seconds` on mid-tier mobile hardware.
- **NFR-2.2**: 60 FPS smooth scrolling across attendance calendars and staff lists.
- **NFR-2.3**: Offline Resilience: Queue offline punches in encrypted MMKV storage and automatically synchronize with backend when connectivity is restored.

### 5.3 Security & Data Protection
- **NFR-3.1**: End-to-end transport encryption over TLS 1.3 for all REST API endpoints.
- **NFR-3.2**: Data at rest encrypted in Supabase PostgreSQL using AES-256.
- **NFR-3.3**: Immutable audit logs capturing all attendance overrides, leave modifications, and council approvals.

---

## 6. Assumptions & Out-of-Scope Items

### Assumptions
- Hospital facilities provide Wi-Fi coverage or mobile data across clinical wards.
- Staff smartphones run Android 10+ or iOS 15+.

### Out of Scope (V1.0)
- Complete payroll computation and bank disbursement (V1 exports standardized timesheet summaries for external payroll systems).
- In-app video telehealth consultations.
