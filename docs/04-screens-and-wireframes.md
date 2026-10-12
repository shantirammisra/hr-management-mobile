# 04 - Screen Map & Mobile Screen Wireframes

This document contains the complete mobile screen map, navigation routing graph, and detailed structural wireframes for all **16 mobile screens** of the Healthcare HR Management Mobile Application.

---

## 1. Mobile Screen Navigation Map

```
                                [ SPLASH SCREEN (1) ]
                                          |
                                    [ Auth Check ]
                                   /              \
                    (Unauthenticated)            (Authenticated)
                           |                            |
                   [ LOGIN SCREEN (2) ]                 |
                    /                 \                 |
        [ FORGOT PASSWORD (3) ]        \                |
                                        v               v
                             +-----------------------------------+
                             |     MAIN TAB BAR / DRAWER         |
                             +-----------------------------------+
                               |        |        |       |      |
             +-----------------+        |        |       |      +-----------------+
             |                          |        |       |                        |
             v                          v        v       v                        v
    [ HOME DASHBOARD (4) ]     [ ATTENDANCE (8) ][ LEAVE (12) ]  [ DIRECTORY (5) ] [ PROFILE (16) ]
       |        |                       |                |               |                 |
       |        |                       +-------+        +-------+       +-------+         +-------+
       |        |                       |       |        |       |       |       |         |       |
       |        |                       v       v        v       v       v       v         |       |
       |  [ NOTIFICATIONS (14) ]    [ DETAILS ][ SUMMARY ] [ APPLY ] [ APPROVAL ] [ PROFILE ][ DEPT DIR ]
       |                              (9)       (10)      (11)     (13)     (6)       (7)
       |
       +--> [ REPORTS & ANALYTICS (15) ]
```

---

## 2. Detailed Mobile Wireframes (All 16 Screens)

---

### Screen 1: Splash Screen
- **Route:** `/splash`
- **Purpose:** Bootstraps application, checks hardware biometric availability, verifies stored tokens in Keychain/Keystore, pre-fetches offline state.
- **Wireframe:**

```
+------------------------------------------+
|  [Status Bar: Battery, Wifi, Time]       |
|                                          |
|                                          |
|                                          |
|                 +------+                 |
|                 |  ♥   |                 |
|                 |  +   |                 |
|                 +------+                 |
|                                          |
|              CAREPULSE HR                |
|      Healthcare Workforce Platform       |
|                                          |
|                 ( • • • )                |
|           Checking secure session...     |
|                                          |
|                                          |
|                                          |
|                                          |
|                                          |
|                                          |
|                                          |
|  v1.0.0 (Build 104) | Encrypted HIPAA/NNC |
+------------------------------------------+
```

---

### Screen 2: Login Screen
- **Route:** `/auth/login`
- **Purpose:** Secure multi-role entry supporting Staff ID or Email, password, biometric shortcut, and forgot password link.
- **Wireframe:**

```
+------------------------------------------+
|  [Status Bar]                            |
|                                          |
|  ♥ CarePulse HR                          |
|  Sign in to your hospital workspace      |
|                                          |
|  Employee ID or Work Email               |
|  [ HOSP-NUR-0429                       ] |
|                                          |
|  Password                                |
|  [ ••••••••••••••••••              (👁) ] |
|                                          |
|  [ ] Keep me signed in    Forgot Password?|
|                                          |
|  +------------------------------------+  |
|  |           SIGN IN                  |  |  <- #BE185D Pink CTA
|  +------------------------------------+  |
|                                          |
|                  - OR -                  |
|                                          |
|  +------------------------------------+  |
|  |     [ (•) Quick Biometric Login ]  |  |  <- Face ID / Touch ID
|  +------------------------------------+  |
|                                          |
|  Need assistance? Contact Hospital IT    |
|  Emergency Hotline: Ext. 4400            |
+------------------------------------------+
```

---

### Screen 3: Forgot Password Screen
- **Route:** `/auth/forgot-password`
- **Purpose:** Self-service password reset requiring registered employee ID and OTP sent to verified hospital contact.
- **Wireframe:**

```
+------------------------------------------+
|  [< Back]                  Need Help?    |
|                                          |
|  Reset Password                          |
|  Enter your official Employee ID or      |
|  registered hospital email address.      |
|                                          |
|  Employee ID                             |
|  [ HOSP-NUR-0429                       ] |
|                                          |
|  +------------------------------------+  |
|  |           SEND OTP CODE            |  |
|  +------------------------------------+  |
|                                          |
|  Step 2: Enter 6-Digit Code (SMS/Email)  |
|  [ 4 ]  [ 8 ]  [ 2 ]  [ 9 ]  [ 1 ]  [ 0 ]|
|                                          |
|  New Password                            |
|  [ ••••••••••••••••                (👁) ]|
|  ✓ 8+ chars  ✓ Number  ✓ Special symbol  |
|                                          |
|  +------------------------------------+  |
|  |         UPDATE PASSWORD            |  |
|  +------------------------------------+  |
|                                          |
+------------------------------------------+
```

