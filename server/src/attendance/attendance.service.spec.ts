import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { PrismaService } from '../prisma/prisma.service.js';
import { AttendanceService } from './attendance.service.js';
import { PunchAction } from './dto/attendance.dto.js';

describe('AttendanceService', () => {
  let service: AttendanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AttendanceService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: async () => null,
            },
            attendanceRecord: {
              findUnique: async () => null,
              upsert: async () => ({}),
              findMany: async () => [],
            },
          },
        },
      ],
    }).compile();

    service = module.get<AttendanceService>(AttendanceService);
  });

  it('should validate geofence within hospital radius', async () => {
    // Within ~100m of centroid (27.7172, 85.324)
    const result = await service.recordPunch('usr_nurse_1042', {
      action: PunchAction.PUNCH_IN,
      latitude: 27.7173,
      longitude: 85.3241,
      biometricVerified: true,
    });

    expect(result.success).toBe(true);
    expect(result.isWithinGeofence).toBe(true);
  });

  it('should flag punch outside perimeter as outside geofence', async () => {
    // Miles away in another district
    const result = await service.recordPunch('usr_nurse_1042', {
      action: PunchAction.PUNCH_IN,
      latitude: 28.2096, // Pokhara coordinates
      longitude: 83.9856,
      biometricVerified: false,
    });

    expect(result.success).toBe(true);
    expect(result.isWithinGeofence).toBe(false);
  });

  it('should return monthly calendar with status counts', async () => {
    const calendar = await service.getMonthlyCalendar('usr_nurse_1042', '2026-10');
    expect(calendar.month).toBe('2026-10');
    expect(calendar.presentCount).toBeGreaterThan(0);
    expect(calendar.days).toBeDefined();
  });
});
