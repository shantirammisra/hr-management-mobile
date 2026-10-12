import { ClinicalStatusKey } from '@/theme/tokens';
import { UserProfile } from '@/types/auth.types';

export interface AttendanceRecord {
  id: string;
  date: string; // YYYY-MM-DD
  dayName: string;
  status: ClinicalStatusKey;
  clockIn?: string;
  clockOut?: string;
  shiftTitle: string;
  hoursWorked?: number;
  isOvertime?: boolean;
  overtimeHours?: number;
  location: string;
  biometricVerified: boolean;
  notes?: string;
}

export interface LeaveBalance {
  type: string;
  total: number;
  used: number;
  remaining: number;
  color: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeRole: string;
  department: string;
  leaveType: 'Casual' | 'Sick' | 'Study' | 'Maternity' | 'Bereavement';
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  handoverStaffName: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  appliedAt: string;
}

export interface StaffMember extends UserProfile {
  wardAssignment: string;
  currentShift: string;
  isOnDuty: boolean;
  punctualityStreakDays: number;
}

export interface StaffingAlert {
  id: string;
  severity: 'URGENT' | 'HIGH' | 'INFO';
  title: string;
  ward: string;
  requiredRole: string;
  shift: string;
  timestamp: string;
}

export const MOCK_STAFF_MEMBERS: StaffMember[] = [
  {
    id: 'emp-001',
    email: 'priya.thapa@carepulse.hospital',
    fullName: 'Priya Thapa, RN',
    role: 'STAFF',
    employeeCode: 'EMP-NUR-104',
    departmentId: 'dept-icu',
    departmentName: 'Emergency & Critical Care',
    designation: 'Senior Staff Nurse',
    councilType: 'NNC',
    councilNumber: 'NNC-8923-RN',
    councilExpiryDate: '2027-04-15',
    phone: '+977 9841234567',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813576-9635e612f05a?w=150',
    wardAssignment: 'ICU Ward 3 (Bed 1-8)',
    currentShift: 'Morning (07:00 - 15:00)',
    isOnDuty: true,
    punctualityStreakDays: 14,
  },
  {
    id: 'emp-002',
    email: 'aarav.sharma@carepulse.hospital',
    fullName: 'Dr. Aarav Sharma, MD',
    role: 'DEPT_HEAD',
    employeeCode: 'EMP-DOC-021',
    departmentId: 'dept-cardio',
    departmentName: 'Department of Cardiology',
    designation: 'Head of Department / Senior Consultant',
    councilType: 'NMC',
    councilNumber: 'NMC-12458-MD',
    councilExpiryDate: '2026-11-30',
    phone: '+977 9851098765',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150',
    wardAssignment: 'Cath Lab & Cardiac Ward',
    currentShift: 'General (09:00 - 17:00)',
    isOnDuty: true,
    punctualityStreakDays: 28,
  },
  {
    id: 'emp-005',
    email: 'rohit.gurung@carepulse.hospital',
    fullName: 'Rohit Gurung, BPharm',
    role: 'STAFF',
    employeeCode: 'EMP-PHM-018',
    departmentId: 'dept-pharm',
    departmentName: 'Inpatient Pharmacy',
    designation: 'Clinical Pharmacist',
    councilType: 'NPC',
    councilNumber: 'NPC-3410-PH',
    councilExpiryDate: '2026-10-25', // Expiring in < 30 days!
    phone: '+977 9803456789',
    wardAssignment: 'Central Dispensary',
    currentShift: 'Evening (15:00 - 23:00)',
    isOnDuty: false,
    punctualityStreakDays: 9,
  },
  {
    id: 'emp-006',
    email: 'anita.rai@carepulse.hospital',
    fullName: 'Dr. Anita Rai, MS',
    role: 'STAFF',
    employeeCode: 'EMP-DOC-044',
    departmentId: 'dept-surg',
    departmentName: 'General Surgery & Trauma',
    designation: 'Attending Surgeon',
    councilType: 'NMC',
    councilNumber: 'NMC-15980-MS',
    councilExpiryDate: '2028-08-12',
    phone: '+977 9861112233',
    wardAssignment: 'Surgical Ward B',
    currentShift: 'Night (23:00 - 07:00)',
    isOnDuty: false,
    punctualityStreakDays: 5,
  },
  {
    id: 'emp-007',
    email: 'deepak.malla@carepulse.hospital',
    fullName: 'Deepak Malla, RN',
    role: 'STAFF',
    employeeCode: 'EMP-NUR-182',
    departmentId: 'dept-icu',
    departmentName: 'Emergency & Critical Care',
    designation: 'Staff Nurse',
    councilType: 'NNC',
    councilNumber: 'NNC-11204-RN',
    councilExpiryDate: '2026-10-18', // Expiring in < 7 days!
    phone: '+977 9812998877',
    wardAssignment: 'Triage & Resuscitation',
    currentShift: 'Morning (07:00 - 15:00)',
    isOnDuty: true,
    punctualityStreakDays: 18,
  },
];

