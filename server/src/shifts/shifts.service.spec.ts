import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { PrismaService } from '../prisma/prisma.service.js';
import { ShiftsService } from './shifts.service.js';

describe('ShiftsService', () => {
  let service: ShiftsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShiftsService,
        {
          provide: PrismaService,
          useValue: {
            shiftAssignment: { findMany: async () => [] },
            user: { findUnique: async () => null },
            shiftSwapRequest: { create: async () => ({}) },
          },
        },
      ],
    }).compile();

    service = module.get<ShiftsService>(ShiftsService);
  });

  it('should enforce hard rest cooldown and reject consecutive night into morning shift', () => {
    const today = new Date('2026-10-15');
    const tomorrow = new Date('2026-10-16');

    expect(() =>
      service.enforceRestCooldown(
        'shift-icu-night',
        today,
        'shift-icu-morning',
        tomorrow,
      ),
    ).toThrowError(/Fatigue Guardrail Violation/);
  });

  it('should allow shift swap when rest cooldown is satisfied (morning into evening)', () => {
    const today = new Date('2026-10-15');
    const tomorrow = new Date('2026-10-16');

    expect(() =>
      service.enforceRestCooldown(
        'shift-icu-morning',
        today,
        'shift-icu-evening',
        tomorrow,
      ),
    ).not.toThrow();
  });

  it('should return mock roster when database is deferred', async () => {
    const roster = await service.getRoster();
    expect(roster).toBeDefined();
    expect(roster.length).toBeGreaterThan(0);
  });
});
