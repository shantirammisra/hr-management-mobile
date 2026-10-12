# 06 - Data and Backend API Integration Specification

This document defines the REST API integration contracts between the React Native mobile application and the NestJS backend service.

---

## 1. Architectural Integration Principles

```
+------------------------------------+
|  React Native Mobile App (Client)  |
+------------------------------------+
                  |
                  | HTTPS / TLS 1.3
                  | Headers: Authorization: Bearer <JWT>
                  | Headers: X-App-Version, X-Device-Id, X-Idempotency-Key
                  v
+------------------------------------+
|       NestJS API Gateway           |
|  - AuthGuard (JWT Passport)        |
|  - RolesGuard (RBAC Decorators)    |
|  - ValidationPipe (class-validator)|
+------------------------------------+
                  |
                  v
+------------------------------------+
|     Prisma ORM & PostgreSQL       |
|  (Never accessed by mobile client) |
+------------------------------------+
```

### Critical Rules
1. **Zero Direct Database Exposure:** The mobile application **never** connects directly to PostgreSQL. All persistence, authorization guards, and business logic run strictly within the NestJS API layer.
2. **Strict Mobile Payload Scoping:** Endpoints return only mobile-necessary fields to reduce cellular bandwidth and prevent accidental leakage of sensitive clinical compensation or audit data.
3. **Transport Security:** All endpoints require **HTTPS with TLS 1.3** and certificate pinning support on mobile builds.

---

## 2. API Contract Specifications

### A. Authentication & Session Endpoints

#### 1. POST `/api/v1/auth/login`
Authenticates staff and returns tokens with clinical profile context.
- **Request Body:**
  ```json
  {
    "identifier": "HOSP-NUR-1042",
    "password": "Password@2026",
    "deviceId": "uuid-device-9921",
    "devicePlatform": "ios"
  }
  ```
- **Response `200 OK`:**
  ```json
  {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 900,
    "user": {
      "id": "usr_991823",
      "employeeCode": "HOSP-NUR-1042",
      "fullName": "Priya Sharma",
      "role": "ROLE_STAFF",
      "departmentId": "dept_icu_01",
      "departmentName": "Intensive Care Unit (ICU)",
      "designation": "Senior Staff Nurse",
      "avatarUrl": "https://cdn.hospital.org.np/avatars/1042.jpg"
    }
  }
  ```

#### 2. POST `/api/v1/auth/refresh`
Refreshes access token using secure refresh token.
- **Headers:** `Authorization: Bearer <refreshToken>`
- **Response `200 OK`:**
  ```json
  {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 900
  }
  ```

#### 3. POST `/api/v1/auth/forgot-password`
Initiates OTP generation for password recovery.
- **Request Body:**
  ```json
  {
    "identifier": "HOSP-NUR-1042"
  }
  ```
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "message": "Verification OTP dispatched to registered mobile ending in ****89",
    "otpSessionId": "otp_sess_881923"
  }
  ```

#### 4. POST `/api/v1/auth/reset-password`
Submits verified OTP and new password.
- **Request Body:**
  ```json
  {
    "otpSessionId": "otp_sess_881923",
    "otpCode": "482910",
    "newPassword": "NewStrongPass#2026"
  }
  ```
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "message": "Password successfully updated. Please sign in."
  }
  ```

---

### B. Employee & Department Endpoints

#### 1. GET `/api/v1/employees`
Lists hospital employees with pagination and filters.
- **Query Params:**
  - `page`: number (default: 1)
  - `limit`: number (default: 20)
  - `search`: string (Name, Employee ID, or Council Reg)
  - `departmentId`: string
  - `role`: string
  - `councilStatus`: `"VERIFIED"` | `"PENDING"` | `"EXPIRED"`
- **Response `200 OK`:**
  ```json
  {
    "data": [
      {
        "id": "emp_1042",
        "employeeCode": "HOSP-NUR-1042",
        "fullName": "Priya Sharma",
        "avatarUrl": "https://cdn.hospital.org.np/avatars/1042.jpg",
        "departmentName": "Intensive Care Unit (ICU)",
        "designation": "Senior Staff Nurse",
        "phone": "+977 9841234567",
        "email": "priya.s@hospital.org.np",
        "councils": [
          {
            "councilType": "NNC",
            "registrationNumber": "NNC-49281",
            "isVerified": true,
            "expiryDate": "2027-11-14"
          }
        ]
      }
    ],
    "total": 340,
    "page": 1,
    "limit": 20,
    "hasMore": true
  }
  ```

