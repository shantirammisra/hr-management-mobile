# Monorepo Testing Strategy & Guide

> **Healthcare HR Management Platform**  
> **Testing Frameworks:** Vitest | Jest & React Native Testing Library (RNTL) | Maestro E2E | Supertest  
> **Scope:** Full-stack verification across `Mobile/` and `server/`

---

## 1. Testing Philosophy & The Test Pyramid

Our testing strategy adheres to the classic Test Pyramid, guaranteeing rapid feedback, minimal test flakiness, and exhaustive regression protection:

```
          / \
         /   \        E2E Testing (Maestro Mobile Flows)
        / E2E \       - Critical clinical paths: Punch-in, Leave, Roster
       /-------\
      /         \     Integration Testing (Supertest + API Contracts)
     /   INTEG   \    - NestJS REST Controllers, Prisma DB, RBAC Guards
    /-------------\
   /               \  Unit & Component Testing (Vitest & RNTL)
  /      UNIT       \ - Domain algorithms, React Native components, hooks
 /-------------------\
```

---

## 2. Test Execution Quick Reference

### 2.1 Backend Testing (`server/`)

Execute all backend commands inside the `server/` workspace directory:

```bash
cd server

# 1. Run unit test suites via Vitest
bun run test

# 2. Run tests in watch mode during development
bun run test:watch

# 3. Run with test coverage report
bun run test:cov

# 4. Run E2E API integration suites
bun run test:e2e

# 5. Run static lint checks
bun run lint
```

### 2.2 Mobile Testing (`Mobile/`)

Execute all mobile commands inside the `Mobile/` workspace directory:

```bash
cd Mobile

# 1. Run component and unit test suites
bun run test

# 2. Run TypeScript strict type-checking
bunx tsc --noEmit

# 3. Run ESLint checks
bunx expo lint

# 4. Run Expo Doctor dependency diagnostics
bunx expo-doctor
```

---

## 3. Mobile Testing Architecture (`Mobile/`)

### 3.1 Component & Molecule Testing (RNTL)
We utilize **React Native Testing Library (`@testing-library/react-native`)** with strict behavioral assertions:
- Test user interactions via touch events (`fireEvent.press`).
- Verify minimum touch target compliance (48x48 dp) and accessibility labels (`accessibilityRole`, `accessibilityLabel`).
- Assert status badge rendering matching the Pink Healthcare color tokens (`#BE185D`, `#16A34A`, `#DC2626`).

#### Example: Attendance Punch Button Test
```typescript
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { PunchButton } from '@/components/attendance/PunchButton';

describe('<PunchButton />', () => {
  it('triggers onPunch callback and applies tactile feedback when enabled', () => {
    const handlePunch = jest.fn();
    const { getByRole, getByText } = render(
      <PunchButton onPunch={handlePunch} isPunchedIn={false} isLoading={false} />
    );

    const button = getByRole('button');
    expect(getByText('Punch In')).toBeTruthy();

    fireEvent.press(button);
    expect(handlePunch).toHaveBeenCalledTimes(1);
  });
});
```

### 3.2 Mobile E2E Testing with Maestro
Mobile flows are validated on physical devices and emulators using **Maestro** declarative flows:

#### Example: `.maestro/punch_flow.yaml`
```yaml
appId: com.healthcarehr.mobile
---
- launchApp
- assertVisible: "Today's Shift"
- tapOn: "Punch In"
- assertVisible: "Location Verified"
- assertVisible: "Punch Confirmed"
- assertVisible:
    text: "Present"
```

---

## 4. Backend Testing Architecture (`server/`)

### 4.1 Unit Testing (Vitest)
Unit tests isolate business logic services with mocked Prisma repositories:
- **AttendanceService**: Grace periods, late calculations, hours worked, night-shift overnight splits.
- **CouncilService**: Expiry calculation for Nepal Nursing Council (NNC), Pharmacy Council (NPC), and Medical Council (NMC).
- **GamificationService**: Vitality Point allocations, daily caps (150 VP), and streak maintenance logic.

### 4.2 Integration Testing (Supertest)
Integration suites test full HTTP request-response cycles including:
- Guard execution (`JwtAuthGuard`, `RolesGuard`).
- Payload validation via `ValidationPipe` and `class-validator`.
- Correct HTTP status codes and RFC 7807 problem details error bodies.

---

## 5. Test Data Management & Fixtures

### 5.1 Geolocation Mocking
To verify geofenced attendance punching, tests utilize coordinate factories:
- `HOSPITAL_COORDINATES`: `{ latitude: 27.7172, longitude: 85.3240, radiusMeters: 150 }`
- `WITHIN_GEOFENCE`: `{ latitude: 27.7174, longitude: 85.3241 }` (Expected: Success)
- `OUTSIDE_GEOFENCE`: `{ latitude: 27.7250, longitude: 85.3400 }` (Expected: 403 Forbidden with `OUT_OF_BOUNDS_ERROR`)

### 5.2 Regulatory Council License Mocking
Fixtures cover active, expiring-soon (< 30 days), and expired council registration states across all three supported bodies (NNC, NPC, NMC).

---

## 6. Continuous Integration & Quality Gates

Every pull request must pass the following automated verification gates before merge:

| Gate | Tool | Threshold / Criterion |
| :--- | :--- | :--- |
| **Mobile Typecheck** | `tsc --noEmit` | `0 errors` |
| **Mobile Lint** | `expo lint` | `0 warnings/errors` |
| **Backend Lint** | `oxlint` | `0 warnings/errors` |
| **Unit Test Suites** | `vitest run` | `100% pass rate` |
| **Business Logic Coverage** | Vitest coverage | `> 85% coverage on attendance & council services` |
