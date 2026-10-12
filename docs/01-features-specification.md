# 01 - Mobile Application Features Specification

This specification documents the functional requirements, user interaction models, data requirements, and clinical domain rules for the **Healthcare HR Management Mobile Application**.

---

## 1. Scope & Core Objectives

The mobile application is designed specifically for healthcare organizations (hospitals, polyclinics, nursing homes, and diagnostic facilities) on **Android** and **iOS** using **React Native**, **Expo**, and **TypeScript**.

- **Primary Persona Base:** Healthcare workers (nurses, physicians, pharmacists, lab technicians, administrative staff, department heads, HR managers, and clinical auditors).
- **Core Operating Model:** Shift-based clinical scheduling, regulatory registration tracking, fast mobile check-in/out visibility, rapid leave approval workflows, and biometric-backed attendance reconciliation.
- **Strict Mobile Boundary:** Form factors are exclusively handheld smartphones and compact tablets. Desktop tables, wide grid layouts, and web browsers are excluded.

---

## 2. Feature Modules Breakdown

### A. Authentication & Session Management
The authentication system secures access to sensitive clinical HR data while providing low-friction mobile access for busy medical personnel.

#### 1. Login & Identity Verification
- **Credential Sign-In:** Official employee identifier (Staff ID, work email, or verified mobile number) paired with a password.
- **Biometric Unlock (Touch ID / Face ID / Android BiometricPrompt):** Optional biometric key generation after initial credential validation via `expo-local-authentication` and secure key storage via `expo-secure-store`.
- **Remember Me & Credential Caching:** Secure device credential tokenization without exposing plaintext credentials.

#### 2. Password Recovery (Forgot Password Flow)
- **Identification:** User inputs registered email or Employee ID.
- **Verification OTP:** 6-digit Time-Based One-Time Password (TOTP) dispatched via SMS or verified hospital email.
- **Password Reset Screen:** Enforces password complexity rules (minimum 8 characters, upper/lower case, digit, special character) with real-time visual indicator badges.

#### 3. Session & Security Management
- **JWT Lifecycles:** Short-lived access tokens (15 minutes) paired with rotating refresh tokens (30 days) stored exclusively in hardware-backed keystores (`expo-secure-store`).
- **Automatic Session Invalidation:** Inactivity timeout trigger (e.g., 15 minutes of background inactivity in clinical zones prompts biometric re-authentication).
- **Single-Device / Multi-Device Controls:** Active device session listing with remote sign-out capability.

#### 4. Role-Based Navigation Routing
- Dynamic navigation tree re-mounting based on authenticated JWT claims:
  - **Staff:** Restricted to personal self-service tabs (Home, Attendance, Leave, Profile, Staff Directory [read-only]).
  - **Department Head:** Adds team approval inbox, shift assignment viewer, and department attendance roster.
  - **HR Admin / Super Admin:** Grants company-wide staff directory modification, attendance correction approval, and enterprise analytics.
  - **Auditor:** Read-only compliance inspection mode with council registration filters and audit log reports.

---

### B. Healthcare Staff Profiles & Regulatory Compliance

Staff records in clinical environments require regulatory tracking for medical licensing councils.

#### 1. Core Profile Attributes
- **Demographics:** Full Name, official avatar/photograph, date of birth, biological sex / gender, blood group.
- **Contact:** Mobile phone number, emergency contact relationship and number, verified institutional email, permanent and temporary residential addresses.
- **Institutional Identity:** Employee ID (e.g., `HOSP-NUR-0429`), official badge barcode/QR reference, joining date, confirmation date, employment type (Permanent, Probationary, Contract, Locum/Per Diem, Resident/Intern), current status (Active, On Leave, Suspended, Resigned, Retired).
- **Organization Hierarchy:** Department (e.g., Emergency, ICU, Pediatrics, Pharmacy, Pathology), Designation (e.g., Senior Registered Nurse, Consultant Radiologist, Staff Pharmacist), Reporting Manager (Department Head / Medical Director).

