# 07 - Mobile Testing Strategy & Quality Assurance Plan

This document establishes the comprehensive testing architecture and automated verification strategy for the Healthcare HR Management Mobile Application.

---

## 1. Testing Pyramid & Tooling Stack

```
             /\
            /  \       Maestro E2E Mobile Automation
           / E2E\      (Real Android/iOS Emulators & Devices)
          /------\
         /  Integ \    Supertest (NestJS API Contract Verification)
        /  Testing \   + MSW (Mock Service Worker for React Native)
       /------------\
      /  Component   \  Jest + React Native Testing Library (RNTL)
     /   & Unit Tests \ (Atomic UI Primitives, Form Validation & Business Logic)
    +------------------+
```

| Testing Layer | Framework / Runner | Target Scope |
|---|---|---|
| **Unit & Calculations** | Jest | Attendance calculations, overtime math, council date checks, date conversions |
| **Component & Forms** | React Native Testing Library (RNTL) | UI rendering, touch targets, Zod validation feedback, accessible roles |
| **Navigation & RBAC** | RNTL + Expo Router Test Harness | Screen transitions, tab filtering, route guard redirects |
| **API Integration** | Supertest + NestJS TestSuite | Backend endpoints, Prisma constraints, JWT auth guards |
| **End-to-End (E2E)** | Maestro | Full user flows: Login -> View Calendar -> Apply Leave -> Approve Leave |
| **Device & Accessibility**| axe-core / Maestro Accessibility | Screen readers (TalkBack/VoiceOver), dynamic font scaling, 48dp targets |

---

## 2. Unit & Component Testing (Jest & RNTL)

### A. Calendar & Attendance Calculations Unit Test

```typescript
// __tests__/utils/attendanceCalculators.test.ts
import { 
  calculateWorkDuration, 
  evaluateAttendanceStatus,
  calculateLateMinutes 
} from '@/utils/attendanceCalculators';

describe('Attendance Domain Calculation Engine', () => {
  it('correctly calculates regular shift duration', () => {
    const minutes = calculateWorkDuration('07:00', '15:00');
    expect(minutes).toBe(480); // 8 hours
  });

  it('determines LATE status when check-in exceeds 15-minute grace period', () => {
    const status = evaluateAttendanceStatus({
      shiftStart: '07:00',
      punchIn: '07:18', // 18 mins late
      gracePeriodMinutes: 15,
      shiftEnd: '15:00',
      punchOut: '15:00',
    });
    expect(status).toBe('LATE');
  });

  it('flags HALF_DAY if total duration is less than 4.5 hours', () => {
    const status = evaluateAttendanceStatus({
      shiftStart: '07:00',
      punchIn: '07:00',
      shiftEnd: '15:00',
      punchOut: '11:15', // 4h 15m
      minHalfDayMinutes: 270,
    });
    expect(status).toBe('HALF_DAY');
  });
});
```

### B. Form Validation Component Test (React Hook Form + Zod)

```typescript
// __tests__/features/leave/LeaveApplicationForm.test.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { LeaveApplicationScreen } from '@/features/leave/screens/LeaveApplicationScreen';

describe('Leave Application Screen Form Validation', () => {
  it('displays mandatory validation error when clinical handover staff is omitted', async () => {
    const { getByText, getByTestId } = render(<LeaveApplicationScreen />);

    // Tap submit without selecting handover staff
    const submitBtn = getByText('SUBMIT LEAVE APPLICATION');
    fireEvent.press(submitBtn);

    await waitFor(() => {
      expect(getByText('Clinical duty handover staff is required')).toBeTruthy();
    });
  });

  it('validates that end date cannot precede start date', async () => {
    const { getByText, getByTestId } = render(<LeaveApplicationScreen />);
    
    // Set invalid dates
    fireEvent.changeText(getByTestId('input-start-date'), '2026-10-18');
    fireEvent.changeText(getByTestId('input-end-date'), '2026-10-15');

    const submitBtn = getByText('SUBMIT LEAVE APPLICATION');
    fireEvent.press(submitBtn);

    await waitFor(() => {
      expect(getByText('End date must be on or after start date')).toBeTruthy();
    });
  });
});
```

---

## 3. End-to-End Testing Workflows (Maestro)

Maestro is utilized for robust, cross-platform Android and iOS user journey automation without flakiness.

### A. Flow 1: Clinical Staff Sign-in & Attendance Verification (`login_and_attendance.yaml`)