---

### Screen 4: Home Dashboard Screen
- **Route:** `/(tabs)/index`
- **Purpose:** Central operational landing page adapted per user role (shown below: Nurse / Staff persona).
- **Wireframe:**

```
+------------------------------------------+
|  [Avatar] Priya Sharma, RN      [Bell 🔔2]|
|  Staff ID: 1042 | ICU Ward               |
|                                          |
|  +------------------------------------+  |
|  | CURRENT SHIFT: Morning Shift A     |  |
|  | 07:00 AM - 03:00 PM (In-Progress)  |  |
|  | [✓ Punched In: 06:58 AM]           |  |
|  +------------------------------------+  |
|                                          |
|  QUICK ACTIONS                           |
|  [ + Leave ] [ 📅 Calendar ] [ 👥 Staff ] |
|                                          |
|  OCTOBER ATTENDANCE                      |
|  +------------+------------+-----------+ |
|  | Present    | Late       | Leave     | |
|  | 21 Days    | 1 Day      | 2 Days    | |
|  +------------+------------+-----------+ |
|                                          |
|  LEAVE BALANCES                          |
|  [ Sick: 6/12 ] [ Casual: 4/10 ] [ C-Off: 1]
|                                          |
|  HOSPITAL NOTICE BOARD                   |
|  * Infection Control Protocol Update     |
|  * NNC License Renewal Camp on Friday    |
|                                          |
|  [Home] [Calendar] [Leaves] [Staff] [Me] |
+------------------------------------------+
```

---

### Screen 5: Staff Directory Screen
- **Route:** `/(tabs)/directory`
- **Purpose:** Fast search and listing of all hospital employees, filterable by department, designation, or council registration status.
- **Wireframe:**

```
+------------------------------------------+
|  Staff Directory             [Filter ⚙]  |
|  [ 🔍 Search by name, ID, council reg... ]|
|                                          |
|  (All)  (ICU)  (Emergency)  (Pharmacy)   |
|                                          |
|  +------------------------------------+  |
|  | [Avatar] Dr. Anil Thapa            |  |
|  | Consultant Cardiologist | OPD      |  |
|  | ID: HOSP-DOC-012 | NMC: #18442     |  |
|  | [📞 Call]             [✉ Email]    |  |
|  +------------------------------------+  |
|  +------------------------------------+  |
|  | [Avatar] Priya Sharma, B.Sc. Nur   |  |
|  | Senior Staff Nurse | ICU Ward      |  |
|  | ID: HOSP-NUR-1042 | NNC: #49281    |  |
|  | [📞 Call]             [✉ Email]    |  |
|  +------------------------------------+  |
|  +------------------------------------+  |
|  | [Avatar] Suman Shrestha            |  |
|  | Chief Pharmacist | Central Dispens |  |
|  | ID: HOSP-PHM-0084 | NPC: #2291     |  |
|  | [📞 Call]             [✉ Email]    |  |
|  +------------------------------------+  |
|                                          |
|  [Home] [Calendar] [Leaves] [Staff] [Me] |
+------------------------------------------+
```

---

### Screen 6: Employee Profile Screen
- **Route:** `/directory/[id]`
- **Purpose:** Full profile card displaying clinical designations, council licenses, emergency contacts, and joining records.
- **Wireframe:**

```
+------------------------------------------+
|  [< Back]                  [Edit/Share]  |
|                                          |
|                 [Avatar]                 |
|            Priya Sharma, RN              |
|        Senior Staff Nurse - ICU          |
|      Employee ID: HOSP-NUR-1042          |
|                                          |
|  REGULATORY LICENSING                    |
|  +------------------------------------+  |
|  | Council: Nepal Nursing Council     |  |
|  | Reg No: NNC-#49281                 |  |
|  | Category: Registered General Nurse |  |
|  | Expiry: 14 Nov 2027  [✓ Verified]  |  |
|  +------------------------------------+  |
|                                          |
|  EMPLOYMENT DETAILS                      |
|  * Department: Intensive Care Unit (ICU) |
|  * Joining Date: 15 March 2022           |
|  * Employment Type: Permanent Full-Time  |
|  * Shift Group: Rotational 24/7 Clinical |
|                                          |
|  CONTACT & EMERGENCY                     |
|  * Mobile: +977 9841XXXXXX               |
|  * Work Email: priya.s@hospital.org.np   |
|  * Emergency: +977 9813XXXXXX (Spouse)   |
|                                          |
|  [📞 Voice Call]        [💬 Chat / SMS]  |
+------------------------------------------+
```

