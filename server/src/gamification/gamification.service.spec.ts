import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { PrismaService } from '../prisma/prisma.service.js';
import { GamificationService } from './gamification.service.js';

describe('GamificationService', () => {
  let service: GamificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GamificationService,
        {
          provide: PrismaService,
          useValue: {
            user: { findUnique: async () => null },
            gamificationProfile: { upsert: async () => ({ id: '1' }), update: async () => ({}) },
            vitalityPointLog: { create: async () => ({}) },
          },
        },
      ],
    }).compile();

    service = module.get<GamificationService>(GamificationService);
  });

  it('should enforce strict daily anti-burnout ceiling (150 VP/day)', () => {
    // When 100 VP already earned today, requesting 80 VP should be capped at 50 VP
    const capped = service.calculateCappedPoints(100, 80);
    expect(capped).toBe(50);

    // When 150 VP already earned, further awards must yield 0 VP
    const zeroLeft = service.calculateCappedPoints(150, 50);
    expect(zeroLeft).toBe(0);
  });

  it('should apply 1.5x multiplier for night vigil shifts', async () => {
    const result = await service.awardPoints('usr_nurse_1042', {
      points: 50,
      reason: 'Night Vigil ICU Duty',
      isNightShift: true,
    });

    expect(result.multiplier).toBe(1.5);
    expect(result.awarded).toBe(75); // 50 * 1.5 = 75
  });

  it('should correctly calculate healthcare level ladder', () => {
    expect(service.calculateLevel(250).title).toBe('Caregiver Apprentice');
    expect(service.calculateLevel(800).title).toBe('Certified Caregiver');
    expect(service.calculateLevel(2100).title).toBe('Ward Luminary');
    expect(service.calculateLevel(4500).title).toBe('Clinical Guardian');
    expect(service.calculateLevel(8500).title).toBe('Healthcare Sentinel');
  });
});