#### 2. Healthcare Council & Regulatory Licensing Fields
Healthcare compliance requires rigorous verification of professional council numbers:
- **Nepal Nursing Council (NNC):** Registration Number, License Category (ANM, Staff Nurse, B.Sc. Nurse, Specialist Nurse), Expiration/Renewal Date, Verification Status (Verified, Pending Verification, Expired).
- **Nepal Pharmacy Council (NPC):** Registration Number, Pharmacist / Pharmacy Assistant Level, License Validity Date.
- **Nepal Medical Council (NMC):** Registration Number (for medical officers & consultants), Specialization Registration Number.
- **Nepal Health Professional Council (NHPC):** Registration Number for paramedics, lab technologists, radiographers, and physiotherapists.
- **License Renewal Alerts:** In-app badge alerts displayed 60, 30, and 7 days prior to council license expiry.

#### 3. Search & Directory Filters
- Instant search by Name, Employee ID, or Council Registration Number.
- Multi-facet filters: Department (ICU, OPD, Emergency, OT, Pharmacy), Role/Designation, Shift Group, and Regulatory Status (Verified vs. Expired Council License).

---

### C. Attendance Calendar & Shift Management

The attendance module operates on clinical 24/7 rotational shifts (Morning, Evening, Night, General) with automated status determinations.

#### 1. Visual Monthly Calendar View (Mobile Optimized)
- **Header Navigation:** Month/Year dropdown picker and next/prev month chevron buttons.
- **Interactive Calendar Grid:** Full 7-column calendar matrix fitting mobile viewports without horizontal scrolling.
- **Date Indicator Dots / Badges:**
  - **Present (Green):** Normal punch adhering to shift schedule.
  - **Late (Amber):** Check-in past grace period (e.g., >15 mins post-shift start).
  - **Absent (Red):** No punch record during scheduled shift without approved leave.
  - **Half-Day (Orange/Yellow):** Worked less than minimum half-day threshold (e.g., <4.5 hours).
  - **Leave (Purple):** Approved annual, sick, or casual leave.
  - **Weekly Off (Slate Gray):** Scheduled rostered day off.
  - **Holiday (Blue):** Official hospital/national public holiday.

#### 2. Monthly Attendance Summary Cards
Placed above or seamlessly collapsible with the calendar:
- Total Working Days
- Present Count
- Late Arrivals
- Half-Day Records
- Approved Leaves
- Unexcused Absences

#### 3. Date-Wise Detailed Attendance Sheet (Below Calendar)
Tapping any day in the calendar updates a detailed card deck directly beneath:
- **Selected Date Header:** e.g., *"Monday, October 12, 2026"* with Day Status Badge.
- **Shift Details:** Assigned Shift Name (e.g., *"Night Shift B - ICU"*), Shift Timing (e.g., `20:00 - 08:00`), Required Hours.
- **Punch Metrics:**
  - First In: Time (`08:02 AM`) + Location/Device tag (Biometric Terminal 02 / Mobile Geo-Fence).
  - Last Out: Time (`04:15 PM`) + Status.
  - Total Duration: Hours and minutes calculated in real-time (`8h 13m`).
  - Overtime (OT): Verified overtime hours calculated against shift definition.
- **Remarks & Exceptions:** e.g., *"Late entry approved by Sister In-charge"*, *"Missed out-punch"*.

#### 4. Authorized Attendance Corrections
- Staff can tap *"Request Correction"* on an irregular punch date (e.g., forgotten punch, machine failure).
- Form asks for Correct In-Time, Correct Out-Time, Reason Category (Hardware Malfunction, Emergency Patient Call, Official Outdoor Duty), and Supporting Remarks.
- Submits an immutable correction request to Department Head / HR Admin approval queue.

---

### D. Leave Management System

Designed to accommodate clinical minimum staffing thresholds and statutory healthcare leave rules.

#### 1. Leave Application Workflow
- **Leave Types:**
  - Sick Leave (SL) - with mandatory medical certificate attachment for >2 days.
  - Casual Leave (CL).
  - Annual / Privilege Leave (AL/PL).
  - Maternity / Paternity Leave.
  - Bereavement / Mourning Leave.
  - Compensatory Off (C-Off) - earned against extra clinical duty.
- **Date Selection:** Single date, multi-day span, or Half-Day (First Half / Second Half).
- **Clinical Cover Doctor / Staff Handover:** Mandatory field selecting a peer colleague who agrees to cover the applicant's patient duties/shift during the absence.
- **Reason & Attachments:** Text reason + camera/document picker for medical prescriptions or discharge summaries.

#### 2. Leave Balance Tracker
- Visual horizontal carousel or compact card grid showing:
  - **Total Entitled** vs. **Consumed** vs. **Remaining Balance** for each leave category.
  - Visual circular/linear progress bars in primary pink and neutral tones.