---

### Screen 7: Department Directory Screen
- **Route:** `/directory/departments`
- **Purpose:** Hierarchical breakdown of hospital departments with head of department (HOD) details and on-duty counts.
- **Wireframe:**

```
+------------------------------------------+
|  [< Back]    Hospital Departments        |
|  [ 🔍 Search department...             ] |
|                                          |
|  +------------------------------------+  |
|  | 🏥 Intensive Care Unit (ICU)       |  |
|  | HOD: Dr. Suresh Karki, MD          |  |
|  | Active Staff: 38  | On Duty: 12    |  |
|  | Extension: 2100                    |  |
|  +------------------------------------+  |
|  +------------------------------------+  |
|  | 🚑 Emergency & Trauma Center        |  |
|  | HOD: Dr. Binod Acharya             |  |
|  | Active Staff: 46  | On Duty: 15    |  |
|  | Extension: 1000                    |  |
|  +------------------------------------+  |
|  +------------------------------------+  |
|  | 💊 Central Pharmacy                |  |
|  | In-Charge: Suman Shrestha          |  |
|  | Active Staff: 14  | On Duty: 4     |  |
|  | Extension: 3200                    |  |
|  +------------------------------------+  |
+------------------------------------------+
```

---

### Screen 8: Attendance Calendar Screen (Mobile Optimized)
- **Route:** `/(tabs)/attendance`
- **Purpose:** Primary attendance dashboard. Calendar displayed on top half; date-wise details below it.
- **Wireframe:**

```
+------------------------------------------+
|  Attendance Calendar         [Summary 📊]|
|                                          |
|  <           OCTOBER 2026              > |
|  Sun   Mon   Tue   Wed   Thu   Fri   Sat |
|               1     2     3     4     5  |
|               🟢    🟢    🟢    🟢    ⚪  |
|   6     7     8     9    10    11    12* |
|   🟣    🟢    🟡    🟢    🟢    🟢   [🟢]| <- 12 Selected
|  13    14    15    16    17    18    19  |
|  🟢    🟢    🟢    🟢    🟢    🟢    ⚪  |
|                                          |
|  Legend: 🟢Pres 🟡Late 🔴Abs 🟣Lve ⚪Off  |
|  ======================================= |
|  SELECTED: Monday, Oct 12, 2026          |
|  +------------------------------------+  |
|  | Status: [✓ Present]   Shift: Morning|  |
|  | Punch In:  06:58 AM (Biometric T-1)|  |
|  | Punch Out: 03:08 PM (Biometric T-1)|  |
|  | Duration:  8h 10m   | Overtime: 10m|  |
|  | Remarks: Normal on-time duty       |  |
|  |                                    |  |
|  | [ Request Attendance Correction ]  |  |
|  +------------------------------------+  |
|                                          |
|  [Home] [Calendar] [Leaves] [Staff] [Me] |
+------------------------------------------+
```

---

### Screen 9: Date-Wise Attendance Details (Expanded Modal/Sheet)
- **Route:** `/attendance/[date]`
- **Purpose:** In-depth punch inspection, biometric log sequence, and punch correction trigger.
- **Wireframe:**

```
+------------------------------------------+
|  [Close ✕]      Attendance Details        |
|                                          |
|  Monday, October 12, 2026                |
|  [✓ PRESENT - NORMAL DUTY]               |
|                                          |
|  ASSIGNED SHIFT                          |
|  * Morning Clinical Roster (07:00-15:00) |
|  * Minimum Hours: 8.0 hrs                |
|                                          |
|  RAW BIOMETRIC LOGS                      |
|  * 06:58:14 AM - IN  (Main Gate Device)  |
|  * 12:30:20 PM - OUT (Lunch Break)       |
|  * 01:05:10 PM - IN  (ICU Staff Reader)  |
|  * 03:08:44 PM - OUT (Main Gate Device)  |
|                                          |
|  TOTAL RECORDED TIME                     |
|  Work Duration: 8 hrs 10 mins            |
|  Break Duration: 35 mins                 |
|                                          |
|  +------------------------------------+  |
|  |    REQUEST CORRECTION / PUNCH      |  |
|  +------------------------------------+  |
+------------------------------------------+
```

---