#### 2. GET `/api/v1/employees/:id`
Retrieves comprehensive employee profile.
- **Response `200 OK`:**
  ```json
  {
    "id": "emp_1042",
    "employeeCode": "HOSP-NUR-1042",
    "firstName": "Priya",
    "lastName": "Sharma",
    "fullName": "Priya Sharma",
    "avatarUrl": "https://cdn.hospital.org.np/avatars/1042.jpg",
    "email": "priya.s@hospital.org.np",
    "phone": "+977 9841234567",
    "gender": "FEMALE",
    "dateOfBirth": "1994-08-20",
    "bloodGroup": "O_POSITIVE",
    "permanentAddress": "Ward 4, Bharatpur, Chitwan",
    "currentAddress": "Maharajgunj, Kathmandu",
    "emergencyContactName": "Ramesh Sharma",
    "emergencyContactPhone": "+977 9813998877",
    "emergencyContactRelation": "Spouse",
    "department": {
      "id": "dept_icu_01",
      "name": "Intensive Care Unit (ICU)",
      "extension": "2100"
    },
    "designation": "Senior Staff Nurse",
    "joiningDate": "2022-03-15",
    "employmentType": "PERMANENT",
    "employmentStatus": "ACTIVE",
    "councils": [
      {
        "councilType": "NNC",
        "registrationNumber": "NNC-49281",
        "categoryOrLevel": "Staff Nurse",
        "issuedDate": "2017-11-15",
        "expiryDate": "2027-11-14",
        "isVerified": true
      }
    ]
  }
  ```

#### 3. GET `/api/v1/departments`
Lists hospital departments, head of department, and active duty headcount.
- **Response `200 OK`:**
  ```json
  {
    "data": [
      {
        "id": "dept_icu_01",
        "name": "Intensive Care Unit (ICU)",
        "code": "ICU",
        "extension": "2100",
        "headOfDepartment": {
          "id": "emp_0129",
          "fullName": "Dr. Suresh Karki, MD"
        },
        "totalStaffCount": 38,
        "currentlyOnDutyCount": 12
      }
    ]
  }
  ```

---

### C. Attendance & Shift Endpoints

#### 1. GET `/api/v1/attendance/calendar`
Returns calendar status mapping for a specific employee and month.
- **Query Params:**
  - `employeeId`: string (defaults to authenticated self)
  - `year`: number (e.g. 2026)
  - `month`: number (1-12)
- **Response `200 OK`:**
  ```json
  {
    "year": 2026,
    "month": 10,
    "days": [
      {
        "date": "2026-10-12",
        "status": "PRESENT",
        "shiftName": "Morning Shift A",
        "shiftStartTime": "07:00",
        "shiftEndTime": "15:00",
        "firstPunchIn": "06:58",
        "lastPunchOut": "15:08",
        "workDurationMinutes": 490,
        "lateArrivalMinutes": 0,
        "overtimeMinutes": 10,
        "hasCorrectionPending": false
      },
      {
        "date": "2026-10-13",
        "status": "LATE",
        "shiftName": "Morning Shift A",
        "shiftStartTime": "07:00",
        "shiftEndTime": "15:00",
        "firstPunchIn": "07:22",
        "lastPunchOut": "15:00",
        "workDurationMinutes": 458,
        "lateArrivalMinutes": 22,
        "overtimeMinutes": 0,
        "hasCorrectionPending": true
      }
    ]
  }
  ```

#### 2. GET `/api/v1/attendance/daily/:date`
Retrieves full punch timeline and biometric machine raw logs for a date.
- **Response `200 OK`:**
  ```json
  {
    "date": "2026-10-12",
    "status": "PRESENT",
    "shift": {
      "name": "Morning Shift A - ICU",
      "startTime": "07:00",
      "endTime": "15:00",
      "requiredHours": 8.0
    },
    "metrics": {
      "firstIn": "06:58:14 AM",
      "lastOut": "03:08:44 PM",
      "totalWorkMinutes": 490,
      "breakMinutes": 35
    },
    "biometricLogs": [
      {
        "id": "log_881",
        "punchTime": "2026-10-12T06:58:14+05:45",
        "type": "IN",
        "terminalLocation": "ICU Staff Main Entrance"
      },
      {
        "id": "log_882",
        "punchTime": "2026-10-12T15:08:44+05:45",
        "type": "OUT",
        "terminalLocation": "Hospital Ground Turnstile"
      }
    ]
  }
  ```

#### 3. GET `/api/v1/attendance/monthly-summary`
Aggregates monthly KPIs for reporting.
- **Query Params:** `year=2026&month=10&employeeId=emp_1042`
- **Response `200 OK`:**
  ```json
  {
    "year": 2026,
    "month": 10,
    "totalCalendarDays": 31,
    "workingDays": 26,
    "presentDays": 21,
    "lateDays": 1,
    "halfDays": 0,
    "leaveDays": 2,
    "absentDays": 0,
    "weeklyOffDays": 5,
    "holidays": 1,
    "totalOvertimeMinutes": 270,
    "attendanceRate": 95.8
  }
  ```

#### 4. POST `/api/v1/attendance/corrections`
Submits an attendance correction request.
- **Request Body:**
  ```json
  {
    "date": "2026-10-13",
    "requestedInTime": "07:00",
    "requestedOutTime": "15:00",
    "reasonCategory": "BIOMETRIC_READER_OFFLINE",
    "remarks": "Terminal at ICU gate was unresponsive during morning shift handover."
  }
  ```
- **Response `201 Created`:**
  ```json
  {
    "id": "corr_9901",
    "status": "PENDING_APPROVAL",
    "createdAt": "2026-10-13T09:00:00Z"
  }
  ```

