# 05 - Mobile Application Architecture

This document describes the internal engineering organization, state management paradigms, data models, and technical patterns for the React Native, Expo, and TypeScript mobile application.

---

## 1. High-Level Architecture Diagram

```
+-----------------------------------------------------------------------------------+
|                           PRESENTATION LAYER (UI)                                 |
|  - Expo Router Screens (`src/app/**`)                                             |
|  - Feature Views (`src/features/**/components`)                                   |
|  - Atomic Design Primitives (`src/components/ui/**`: Button, Card, Badge, Input)  |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|                        APPLICATION & STATE LAYER                                  |
|  - Client State: Zustand Stores (`authStore`, `themeStore`, `offlineQueueStore`)  |
|  - Server State: TanStack Query v5 (`useAttendance`, `useLeaveRequests`, etc.)     |
|  - Form Validation: React Hook Form + Zod Schemas                                 |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|                       DATA ACCESS & NETWORKING LAYER                              |
|  - Axios API Client with Auto-Refresh Token Interceptors & SSL Pinning            |
|  - Offline Outbox Queue & Retry Engine                                            |
|  - Hardware Security: `expo-secure-store` (iOS Keychain / Android KeyStore)       |
|  - Fast Cache: `react-native-mmkv` / AsyncStorage                                 |
+-----------------------------------------------------------------------------------+
```

---

## 2. Directory Structure Blueprint

```
src/
├── app/                           # Expo Router File-Based Routing
│   ├── _layout.tsx                # Root layout with QueryClient & Auth Provider
│   ├── (auth)/                    # Unauthenticated Stack
│   │   ├── _layout.tsx
│   │   ├── login.tsx              # Screen 2: Login
│   │   └── forgot-password.tsx    # Screen 3: Forgot Password
│   ├── (tabs)/                    # Authenticated Bottom Tab Navigator
│   │   ├── _layout.tsx            # Dynamic Tab Bar (Role-filtered)
│   │   ├── index.tsx              # Screen 4: Home Dashboard
│   │   ├── attendance.tsx         # Screen 8: Attendance Calendar & Date-wise Cards
│   │   ├── leave.tsx              # Screen 12: Leave Request History
│   │   ├── directory.tsx          # Screen 5: Staff Directory
│   │   ├── reports.tsx            # Screen 15: Reports & Analytics (Role-Gated)
│   │   └── profile.tsx            # Screen 16: User Profile & Settings
│   ├── attendance/
│   │   ├── [date].tsx             # Screen 9: Date-wise Attendance Detailed Modal
│   │   └── summary.tsx            # Screen 10: Monthly Attendance Summary
│   ├── leave/
│   │   ├── apply.tsx              # Screen 11: Leave Application Form
│   │   └── approvals.tsx          # Screen 13: Leave Approval Queue
│   ├── directory/
│   │   ├── [id].tsx               # Screen 6: Employee Profile
│   │   └── departments.tsx        # Screen 7: Department Directory
│   ├── notifications.tsx          # Screen 14: Notifications
│   └── splash.tsx                 # Screen 1: Splash Screen
│
├── components/                    # Cross-feature Reusable UI Primitives
│   ├── ui/
│   │   ├── Button.tsx             # Touch-friendly 48dp Pink Button
│   │   ├── Card.tsx               # Rounded White Card with Border & Shadow
│   │   ├── Badge.tsx              # Status Badge with Color, Icon & Accessible Text
│   │   ├── Input.tsx              # Accessible Form Input with Error States
│   │   ├── Avatar.tsx             # Rounded Staff Avatar with Status Pip
│   │   ├── Modal.tsx              # Accessible Bottom Sheet & Dialog Wrapper
│   │   └── Skeleton.tsx           # Pink Shimmer Skeleton Loader
│   └── feedback/
│       ├── EmptyState.tsx         # Centered Empty State Graphic & Copy
│       ├── ErrorState.tsx         # Retry Card with Error Diagnostics
│       └── OfflineBanner.tsx      # Persistent Amber Connectivity Strip
│
├── features/                      # Domain Feature Modules (Vertical Slices)
│   ├── auth/
│   │   ├── api/                   # Auth login, refresh, logout, OTP mutations
│   │   ├── components/            # LoginForm, BiometricPrompt, OtpInput
│   │   ├── hooks/                 # useAuth, useBiometricAuth
│   │   └── schemas/               # loginSchema, forgotPasswordSchema
│   ├── dashboard/
│   │   ├── components/            # ShiftBanner, QuickActionGrid, KPIWidget
│   │   └── hooks/                 # useDashboardMetrics
│   ├── employees/
│   │   ├── api/                   # getStaffList, getStaffById, updateProfile
│   │   ├── components/            # StaffCard, CouncilRegistrationBadge
│   │   └── hooks/                 # useStaffDirectory, useStaffProfile
│   ├── departments/
│   │   ├── api/                   # getDepartments, getDeptHeadcount
│   │   └── components/            # DepartmentCard, ShiftRosterList
│   ├── attendance/
│   │   ├── api/                   # getCalendarLogs, submitCorrection
│   │   ├── components/            # MonthGrid, PunchDetailsCard, ShiftCard
│   │   └── hooks/                 # useAttendanceCalendar, usePunchDetails
│   ├── leave/
│   │   ├── api/                   # getLeaveBalances, submitLeave, reviewLeave
│   │   ├── components/            # LeaveBalanceCard, LeaveRequestRow
│   │   └── hooks/                 # useLeaveBalances, useLeaveApprovals
│   ├── notifications/
│   │   ├── api/                   # getNotifications, markAsRead
│   │   └── components/            # NotificationCard
│   └── reports/
│       ├── api/                   # getMonthlyAttendanceReport, exportCsv
│       └── components/            # KpiMetricCard, RosterTableCard
│
├── navigation/                    # Navigation Types, Guards & Linking
│   ├── types.ts                   # Typed Route Params
│   └── RoleGuard.tsx              # Permission-based Component Gate
│
├── services/                      # Infrastructure & Network Clients
│   ├── api/
│   │   ├── client.ts              # Axios instance with interceptors
│   │   ├── endpoints.ts           # Centralized API URL constants
│   │   └── errors.ts              # Standardized API error parser
│   ├── storage/
│   │   ├── secureStorage.ts       # expo-secure-store wrapper
│   │   └── cacheStorage.ts        # Fast MMKV / AsyncStorage wrapper
│   └── offline/
│       ├── offlineQueue.ts        # Outbox mutation queue manager
│       └── networkMonitor.ts      # NetInfo listener
│
├── hooks/                         # Global Custom Hooks
│   ├── useNetworkStatus.ts        # Online/offline state listener
│   ├── usePermissions.ts          # Granular RBAC permission check
│   └── useDebounce.ts             # Input search debouncer
│
├── theme/                         # Theme System & Tokens
│   ├── tokens.ts                  # PinkTheme color tokens, spacing, fonts
│   └── useTheme.ts                # Theme provider hook
│
├── types/                         # Shared TypeScript Models & Interfaces
│   ├── auth.types.ts
│   ├── employee.types.ts
│   ├── attendance.types.ts
│   ├── leave.types.ts
│   ├── department.types.ts
│   └── common.types.ts
│
└── utils/                         # Reusable Utility Functions
    ├── dateUtils.ts               # Date formatters (Bikram Sambat/Gregorian)
    ├── attendanceCalculators.ts   # Overtime, late arrival, shift calculations
    └── formatters.ts              # Phone numbers, registration strings
```

---

## 3. TypeScript Shared Data Models

```typescript
// src/types/common.types.ts
export type UserRole = 
  | 'ROLE_SUPER_ADMIN' 
  | 'ROLE_HR_ADMIN' 
  | 'ROLE_DEPT_HEAD' 
  | 'ROLE_STAFF' 
  | 'ROLE_AUDITOR';

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// src/types/employee.types.ts
export type CouncilType = 'NNC' | 'NPC' | 'NMC' | 'NHPC';

export interface ProfessionalCouncilRecord {
  councilType: CouncilType;
  registrationNumber: string;
  categoryOrLevel?: string; // e.g. "Staff Nurse", "Pharmacist", "Specialist Doctor"
  issuedDate: string;
  expiryDate: string;
  isVerified: boolean;
  verifiedBy?: string;
  verifiedAt?: string;
}

export interface EmployeeProfile {
  id: string;
  employeeCode: string; // e.g., "HOSP-NUR-1042"
  firstName: string;
  lastName: string;
  fullName: string;
  avatarUrl?: string;
  email: string;
  phone: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  dateOfBirth: string;
  bloodGroup?: string;
  permanentAddress: string;
  currentAddress: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  departmentId: string;
  departmentName: string;
  designation: string;
  joiningDate: string;
  employmentType: 'PERMANENT' | 'PROBATION' | 'CONTRACT' | 'LOCUM' | 'INTERN';
  employmentStatus: 'ACTIVE' | 'ON_LEAVE' | 'SUSPENDED' | 'RESIGNED';
  councils: ProfessionalCouncilRecord[];
  role: UserRole;
}

// src/types/attendance.types.ts
export type AttendanceStatus = 
  | 'PRESENT' 
  | 'LATE' 
  | 'ABSENT' 
  | 'HALF_DAY' 
  | 'LEAVE' 
  | 'WEEKLY_OFF' 
  | 'HOLIDAY';

export interface BiometricLog {
  id: string;
  punchTime: string; // ISO 8601
  type: 'IN' | 'OUT';
  terminalId: string;
  terminalLocation: string;
}

export interface AttendanceDayRecord {
  date: string; // "YYYY-MM-DD"
  status: AttendanceStatus;
  shiftName: string;
  shiftStartTime: string; // "07:00"
  shiftEndTime: string;   // "15:00"
  firstPunchIn?: string;
  lastPunchOut?: string;
  workDurationMinutes: number;
  lateArrivalMinutes: number;
  overtimeMinutes: number;
  remarks?: string;
  hasCorrectionPending: boolean;
  biometricLogs?: BiometricLog[];
}

export interface AttendanceMonthlySummary {
  year: number;
  month: number;
  totalDays: number;
  workingDays: number;
  presentDays: number;
  lateDays: number;
  halfDays: number;
  leaveDays: number;
  absentDays: number;
  weeklyOffDays: number;
  holidays: number;
  totalOvertimeMinutes: number;
  attendancePercentage: number;
}

// src/types/leave.types.ts
export type LeaveTypeCode = 'SICK' | 'CASUAL' | 'ANNUAL' | 'MATERNITY' | 'PATERNITY' | 'COMPENSATORY';
export type LeaveStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';

export interface LeaveBalance {
  leaveTypeCode: LeaveTypeCode;
  leaveTypeName: string;
  entitledDays: number;
  consumedDays: number;
  remainingDays: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveTypeCode: LeaveTypeCode;
  leaveTypeName: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  isHalfDay: boolean;
  halfDayType?: 'FIRST_HALF' | 'SECOND_HALF';
  handoverStaffId?: string;
  handoverStaffName?: string;
  reason: string;
  attachmentUrl?: string;
  status: LeaveStatus;
  appliedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  rejectionReason?: string;
}
```

---

## 4. State Management Strategy

### A. Client Session State (Zustand)
Used strictly for synchronous local state: tokens, authenticated user profile, active offline action queue, and theme mode.

```typescript
// src/features/auth/stores/authStore.ts
import { create } from 'zustand';
import { UserRole } from '@/types/common.types';
import { SecureStorage } from '@/services/storage/secureStorage';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
  user: {
    id: string;
    employeeCode: string;
    fullName: string;
    role: UserRole;
    departmentId: string;
    avatarUrl?: string;
  } | null;
  setSession: (token: string, user: AuthState['user']) => Promise<void>;
  clearSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isLoading: true,
  accessToken: null,
  user: null,
  setSession: async (token, user) => {
    await SecureStorage.setAccessToken(token);
    set({ isAuthenticated: true, accessToken: token, user, isLoading: false });
  },
  clearSession: async () => {
    await SecureStorage.clearTokens();
    set({ isAuthenticated: false, accessToken: null, user: null, isLoading: false });
  },
}));
```

### B. Server State & Cache (TanStack Query v5)
All remote hospital data (attendance calendars, staff lists, leave requests) are managed by React Query with tuned cache policies:

- **Attendance Calendar:** `staleTime: 5 * 60 * 1000` (5 minutes), persists in local MMKV cache for instant display on launch.
- **Staff Directory:** `staleTime: 15 * 60 * 1000` (15 minutes).
- **Leave Approval Queue:** `staleTime: 30 * 1000` (30 seconds) to ensure department heads see real-time staffing requests.

---

## 5. Security & Secure Storage Architecture

1. **Hardware-Backed Secret Storage:**
   - On iOS: Stored in the native Keychain using `kSecAttrAccessibleAfterFirstUnlock`.
   - On Android: Stored in KeyStore encrypted via AES-256 GCM.
   - Used for: Refresh Tokens, Biometric Public Keys, Biometric Auto-Login Token.
2. **Access Token Lifetimes:**
   - 15-minute access token passed via `Authorization: Bearer <token>`.
   - Axios request interceptor automatically catches `401 Unauthorized`, queues downstream requests, invokes `/auth/refresh` using the secure refresh token, and replays failed queries seamlessly.
3. **Biometric Integration:**
   - `expo-local-authentication` checks hardware capabilities (`LocalAuthentication.hasHardwareAsync()`).
   - If biometric prompt succeeds, mobile client decrypts a localized refresh secret to request a fresh access token without prompting for the password.

---

## 6. Offline State & Outbox Synchronization

Hospital basements, emergency rooms, and radiology bunkers frequently experience cellular shielding. The application utilizes an **Optimistic Outbox Queue**:

1. **Offline Punch Correction & Leave Submission:**
   - When `NetInfo.isConnected === false`, actions are serialized into an encrypted `offlineQueue` in local storage.
   - The UI immediately renders the pending record with an *"Offline - Queued to sync"* badge.
2. **Sync Recovery Engine:**
   - Network listener watches for reconnect events.
   - On connection restoration, the queue processor iterates through items with idempotency keys (`X-Idempotency-Key: UUID`) to prevent duplicate submissions.
