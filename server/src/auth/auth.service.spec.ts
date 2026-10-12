import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { PrismaService } from '../prisma/prisma.service.js';
import { AuthService } from './auth.service.js';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findFirst: async () => null,
              findUnique: async () => null,
              update: async () => ({}),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: async () => 'mock_jwt_token_xyz',
            verifyAsync: async () => ({ sub: 'usr_nurse_1042', role: 'ROLE_STAFF' }),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: (key: string) => {
              if (key === 'JWT_SECRET') return 'test_secret_32_characters_long_key_123';
              if (key === 'JWT_REFRESH_SECRET') return 'test_refresh_secret_32_chars_123';
              return null;
            },
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should authenticate nurse mock credentials and return tokens with profile', async () => {
    const res = await service.login({
      identifier: 'HOSP-NUR-1042',
      password: 'Password@2026',
    });

    expect(res).toBeDefined();
    expect(res.accessToken).toBe('mock_jwt_token_xyz');
    expect(res.user.fullName).toBe('Priya Sharma');
    expect(res.user.role).toBe('ROLE_STAFF');
  });

  it('should reject invalid credentials', async () => {
    await expect(
      service.login({
        identifier: 'HOSP-NUR-1042',
        password: 'WrongPassword',
      }),
    ).rejects.toThrow();
  });

  it('should generate forgot password OTP session', async () => {
    const res = await service.forgotPassword('HOSP-NUR-1042');
    expect(res.success).toBe(true);
    expect(res.otpSessionId).toMatch(/^otp_sess_/);
  });
});
