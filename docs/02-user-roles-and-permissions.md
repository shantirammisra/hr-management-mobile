# 02 - User Roles and Permissions (RBAC Matrix)

This document establishes the Role-Based Access Control (RBAC) security architecture for the Healthcare HR Management Mobile Application.

---

## 1. Role Definitions

In a clinical and hospital environment, permissions must balance operational velocity with strict patient privacy, data integrity, and statutory healthcare regulations.

```
       +---------------------------------------------+
       |                 SUPER ADMIN                 |
       |  Full systemic control, tenant configuration|
       +---------------------------------------------+
                              |
       +---------------------------------------------+
       |                  HR ADMIN                   |
       |  Hospital-wide staff, attendance, leaves,   |
       |  council verifications & compliance audits  |
       +---------------------------------------------+
                              |
       +---------------------------------------------+
       |               DEPARTMENT HEAD               |
       |  Clinical unit roster, approvals for team,  |
       |  shift cover verification & local metrics   |
       +---------------------------------------------+
                              |
       +---------------------------------------------+
       |                    STAFF                    |
       |  Self-service: punches, calendar, leaves,   |
       |  profile view & hospital staff directory    |
       +---------------------------------------------+
                              *
       +---------------------------------------------+
       |                   AUDITOR                   |
       |  Independent compliance: read-only access   |
       |  to registrations, attendance & logs        |
       +---------------------------------------------+
```

### 1. Super Admin
- **Role Code:** `ROLE_SUPER_ADMIN`
- **Scope:** Hospital Enterprise / Executive Medical Directorate.
- **Description:** Highest privilege level. Governs system parameters, user role assignments, hospital department topologies, and global access audits.

### 2. HR Admin
- **Role Code:** `ROLE_HR_ADMIN`
- **Scope:** Hospital Human Resources & Clinical Credentialing Department.
- **Description:** Manages lifecycle of all employees across all clinical and support departments. Responsible for verifying professional council registrations (NNC, NPC, NMC), adjusting attendance punches, giving final approval for long-term leaves, generating compliance reports, and managing organization-wide announcements.

### 3. Department Head (In-Charge / HOD / Sister In-Charge)
- **Role Code:** `ROLE_DEPT_HEAD`
- **Scope:** Dedicated Clinical Unit (e.g., Intensive Care Unit, Emergency, Inpatient Ward 4, Outpatient Department).
- **Description:** Supervises departmental nursing and medical rosters. Reviews daily unit attendance, approves first-level shift corrections, verifies peer handovers, and approves leave requests ensuring minimum ward staffing ratios are preserved.

### 4. Staff (Clinical & Support Personnel)
- **Role Code:** `ROLE_STAFF`
- **Scope:** Self-service boundary.
- **Description:** Doctors, registered nurses, auxiliary nurse midwives (ANMs), pharmacists, laboratory technicians, orderlies, and clerical staff. Can view their own shifts, daily punch records, attendance calendar, remaining leave balances, submit leave applications, request punch corrections, and view colleague contacts in the hospital directory.

### 5. Auditor (Internal / External Healthcare Compliance Officer)
- **Role Code:** `ROLE_AUDITOR`
- **Scope:** Read-Only Audit & Inspection.
- **Description:** Authorized to inspect records for quality accreditation (e.g., ISO, NABH, national healthcare licensing audits). Can view staff qualification registers, council registration validity statuses, attendance logs, and leave utilization records without any ability to modify data.

---

## 2. Granular Screen-Level Access Matrix

Legend:
- **Full**: Full Access (View, Create, Edit, Approve, Delete where applicable)
- **Self**: Accessible only for the authenticated user's own records
- **Dept**: Accessible for all personnel belonging to the manager's assigned department
- **View**: Read-Only view of all records across the hospital
- **Deny**: Screen or route is inaccessible (redirected or tab hidden)

| # | Screen Name | Route Path | Staff | Dept Head | HR Admin | Super Admin | Auditor |
|---|---|---|:---:|:---:|:---:|:---:|:---:|
| 1 | **Splash Screen** | `/splash` | Full | Full | Full | Full | Full |
| 2 | **Login Screen** | `/auth/login` | Full | Full | Full | Full | Full |
| 3 | **Forgot Password** | `/auth/forgot-password` | Full | Full | Full | Full | Full |
| 4 | **Home Dashboard** | `/(tabs)/index` | Self | Dept + Self | Full | Full | View |
| 5 | **Staff Directory** | `/(tabs)/directory` | View (Public) | View (Dept Ext) | Full (Edit) | Full | View (Audit) |
| 6 | **Employee Profile** | `/directory/[id]` | Self (Limited) | Dept (Medium) | Full | Full | Full (Read) |
| 7 | **Department Directory** | `/directory/departments` | View | View | Full | Full | View |
| 8 | **Attendance Calendar** | `/(tabs)/attendance` | Self | Dept + Self | Full | Full | View |
| 9 | **Date-wise Attendance Details**| `/attendance/[date]` | Self | Dept + Self | Full | Full | View |
| 10| **Monthly Attendance Summary** | `/attendance/summary` | Self | Dept + Self | Full | Full | View |
| 11| **Leave Application** | `/leave/apply` | Self | Self | Self + Proxy | Self + Proxy | Deny |
| 12| **Leave Request History** | `/(tabs)/leave` | Self | Dept + Self | Full | Full | View |
| 13| **Leave Approval Queue** | `/leave/approvals` | Deny | Dept (Tier 1) | Full (Tier 2) | Full (Override)| Deny |
| 14| **Notifications** | `/notifications` | Self | Self + Alerts | Full | Full | Self |
| 15| **Reports & Analytics** | `/(tabs)/reports` | Self | Dept | Full | Full | Full (Read) |
| 16| **User Profile & Settings** | `/(tabs)/profile` | Self | Self | Self + Admin | Full | Self |

