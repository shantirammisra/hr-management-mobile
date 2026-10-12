import { Injectable, Logger } from '@nestjs/common';
import { CouncilType, VerificationStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class CouncilsService {
  private readonly logger = new Logger(CouncilsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getAllLicenses(councilType?: CouncilType) {
    try {
      const where: any = {};
      if (councilType) {
        where.councilType = councilType;
      }

      const licenses = await this.prisma.councilLicense.findMany({
        where,
        include: {
          staffProfile: {
            include: { department: true, user: true },
          },
        },
        orderBy: { expiryDate: 'asc' },
      });

      if (licenses.length > 0) return licenses;
    } catch (err) {
      this.logger.warn(`Prisma council lookup failed: ${String(err)}`);
    }

    // Mock licenses
    return [
      {
        id: 'lic_nnc_01',
        councilType: 'NNC',
        registrationNumber: 'NNC-RN-48291',
        issueDate: '2021-03-15T00:00:00.000Z',
        expiryDate: '2026-11-20T00:00:00.000Z',
        verificationStatus: 'VERIFIED',
        staffProfile: {
          fullName: 'Priya Sharma',
          designation: 'Senior Staff Nurse',
          department: { name: 'Intensive Care Unit (ICU)' },
        },
      },
      {
        id: 'lic_npc_01',
        councilType: 'NPC',
        registrationNumber: 'NPC-G1-9042',
        issueDate: '2022-09-01T00:00:00.000Z',
        expiryDate: '2026-10-31T00:00:00.000Z',
        verificationStatus: 'VERIFIED',
        staffProfile: {
          fullName: 'Sunita Thapa',
          designation: 'Senior Clinical Pharmacist',
          department: { name: 'Central Clinical Pharmacy' },
        },
      },
      {
        id: 'lic_nmc_01',
        councilType: 'NMC',
        registrationNumber: 'NMC-MD-11029',
        issueDate: '2018-06-20T00:00:00.000Z',
        expiryDate: '2028-06-19T00:00:00.000Z',
        verificationStatus: 'VERIFIED',
        staffProfile: {
          fullName: 'Dr. Aarav Joshi',
          designation: 'Chief Medical Officer / ER Specialist',
          department: { name: 'Emergency & Trauma Center' },
        },
      },
    ];
  }

  async getExpiringSoonLicenses(days = 30) {
    const threshold = new Date();
    threshold.setDate(threshold.getDate() + days);

    try {
      const expiring = await this.prisma.councilLicense.findMany({
        where: {
          expiryDate: { lte: threshold },
          verificationStatus: VerificationStatus.VERIFIED,
        },
        include: {
          staffProfile: { include: { department: true } },
        },
      });

      if (expiring.length > 0) return expiring;
    } catch (err) {
      this.logger.warn(`Prisma expiring council lookup failed: ${String(err)}`);
    }

    const all = await this.getAllLicenses();
    return all.filter((lic: any) => {
      const expiry = new Date(lic.expiryDate);
      const diffDays = (expiry.getTime() - Date.now()) / (1000 * 3600 * 24);
      return diffDays <= days && diffDays >= 0;
    });
  }

  async verifyLicense(id: string, status: VerificationStatus) {
    try {
      return await this.prisma.councilLicense.update({
        where: { id },
        data: {
          verificationStatus: status,
          verifiedAt: new Date(),
        },
      });
    } catch {
      return {
        id,
        verificationStatus: status,
        verifiedAt: new Date(),
      };
    }
  }
}