---

### D. Leave Management Endpoints

#### 1. GET `/api/v1/leaves/balances`
Retrieves remaining leave balance for authenticated user.
- **Response `200 OK`:**
  ```json
  {
    "balances": [
      {
        "leaveTypeCode": "SICK",
        "leaveTypeName": "Sick Leave",
        "entitledDays": 12,
        "consumedDays": 6,
        "remainingDays": 6
      },
      {
        "leaveTypeCode": "CASUAL",
        "leaveTypeName": "Casual Leave",
        "entitledDays": 10,
        "consumedDays": 6,
        "remainingDays": 4
      },
      {
        "leaveTypeCode": "COMPENSATORY",
        "leaveTypeName": "Compensatory Off",
        "entitledDays": 2,
        "consumedDays": 1,
        "remainingDays": 1
      }
    ]
  }
  ```

#### 2. POST `/api/v1/leaves/apply`
Applies for leave with clinical handover confirmation.
- **Headers:** `X-Idempotency-Key: <uuid>`
- **Request Body:**
  ```json
  {
    "leaveTypeCode": "SICK",
    "startDate": "2026-10-15",
    "endDate": "2026-10-16",
    "isHalfDay": false,
    "handoverStaffId": "emp_0841",
    "reason": "Acute viral gastroenteritis, physician advised bed rest.",
    "attachmentUrl": "https://cdn.hospital.org.np/docs/presc_8819.jpg"
  }
  ```
- **Response `201 Created`:**
  ```json
  {
    "id": "lve_req_4412",
    "status": "PENDING",
    "totalDays": 2.0,
    "appliedAt": "2026-10-14T08:30:00Z"
  }
  ```

#### 3. GET `/api/v1/leaves/approvals`
Lists team leave applications awaiting supervisor or HR review.
- **Response `200 OK`:**
  ```json
  {
    "data": [
      {
        "id": "lve_req_4412",
        "employee": {
          "id": "emp_1042",
          "fullName": "Priya Sharma",
          "designation": "Senior Staff Nurse",
          "avatarUrl": "https://cdn.hospital.org.np/avatars/1042.jpg"
        },
        "leaveTypeName": "Sick Leave",
        "startDate": "2026-10-15",
        "endDate": "2026-10-16",
        "totalDays": 2.0,
        "handoverStaff": {
          "id": "emp_0841",
          "fullName": "Sarita Rai",
          "isConfirmed": true
        },
        "reason": "Acute viral gastroenteritis",
        "remainingBalance": 6,
        "departmentRosterStatus": "STAFFING_OPTIMAL"
      }
    ]
  }
  ```

#### 4. PATCH `/api/v1/leaves/:id/review`
Approves or rejects a leave request.
- **Request Body:**
  ```json
  {
    "action": "APPROVE", // or "REJECT"
    "remarks": "Handover confirmed with Nurse Sarita Rai. Approved."
  }
  ```
- **Response `200 OK`:**
  ```json
  {
    "id": "lve_req_4412",
    "status": "APPROVED",
    "reviewedAt": "2026-10-14T09:15:00Z"
  }
  ```

---

### E. Notifications & Reports Endpoints

#### 1. GET `/api/v1/notifications`
Retrieves user alert feed.
- **Response `200 OK`:**
  ```json
  {
    "unreadCount": 2,
    "items": [
      {
        "id": "notif_01",
        "title": "Leave Approved",
        "body": "Your Casual Leave for Oct 06 has been approved by HOD.",
        "type": "LEAVE_STATUS",
        "isRead": false,
        "createdAt": "2026-10-12T06:00:00Z"
      },
      {
        "id": "notif_02",
        "title": "Council Renewal Reminder",
        "body": "Your Nepal Nursing Council registration expires in 45 days.",
        "type": "COUNCIL_EXPIRY",
        "isRead": false,
        "createdAt": "2026-10-11T12:00:00Z"
      }
    ]
  }
  ```

#### 2. GET `/api/v1/reports/department-summary`
Returns department-level aggregation for Dept Heads and Admins.
- **Query Params:** `departmentId=dept_icu_01&month=10&year=2026`
- **Response `200 OK`:**
  ```json
  {
    "departmentName": "Intensive Care Unit (ICU)",
    "totalStaff": 38,
    "attendanceRate": 95.8,
    "onTimeRate": 92.4,
    "totalOvertimeHours": 142.5,
    "councilComplianceRate": 97.4,
    "pendingRenewals": [
      {
        "staffName": "Nurse Anita Gurung",
        "council": "NNC",
        "expiryDate": "2026-10-31"
      }
    ]
  }
  ```

---

## 3. Standardized Error Envelope
All error responses adhere to NestJS `HttpException` JSON standards:

```json
{
  "statusCode": 400,
  "message": "Clinical duty handover staff cannot be empty for clinical shift personnel.",
  "error": "Bad Request",
  "timestamp": "2026-10-12T08:30:00.124Z",
  "path": "/api/v1/leaves/apply"
}
```