---

## 3. Action & Operation Level Permissions Matrix

| Functional Action Domain | Staff | Dept Head | HR Admin | Super Admin | Auditor |
|---|:---:|:---:|:---:|:---:|:---:|
| **Authentication & Profile** | | | | | |
| Update Personal Phone & Address | Yes | Yes | Yes | Yes | No |
| Update Medical Council Reg Number | Request | Request | Yes | Yes | No |
| Verify NNC / NPC / NMC License | No | No | Yes | Yes | No |
| Change User Role / Department | No | No | Yes | Yes | No |
| Reset Employee Password | Self | No | Yes | Yes | No |
| **Attendance Operations** | | | | | |
| View Personal Daily Punches | Yes | Yes | Yes | Yes | Yes |
| View Team Daily Punches | No | Yes (Dept) | Yes (All) | Yes (All) | Yes (All) |
| Submit Punch Correction Request | Yes | Yes | Yes | Yes | No |
| Approve Punch Correction Request | No | Yes (Tier 1)| Yes (Tier 2)| Yes (Final) | No |
| Edit Historic Punch Directly | No | No | Yes (Logged) | Yes (Logged)| No |
| **Leave Operations** | | | | | |
| Submit Leave Request for Self | Yes | Yes | Yes | Yes | No |
| Submit Leave on Behalf of Staff | No | No | Yes | Yes | No |
| Cancel Own Pending Leave | Yes | Yes | Yes | Yes | No |
| Approve / Reject Department Leave | No | Yes | Yes | Yes | No |
| Override Leave Decision | No | No | Yes | Yes | No |
| Adjust Staff Leave Entitlement | No | No | Yes | Yes | No |
| **Reporting & Exporting** | | | | | |
| View Personal Monthly Slip/Card | Yes | Yes | Yes | Yes | Yes |
| Export Department Roster PDF/CSV | No | Yes | Yes | Yes | Yes |
| Export Statutory Hospital Compliance | No | No | Yes | Yes | Yes |
| Access System Audit Trail | No | No | Yes (HR) | Yes (All) | Yes (Read) |

---

## 4. Mobile Enforcement Architecture

### A. JWT Token Claims Structure
User authorizations are conveyed via cryptographically signed JWT payload:

```typescript
interface MobileUserSession {
  userId: string;
  employeeId: string;
  email: string;
  fullName: string;
  role: 'ROLE_SUPER_ADMIN' | 'ROLE_HR_ADMIN' | 'ROLE_DEPT_HEAD' | 'ROLE_STAFF' | 'ROLE_AUDITOR';
  departmentId: string;
  departmentCode: string;
  permissions: string[]; // e.g. ["attendance.view.self", "leave.approve.dept", "council.verify"]
  isBiometricEnabled: boolean;
  avatarUrl?: string;
}
```

### B. Mobile Navigation Guards & Route Shielding
1. **Dynamic Tab Bar Rendering:** The bottom tab bar conditionally filters visible tabs based on role:
   - `ROLE_STAFF`: Home, Attendance, Leave, Directory, Profile.
   - `ROLE_DEPT_HEAD`: Home (with badge), Attendance, Approvals, Directory, Profile.
   - `ROLE_HR_ADMIN`: Dashboard, Approvals, Staff, Reports, Profile.
   - `ROLE_AUDITOR`: Dashboard, Registry, Attendance, Reports, Profile.
2. **Deep-Link & Stack Protection:** If an unauthorized user attempts to trigger `/leave/approvals` via notification push or deep-link, the `usePermissionGuard()` hook triggers a 403 Forbidden Modal and redirects back to Home Dashboard.
3. **Optimistic Action Masking:** Action buttons such as `Approve`, `Reject`, `Verify NNC License`, or `Export PDF` are conditionally hidden or rendered disabled at the component level using `<PermissionGate permission="leave.approve">`.