### Screen 10: Monthly Attendance Summary Screen
- **Route:** `/attendance/summary`
- **Purpose:** High-level metrics for employee monthly performance, late counts, and overtime calculation.
- **Wireframe:**

```
+------------------------------------------+
|  [< Back]    October 2026 Summary [Share]|
|                                          |
|  Staff: Priya Sharma | ID: 1042          |
|                                          |
|  +------------------------------------+  |
|  | TOTAL CALENDAR DAYS: 31            |  |
|  | Working Days: 26  | Off Days: 5    |  |
|  +------------------------------------+  |
|                                          |
|  METRICS BREAKDOWN                       |
|  * Present Days:          21 Days (81%)  |
|  * Late Arrivals:          1 Day         |
|  * Half Days:              0 Days        |
|  * Approved Leaves:        2 Days (SL)   |
|  * Unexcused Absences:     0 Days        |
|  * Accumulated Overtime:   4 hrs 30 mins |
|                                          |
|  COMPLIANCE STATUS                       |
|  [✓ 100% Minimum Shift Attendance Met]  |
|                                          |
|  +------------------------------------+  |
|  |     EXPORT MONTHLY SLIP (PDF)      |  |
|  +------------------------------------+  |
+------------------------------------------+
```

---

### Screen 11: Leave Application Screen
- **Route:** `/leave/apply`
- **Purpose:** Form to apply for leave with type picker, clinical cover/handover colleague, and attachment support.
- **Wireframe:**

```
+------------------------------------------+
|  [< Back]      Apply for Leave           |
|                                          |
|  Leave Type                              |
|  [ Sick Leave (SL) - 6 Days Left     ▼ ] |
|                                          |
|  Leave Duration                          |
|  (•) Full Day      ( ) Half Day          |
|                                          |
|  From Date                 To Date       |
|  [ 15 Oct 2026 📅 ]       [ 16 Oct 2026 ]|
|  Total Days: 2 Days                      |
|                                          |
|  Clinical Duty Handover / Cover Staff *  |
|  [ Select Nurse / Doctor Colleague   ▼ ] |
|  Selected: Nurse Sarita Rai (ICU)        |
|                                          |
|  Reason for Leave *                      |
|  [ Viral Fever, doctor prescribed rest ] |
|                                          |
|  Supporting Document (Medical Cert)      |
|  [ 📎 Upload Prescription / Slip       ] |
|                                          |
|  +------------------------------------+  |
|  |       SUBMIT LEAVE APPLICATION     |  |
|  +------------------------------------+  |
+------------------------------------------+
```

---

### Screen 12: Leave Request History Screen
- **Route:** `/(tabs)/leave`
- **Purpose:** Track past and pending leave requests with cancellation capability.
- **Wireframe:**

```
+------------------------------------------+
|  My Leaves                   [+ Apply]   |
|                                          |
|  (All)   (Pending)  (Approved) (Rejected)|
|                                          |
|  +------------------------------------+  |
|  | SICK LEAVE (2 Days)   [⏳ PENDING] |  |
|  | Oct 15, 2026 - Oct 16, 2026        |  |
|  | Handover: Nurse Sarita Rai         |  |
|  | Approver: Sister Nirmala (HOD)     |  |
|  | [ Cancel Request ]                 |  |
|  +------------------------------------+  |
|  +------------------------------------+  |
|  | CASUAL LEAVE (1 Day)  [✓ APPROVED]|  |
|  | Oct 06, 2026                       |  |
|  | Handover: Nurse Rita KC            |  |
|  | Approved on: Oct 04, 2026          |  |
|  +------------------------------------+  |
|                                          |
|  [Home] [Calendar] [Leaves] [Staff] [Me] |
+------------------------------------------+
```

---

### Screen 13: Leave Approval Queue (Dept Head / HR Admin)
- **Route:** `/leave/approvals`
- **Purpose:** Triage pending team requests with clinical staffing check.
- **Wireframe:**

```
+------------------------------------------+
|  [< Back]     Leave Approvals   [Badge 3]|
|                                          |
|  PENDING APPROVALS (ICU WARD)            |
|  +------------------------------------+  |
|  | [Avatar] Priya Sharma, RN          |  |
|  | Type: Sick Leave (2 Days)          |  |
|  | Dates: Oct 15 - Oct 16, 2026       |  |
|  | Handover: Sarita Rai [Agreed ✓]    |  |
|  | ICU Roster Impact: 6 on duty (OK)  |  |
|  | Balance: 6 SL remaining            |  |
|  |                                    |  |
|  |   [ ✕ REJECT ]     [ ✓ APPROVE ]   |  |
|  +------------------------------------+  |
|  +------------------------------------+  |
|  | [Avatar] Bimal Giri, Paramedic     |  |
|  | Type: Casual Leave (1 Day)         |  |
|  | Dates: Oct 18, 2026                |  |
|  | Handover: Pending Confirmation ⚠️  |  |
|  |                                    |  |
|  |   [ ✕ REJECT ]     [ ✓ APPROVE ]   |  |
|  +------------------------------------+  |
+------------------------------------------+
```