```yaml
appId: com.carepulse.hr
---
- launchApp
- assertVisible: "CarePulse HR"

# Step 1: Input Credentials
- tapOn:
    id: "input-employee-id"
- inputText: "HOSP-NUR-1042"
- tapOn:
    id: "input-password"
- inputText: "Password@2026"
- hideKeyboard
- tapOn: "SIGN IN"

# Step 2: Verify Home Dashboard
- assertVisible: "Priya Sharma, RN"
- assertVisible: "CURRENT SHIFT"

# Step 3: Navigate to Attendance Tab
- tapOn: "Calendar"
- assertVisible: "Attendance Calendar"
- assertVisible: "OCTOBER 2026"

# Step 4: Tap specific date cell and verify details card
- tapOn:
    id: "calendar-day-12"
- assertVisible: "Monday, Oct 12, 2026"
- assertVisible: "Status: Present"
- assertVisible: "Punch In: 06:58 AM"
```

### B. Flow 2: Leave Application & Supervisor Approval Flow (`leave_lifecycle.yaml`)

```yaml
appId: com.carepulse.hr
---
# Pre-requisite: User logged in as Nurse
- tapOn: "Leaves"
- assertVisible: "My Leaves"
- tapOn: "+ Apply"

# Fill Form
- tapOn: "Leave Type"
- tapOn: "Sick Leave"
- tapOn: "Clinical Duty Handover"
- tapOn: "Nurse Sarita Rai"
- tapOn: "input-reason"
- inputText: "Medical emergency - high fever."
- hideKeyboard
- tapOn: "SUBMIT LEAVE APPLICATION"

# Verify Toast & Pending Record in History
- assertVisible: "Leave application submitted successfully"
- assertVisible: "SICK LEAVE (1 Day)"
- assertVisible: "PENDING"
```

---

## 4. Backend API Contract Verification (Supertest)

Contract tests verify that the NestJS REST API endpoints conform to mobile security, payload requirements, and role guards.

```typescript
// test/api/attendance-contract.e2e-spec.ts
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@/app.module';

describe('Attendance API Mobile Integration (E2E)', () => {
  let app: INestApplication;
  let staffToken: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    // Authenticate test staff
    const loginRes = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ identifier: 'HOSP-NUR-1042', password: 'Password@2026' });
    staffToken = loginRes.body.accessToken;
  });

  it('GET /api/v1/attendance/calendar returns monthly array matching mobile schema', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/attendance/calendar?year=2026&month=10')
      .set('Authorization', `Bearer ${staffToken}`)
      .expect(200);

    expect(res.body).toHaveProperty('year', 2026);
    expect(res.body).toHaveProperty('month', 10);
    expect(Array.isArray(res.body.days)).toBe(true);
    expect(res.body.days[0]).toHaveProperty('status');
    expect(res.body.days[0]).toHaveProperty('shiftName');
  });

  it('rejects unauthenticated attendance access with 401', async () => {
    await request(app.getHttpServer())
      .get('/api/v1/attendance/calendar?year=2026&month=10')
      .expect(401);
  });
});
```

---

## 5. Network Failure & Offline Recovery Test Cases

| Scenario | Test Procedure | Expected Outcome |
|---|---|---|
| **Airplane Mode Launch** | Launch app while device is offline with valid cached credentials. | App loads cached profile and monthly calendar without crash. Displays soft amber offline banner. |
| **Offline Leave Submission** | Staff submits leave application without active internet. | Form validates, stores request in local Outbox Queue, displays *"Queued (Offline)"* in history. |
| **Reconnection Auto-Sync** | Restore internet connection after offline mutation. | Outbox queue processor dispatches payload with idempotency key. Status transitions from Queued to Pending. |
| **Expired JWT Token (401)** | Simulate access token expiration during calendar swipe. | Axios interceptor pauses queries, invokes `/auth/refresh` silently, receives fresh token, and fulfills request without logging user out. |
| **Token Revocation (Force Logout)**| Revoke refresh token on server (admin action). | Interceptor fails refresh, clears SecureStore tokens, transitions auth state to unauthenticated, and routes to `/auth/login`. |

---

## 6. Device Compatibility & Accessibility Matrix

### A. Mobile Form Factors & OS Versions
- **Android:**
  - Android 10 (API 29) to Android 15 (API 35).
  - Screen densities: `xhdpi`, `xxhdpi`, `xxxhdpi` (360dp to 430dp viewport widths).
  - Devices tested: Google Pixel 7/8, Samsung Galaxy S21/S23, Redmi Note series.
- **iOS:**
  - iOS 16.0 to iOS 18.x.
  - Devices tested: iPhone SE (3rd Gen - 4.7" compact screen), iPhone 13/14/15 (6.1" standard), iPhone 15/16 Pro Max (6.7" large display).

### B. Accessibility & Clinical Environment Usability
- **Dynamic Font Scaling:** UI scales seamlessly up to 200% font size without text clipping in calendar cards.
- **Color Contrast:** All status badges pair distinct icon vectors with text labels (ensuring full comprehension for staff with color vision deficiency).
- **Touch Bounds:** All interactive elements maintain a minimum 48x48 dp touch container for rapid clinical duty tapping.