#### 3. Request Status & Lifecycle Tracking
- **Statuses:** `PENDING_SUPERVISOR`, `PENDING_HR`, `APPROVED`, `REJECTED`, `CANCELLED`.
- **Cancellation Capability:** Staff can cancel a pending or future approved leave before the start date. Once the leave date has commenced, only HR Admin can retroactively void it.

#### 4. Approver Workflow (Dept Head & HR Admin)
- Dedicated **Approval Queue** badge showing count of pending requests.
- **Contextual Approval Card:** Displays applicant profile, department roster status on selected dates (prevents approving leave if nurse-to-patient ratio drops below threshold), leave balance, and handover partner.
- Actions: **One-tap Approve**, **Reject with Mandated Reason Note**, or **Request Amendment**.

---

### E. Personalized Role Dashboards

The mobile landing screen dynamically adapts to the user's operational role.

#### 1. Staff Home Dashboard
- **Greeting & Clinical Shift Banner:** *"Hello, Nurse Priya Sharma (Staff ID: 1042)"* with current active shift indicator (`Morning Shift - Ward 3 | 07:00 - 15:00`).
- **Quick Punch Status Widget:** Visual check-in/out button or current clock status.
- **Monthly Attendance Micro-Card:** Present: 22, Late: 1, Leave: 2.
- **Remaining Leave Balances:** Quick chips (Sick: 6 days left, Casual: 4 days left).
- **Quick Action Bar:** 
  - `[Apply Leave]`
  - `[My Attendance]`
  - `[Request Correction]`
  - `[Staff Directory]`
- **Hospital Announcements / Notice Board:** Pinned circulars from medical directorate.

#### 2. Department Head & Supervisor Dashboard
- Everything in Staff Home Dashboard plus:
- **Department Live Roster:** Who is on duty now, who is absent, who is on shift handover.
- **Action Required Ribbon:** "4 Leave Requests Pending", "2 Attendance Corrections Pending".
- **Department Quick Shift Roster View.**

#### 3. HR Admin & Super Admin Dashboard
- **Hospital-Wide Metrics:**
  - Today's Overall Attendance Percentage (e.g., 94.2%).
  - Total Staff On Duty vs. Absent vs. On Approved Leave.
  - Expiring Council Licenses (e.g., "5 Nurses with NNC renewals due this month").
- **Global Approval Counter:** Pending leaves hospital-wide, pending regularizations.
- **Emergency Contact / On-Call Broadcast Tool.**

#### 4. Auditor Dashboard
- Compliance Overview: Licensing verification compliance rate (100% target).
- Attendance regularity audit indicators.
- Quick navigation to filtered compliance directories.

---

### F. Staff and Department Directory

Provides quick access to hospital internal contacts and duty assignments.

#### 1. Department Listing
- Structured directory of all clinical and administrative units (e.g., ICU, NICU, Cardiology, Nephrology, Central Pharmacy, Facilities).
- Displays Department Head name, direct extension/phone, and active headcount.

#### 2. Employee Listing & Search
- Live search bar filtering by name, department, role, or extension.
- Compact employee card: Avatar, Name, Designation, Department Tag, Council Registration badge, and Quick Call / Email action buttons.
- Tapping card opens the **Mobile Employee Profile View** (respecting privacy rules: personal address and salary hidden from non-admin peers).

---

### G. Reports, Settings & Account Security

#### 1. Mobile Reports
- **My Attendance Monthly Report:** Detailed PDF/CSV download or mobile share sheet link.
- **Department Attendance Summary:** Accessible to Dept Head and HR Admin, summarizing attendance rate, total overtime hours, and absent trends.
- **Regulatory Compliance Report:** Auditor and HR view showing all staff with NNC, NPC, or NMC license validity dates.

#### 2. Profile & Settings
- **Personal Information:** View contact details, request address or phone update.
- **Notification Preferences:** Toggles for Push Notifications (Shift reminders, Leave approval notifications, Council license expiry warnings, Notice board broadcasts).
- **Security & Privacy:** Biometric login toggle (Face ID / Fingerprint), Change Password, Active Device Sessions, Privacy Policy & Clinical Data Governance.
- **Theme Preferences:** Light Pink (default high-contrast hospital mode) with Dark Pink healthcare accent.
- **App Information:** App Version, Build Number, Regulatory Compliance Statement, and Hospital IT Helpdesk hotline.
