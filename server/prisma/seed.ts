import 'dotenv/config';
import { PrismaClient, Role, CouncilType, VerificationStatus, AttendanceStatus, PunchType, ShiftType, LeaveType } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcrypt';

const connectionString = process.env.DATABASE_URL || '';
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting Healthcare HR database seeding...');

  // 1. Departments
  const icu = await prisma.department.upsert({
    where: { code: 'ICU-01' },
    update: {},
    create: {
      code: 'ICU-01',
      name: 'Intensive Care Unit (ICU)',
      wardLocation: 'Block B, 3rd Floor',
      minimumStaffingCount: 6,
    },
  });

  const er = await prisma.department.upsert({
    where: { code: 'EMR-01' },
    update: {},
    create: {
      code: 'EMR-01',
      name: 'Emergency & Trauma Center',
      wardLocation: 'Block A, Ground Floor',
      minimumStaffingCount: 8,
    },
  });

  const pharmacy = await prisma.department.upsert({
    where: { code: 'PHM-01' },
    update: {},
    create: {
      code: 'PHM-01',
      name: 'Central Clinical Pharmacy',
      wardLocation: 'Block A, 1st Floor',
      minimumStaffingCount: 3,
    },
  });

  const pediatrics = await prisma.department.upsert({
    where: { code: 'PED-01' },
    update: {},
    create: {
      code: 'PED-01',
      name: 'Pediatrics Ward',
      wardLocation: 'Block C, 2nd Floor',
      minimumStaffingCount: 4,
    },
  });

  console.log('✅ Departments seeded');

  // Common password hash for test accounts
  const defaultPasswordHash = await bcrypt.hash('Password@2026', 10);

  // 2. Staff Users & Profiles
  // A. Priya Sharma - Senior Staff Nurse (NNC)
  const priyaUser = await prisma.user.upsert({
    where: { employeeCode: 'HOSP-NUR-1042' },
    update: {},
    create: {
      employeeCode: 'HOSP-NUR-1042',
      email: 'priya.sharma@hospital.org.np',
      passwordHash: defaultPasswordHash,
      role: Role.ROLE_STAFF,
      staffProfile: {
        create: {
          fullName: 'Priya Sharma',
          phoneNumber: '+977-9841234567',
          emergencyContact: '+977-9801234567 (Spouse)',
          departmentId: icu.id,
          designation: 'Senior Staff Nurse',
          avatarUrl: 'https://images.unsplash.com/photo-1594824813511-209e99a8041c?auto=format&fit=crop&q=80&w=256',
        },
      },
    },
    include: { staffProfile: true },
  });

  if (priyaUser.staffProfile) {
    // Council License: NNC
    await prisma.councilLicense.upsert({
      where: {
        councilType_registrationNumber: {
          councilType: CouncilType.NNC,
          registrationNumber: 'NNC-RN-48291',
        },
      },
      update: {},
      create: {
        staffProfileId: priyaUser.staffProfile.id,
        councilType: CouncilType.NNC,
        registrationNumber: 'NNC-RN-48291',
        issueDate: new Date('2021-03-15'),
        expiryDate: new Date('2026-11-20'),
        verificationStatus: VerificationStatus.VERIFIED,
        verifiedAt: new Date('2024-01-10'),
      },
    });

    // Leave Balance
    await prisma.leaveBalance.upsert({
      where: {
        staffProfileId_year: {
          staffProfileId: priyaUser.staffProfile.id,
          year: 2026,
        },
      },
      update: {},
      create: {
        staffProfileId: priyaUser.staffProfile.id,
        year: 2026,
        casualTotal: 12,
        casualUsed: 3,
        sickTotal: 12,
        sickUsed: 1,
        studyTotal: 15,
        studyUsed: 0,
        maternityTotal: 98,
        maternityUsed: 0,
      },
    });
  }

  // B. Dr. Aarav Joshi - Chief Medical Officer (NMC)
  const aaravUser = await prisma.user.upsert({
    where: { employeeCode: 'HOSP-DOC-2089' },
    update: {},
    create: {
      employeeCode: 'HOSP-DOC-2089',
      email: 'aarav.joshi@hospital.org.np',
      passwordHash: defaultPasswordHash,
      role: Role.ROLE_DEPT_HEAD,
      staffProfile: {
        create: {
          fullName: 'Dr. Aarav Joshi',
          phoneNumber: '+977-9851122334',
          emergencyContact: '+977-9841998877',
          departmentId: er.id,
          designation: 'Chief Medical Officer / ER Specialist',
          avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=256',
        },
      },
    },
    include: { staffProfile: true },
  });

  if (aaravUser.staffProfile) {
    // Council License: NMC
    await prisma.councilLicense.upsert({
      where: {
        councilType_registrationNumber: {
          councilType: CouncilType.NMC,
          registrationNumber: 'NMC-MD-11029',
        },
      },
      update: {},
      create: {
        staffProfileId: aaravUser.staffProfile.id,
        councilType: CouncilType.NMC,
        registrationNumber: 'NMC-MD-11029',
        issueDate: new Date('2018-06-20'),
        expiryDate: new Date('2028-06-19'),
        verificationStatus: VerificationStatus.VERIFIED,
        verifiedAt: new Date('2023-05-12'),
      },
    });

    await prisma.leaveBalance.upsert({
      where: {
        staffProfileId_year: {
          staffProfileId: aaravUser.staffProfile.id,
          year: 2026,
        },
      },
      update: {},
      create: {
        staffProfileId: aaravUser.staffProfile.id,
        year: 2026,
        casualTotal: 14,
        casualUsed: 2,
        sickTotal: 12,
        sickUsed: 0,
        studyTotal: 20,
        studyUsed: 4,
      },
    });
  }

  // C. Sunita Thapa - Clinical Pharmacist (NPC)
  const sunitaUser = await prisma.user.upsert({
    where: { employeeCode: 'HOSP-PHM-3011' },
    update: {},
    create: {
      employeeCode: 'HOSP-PHM-3011',
      email: 'sunita.thapa@hospital.org.np',
      passwordHash: defaultPasswordHash,
      role: Role.ROLE_STAFF,
      staffProfile: {
        create: {
          fullName: 'Sunita Thapa',
          phoneNumber: '+977-9861334455',
          emergencyContact: '+977-9812445566',
          departmentId: pharmacy.id,
          designation: 'Senior Clinical Pharmacist',
          avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=256',
        },
      },
    },
    include: { staffProfile: true },
  });

  if (sunitaUser.staffProfile) {
    // Council License: NPC
    await prisma.councilLicense.upsert({
      where: {
        councilType_registrationNumber: {
          councilType: CouncilType.NPC,
          registrationNumber: 'NPC-G1-9042',
        },
      },
      update: {},
      create: {
        staffProfileId: sunitaUser.staffProfile.id,
        councilType: CouncilType.NPC,
        registrationNumber: 'NPC-G1-9042',
        issueDate: new Date('2022-09-01'),
        expiryDate: new Date('2026-10-31'), // Expiring soon (<30 days alert demonstration)
        verificationStatus: VerificationStatus.VERIFIED,
        verifiedAt: new Date('2022-09-15'),
      },
    });

    await prisma.leaveBalance.upsert({
      where: {
        staffProfileId_year: {
          staffProfileId: sunitaUser.staffProfile.id,
          year: 2026,
        },
      },
      update: {},
      create: {
        staffProfileId: sunitaUser.staffProfile.id,
        year: 2026,
        casualTotal: 12,
        casualUsed: 4,
        sickTotal: 12,
        sickUsed: 2,
        studyTotal: 10,
        studyUsed: 0,
      },
    });
  }

  // D. HR Administrator User
  await prisma.user.upsert({
    where: { employeeCode: 'HOSP-ADM-0001' },
    update: {},
    create: {
      employeeCode: 'HOSP-ADM-0001',
      email: 'admin.hr@hospital.org.np',
      passwordHash: defaultPasswordHash,
      role: Role.ROLE_HR_ADMIN,
      staffProfile: {
        create: {
          fullName: 'Ramesh Khadka',
          phoneNumber: '+977-9841000111',
          departmentId: icu.id,
          designation: 'HR Operations Manager',
        },
      },
    },
  });

  // 3. Clinical Shifts
  const morningIcu = await prisma.shift.upsert({
    where: { id: 'shift-icu-morning' },
    update: {},
    create: {
      id: 'shift-icu-morning',
      departmentId: icu.id,
      shiftType: ShiftType.MORNING,
      name: 'ICU Morning Rotational',
      startTime: '07:00',
      endTime: '15:00',
      minimumStaffingCount: 4,
    },
  });

  await prisma.shift.upsert({
    where: { id: 'shift-icu-evening' },
    update: {},
    create: {
      id: 'shift-icu-evening',
      departmentId: icu.id,
      shiftType: ShiftType.EVENING,
      name: 'ICU Evening Shift',
      startTime: '15:00',
      endTime: '22:00',
      minimumStaffingCount: 3,
    },
  });

  await prisma.shift.upsert({
    where: { id: 'shift-icu-night' },
    update: {},
    create: {
      id: 'shift-icu-night',
      departmentId: icu.id,
      shiftType: ShiftType.NIGHT,
      name: 'ICU Night Emergency Vigil',
      startTime: '22:00',
      endTime: '07:00',
      minimumStaffingCount: 3,
    },
  });

  // Assign Priya to today's ICU morning shift
  if (priyaUser.staffProfile) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await prisma.shiftAssignment.upsert({
      where: {
        shiftId_staffProfileId_date: {
          shiftId: morningIcu.id,
          staffProfileId: priyaUser.staffProfile.id,
          date: today,
        },
      },
      update: {},
      create: {
        shiftId: morningIcu.id,
        staffProfileId: priyaUser.staffProfile.id,
        date: today,
        notes: 'Primary triage nurse on duty',
      },
    });

    // Sample attendance punches
    const punchIn = new Date(today);
    punchIn.setHours(6, 55, 0, 0);

    await prisma.attendanceRecord.upsert({
      where: {
        staffProfileId_date: {
          staffProfileId: priyaUser.staffProfile.id,
          date: today,
        },
      },
      update: {},
      create: {
        staffProfileId: priyaUser.staffProfile.id,
        date: today,
        punchInTime: punchIn,
        punchInType: PunchType.MOBILE_GPS,
        punchInLatitude: 27.7172,
        punchInLongitude: 85.324,
        geofenceValid: true,
        biometricVerified: true,
        status: AttendanceStatus.PRESENT,
      },
    });
  }

  console.log('✅ Staff users, council licenses, shifts, and punch data seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