---

### Screen 14: Notifications Screen
- **Route:** `/notifications`
- **Purpose:** Centralized feed of clinical shift updates, leave decisions, council license alerts, and administrative circulars.
- **Wireframe:**

```
+------------------------------------------+
|  [< Back]     Notifications     [Clear]  |
|                                          |
|  NEW                                     |
|  +------------------------------------+  |
|  | 🔔 Leave Approved!                  |  |
|  | Your Casual Leave for Oct 06 has   |  |
|  | been approved by HOD Nirmala.       |  |
|  | 2 hours ago                         |  |
|  +------------------------------------+  |
|  +------------------------------------+  |
|  | ⚠️ Council Renewal Reminder         |  |
|  | Your Nepal Nursing Council license  |  |
|  | expires in 45 days. Renew now.      |  |
|  | Yesterday                           |  |
|  +------------------------------------+  |
|                                          |
|  EARLIER                                 |
|  +------------------------------------+  |
|  | 📢 Hospital Circular #42           |  |
|  | Updated Infection Control SOPs for  |  |
|  | Winter Respiratory Admissions.      |  |
|  | 3 days ago                          |  |
|  +------------------------------------+  |
+------------------------------------------+
```

---

### Screen 15: Reports & Analytics Screen
- **Route:** `/(tabs)/reports`
- **Purpose:** Mobile-friendly department-level and hospital-wide attendance summaries and compliance rosters.
- **Wireframe:**

```
+------------------------------------------+
|  Reports & Analytics         [Filter ⚙]  |
|                                          |
|  PERIOD: [ This Month: Oct 2026     ▼ ]  |
|  DEPARTMENT: [ ICU Ward             ▼ ]  |
|                                          |
|  KEY PERFORMANCE INDICATORS              |
|  +------------------+-----------------+  |
|  | ATTENDANCE RATE  | ON-TIME RATE    |  |
|  | 95.8%            | 92.4%           |  |
|  +------------------+-----------------+  |
|                                          |
|  OVERTIME HOURS (DEPT TOTAL)             |
|  142 Hours recorded this month           |
|                                          |
|  LICENSING COMPLIANCE RATE               |
|  [========================] 97% Verified |
|  * 1 Nurse renewal overdue               |
|                                          |
|  EXPORT ACTION                           |
|  +------------------------------------+  |
|  |     [ 📥 SHARE MONTHLY CSV ]       |  |
|  +------------------------------------+  |
|  +------------------------------------+  |
|  |     [ 📄 EXPORT PDF ROSTER ]       |  |
|  +------------------------------------+  |
|                                          |
|  [Home] [Calendar] [Leaves] [Staff] [Me] |
+------------------------------------------+
```

---

### Screen 16: User Profile and Settings Screen
- **Route:** `/(tabs)/profile`
- **Purpose:** Personal details, security settings, biometric switch, notification toggles, and logout.
- **Wireframe:**

```
+------------------------------------------+
|  User Profile & Settings                 |
|                                          |
|  [Avatar] Priya Sharma, RN               |
|  Senior Staff Nurse | HOSP-NUR-1042      |
|  priya.s@hospital.org.np                 |
|                                          |
|  ACCOUNT & SECURITY                      |
|  * Biometric Authentication (Face ID) [🔘]|
|  * Change Password                   [ >]|
|  * Active Logged-in Devices          [ >]|
|                                          |
|  PREFERENCES                             |
|  * Push Notifications                [🔘]|
|  * Shift Reminder Alerts (1h before) [🔘]|
|  * Language Selection (English/Nepali)[ >]|
|                                          |
|  REGULATORY CREDENTIALS                  |
|  * Nepal Nursing Council (NNC)       [✓] |
|                                          |
|  ABOUT                                   |
|  * App Version: 1.0.0 (Build 104)        |
|  * Hospital Helpdesk Ext: 4400           |
|                                          |
|  +------------------------------------+  |
|  |              LOG OUT               |  |  <- Red outline / text
|  +------------------------------------+  |
|                                          |
|  [Home] [Calendar] [Leaves] [Staff] [Me] |
+------------------------------------------+
```