export const MOCK_ATTENDANCE_LOGS: AttendanceRecord[] = [
  {
    id: 'att-101',
    date: '2026-10-12',
    dayName: 'Monday',
    status: 'present',
    clockIn: '06:54 AM',
    clockOut: undefined, // Currently active on shift
    shiftTitle: 'Morning Shift (07:00 - 15:00)',
    hoursWorked: 3.5,
    location: 'Kathmandu Central Hospital - ICU Ward 3 GPS',
    biometricVerified: true,
    notes: 'Punctual check-in via Ward Scanner',
  },
  {
    id: 'att-102',
    date: '2026-10-11',
    dayName: 'Sunday',
    status: 'present',
    clockIn: '06:58 AM',
    clockOut: '03:15 PM',
    shiftTitle: 'Morning Shift (07:00 - 15:00)',
    hoursWorked: 8.25,
    isOvertime: true,
    overtimeHours: 0.25,
    location: 'Kathmandu Central Hospital - ICU Ward 3 GPS',
    biometricVerified: true,
    notes: 'Shift handover to Evening Team completed',
  },
  {
    id: 'att-103',
    date: '2026-10-10',
    dayName: 'Saturday',
    status: 'weeklyOff',
    shiftTitle: 'Rostered Weekly Off',
    location: 'Off-site',
    biometricVerified: false,
  },
  {
    id: 'att-104',
    date: '2026-10-09',
    dayName: 'Friday',
    status: 'late',
    clockIn: '07:22 AM',
    clockOut: '03:30 PM',
    shiftTitle: 'Morning Shift (07:00 - 15:00)',
    hoursWorked: 8.1,
    location: 'Kathmandu Central Hospital - Biometric Terminal',
    biometricVerified: true,
    notes: '22 min late arrival due to monsoon transit block',
  },
  {
    id: 'att-105',
    date: '2026-10-08',
    dayName: 'Thursday',
    status: 'present',
    clockIn: '06:50 AM',
    clockOut: '03:00 PM',
    shiftTitle: 'Morning Shift (07:00 - 15:00)',
    hoursWorked: 8.0,
    location: 'Kathmandu Central Hospital - ICU Ward 3 GPS',
    biometricVerified: true,
  },
  {
    id: 'att-106',
    date: '2026-10-07',
    dayName: 'Wednesday',
    status: 'leave',
    shiftTitle: 'Approved Casual Leave',
    location: 'Off-site',
    biometricVerified: false,
    notes: 'Covered by Staff Nurse Deepak Malla',
  },
  {
    id: 'att-107',
    date: '2026-10-06',
    dayName: 'Tuesday',
    status: 'present',
    clockIn: '06:55 AM',
    clockOut: '03:10 PM',
    shiftTitle: 'Morning Shift (07:00 - 15:00)',
    hoursWorked: 8.25,
    location: 'Kathmandu Central Hospital - Biometric Terminal',
    biometricVerified: true,
  },
];

export const MOCK_LEAVE_BALANCES: LeaveBalance[] = [
  { type: 'Casual Leave', total: 12, used: 4, remaining: 8, color: '#BE185D' },
  { type: 'Medical / Sick', total: 15, used: 2, remaining: 13, color: '#16A34A' },
  { type: 'Study / CME', total: 6, used: 1, remaining: 5, color: '#7C3AED' },
  { type: 'Compensatory Off', total: 4, used: 2, remaining: 2, color: '#D97706' },
];

export const MOCK_LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: 'lvr-501',
    employeeId: 'emp-001',
    employeeName: 'Priya Thapa, RN',
    employeeRole: 'Staff Nurse',
    department: 'Emergency & Critical Care',
    leaveType: 'Study',
    startDate: '2026-10-24',
    endDate: '2026-10-25',
    totalDays: 2,
    reason: 'Advanced Cardiac Life Support (ACLS) Mandatory Recertification Workshop',
    handoverStaffName: 'Deepak Malla, RN',
    status: 'PENDING',
    appliedAt: '2026-10-10',
  },
  {
    id: 'lvr-502',
    employeeId: 'emp-005',
    employeeName: 'Rohit Gurung, BPharm',
    employeeRole: 'Clinical Pharmacist',
    department: 'Inpatient Pharmacy',
    leaveType: 'Casual',
    startDate: '2026-10-16',
    endDate: '2026-10-17',
    totalDays: 2,
    reason: 'Family event in Pokhara',
    handoverStaffName: 'Suman Shrestha, DPharm',
    status: 'APPROVED',
    appliedAt: '2026-10-08',
  },
];

export const MOCK_STAFFING_ALERTS: StaffingAlert[] = [
  {
    id: 'alt-01',
    severity: 'URGENT',
    title: 'Ward 3 Critical ICU Shortage',
    ward: 'ICU Ward 3',
    requiredRole: 'Ventilator Certified Nurse',
    shift: 'Night Shift (23:00 - 07:00)',
    timestamp: '15m ago',
  },
  {
    id: 'alt-02',
    severity: 'HIGH',
    title: 'NMC License Expiry Pending',
    ward: 'Central Dispensary',
    requiredRole: 'NPC Clinical Pharmacist',
    shift: 'Licensing Renewal due in 13 days',
    timestamp: '1h ago',
  },
];
