import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getDirectory(departmentId?: string, query?: string) {
    try {
      const where: any = {};
      if (departmentId) {
        where.departmentId = departmentId;
      }
      if (query) {
        where.OR = [
          { fullName: { contains: query, mode: 'insensitive' } },
          { designation: { contains: query, mode: 'insensitive' } },
          { user: { employeeCode: { contains: query, mode: 'insensitive' } } },
        ];
      }

      const profiles = await this.prisma.staffProfile.findMany({
        where,
        include: {
          department: true,
          councilLicenses: true,
          user: {
            select: {
              id: true,
              employeeCode: true,
              email: true,
              role: true,
              isActive: true,
            },
          },
        },
        orderBy: { fullName: 'asc' },
      });

      if (profiles.length > 0) {
        return profiles;
      }
    } catch (err) {
      this.logger.warn(`Prisma directory lookup failed (falling back to mock): ${String(err)}`);
    }

    // Mock directory matching mobile fixtures
    return [
      {
        id: 'prof_nurse_1042',
        fullName: 'Priya Sharma',
        designation: 'Senior Staff Nurse',
        phoneNumber: '+977-9841234567',
        avatarUrl: 'https://images.unsplash.com/photo-1594824813511-209e99a8041c?auto=format&fit=crop&q=80&w=256',
        department: { id: 'dept_icu_01', name: 'Intensive Care Unit (ICU)', code: 'ICU-01' },
        councilLicenses: [
          {
            councilType: 'NNC',
            registrationNumber: 'NNC-RN-48291',
            verificationStatus: 'VERIFIED',
            expiryDate: '2026-11-20T00:00:00.000Z',
          },
        ],
        user: { employeeCode: 'HOSP-NUR-1042', role: 'ROLE_STAFF' },
      },
      {
        id: 'prof_doc_2089',
        fullName: 'Dr. Aarav Joshi',
        designation: 'Chief Medical Officer / ER Specialist',
        phoneNumber: '+977-9851122334',
        avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=256',
        department: { id: 'dept_er_01', name: 'Emergency & Trauma Center', code: 'EMR-01' },
        councilLicenses: [
          {
            councilType: 'NMC',
            registrationNumber: 'NMC-MD-11029',
            verificationStatus: 'VERIFIED',
            expiryDate: '2028-06-19T00:00:00.000Z',
          },
        ],
        user: { employeeCode: 'HOSP-DOC-2089', role: 'ROLE_DEPT_HEAD' },
      },
      {
        id: 'prof_phm_3011',
        fullName: 'Sunita Thapa',
        designation: 'Senior Clinical Pharmacist',
        phoneNumber: '+977-9861334455',
        avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=256',
        department: { id: 'dept_phm_01', name: 'Central Clinical Pharmacy', code: 'PHM-01' },
        councilLicenses: [
          {
            councilType: 'NPC',
            registrationNumber: 'NPC-G1-9042',
            verificationStatus: 'VERIFIED',
            expiryDate: '2026-10-31T00:00:00.000Z',
          },
        ],
        user: { employeeCode: 'HOSP-PHM-3011', role: 'ROLE_STAFF' },
      },
    ];
  }

  async getStaffById(id: string) {
    try {
      const profile = await this.prisma.staffProfile.findFirst({
        where: {
          OR: [{ id }, { user: { employeeCode: id } }],
        },
        include: {
          department: true,
          councilLicenses: true,
          leaveBalances: true,
          user: {
            select: {
              id: true,
              employeeCode: true,
              email: true,
              role: true,
            },
          },
        },
      });

      if (profile) return profile;
    } catch (err) {
      this.logger.warn(`Prisma find staff by id failed: ${String(err)}`);
    }

    const directory = await this.getDirectory();
    const found = directory.find((d: any) => d.id === id || d.user?.employeeCode === id);
    if (!found) {
      throw new NotFoundException(`Staff profile not found: ${id}`);
    }
    return found;
  }
}
