import { create } from 'zustand';
import * as LocalAuthentication from 'expo-local-authentication';
import { AuthState, UserProfile, UserRole } from '@/types/auth.types';
import { secureStorage } from '@/services/storage/secureStorage';

export const MOCK_USERS: Record<UserRole, UserProfile> = {
  STAFF: {
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
  },
  DEPT_HEAD: {
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
  },
  HR_ADMIN: {
    id: 'emp-003',
    email: 'bimal.adhikari@carepulse.hospital',
    fullName: 'Bimal Adhikari',
    role: 'HR_ADMIN',
    employeeCode: 'EMP-ADM-005',
    departmentId: 'dept-admin',
    departmentName: 'Hospital Human Resources',
    designation: 'Chief HR Operations Officer',
    councilType: 'NONE',
    phone: '+977 9801122334',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  },
  SUPER_ADMIN: {
    id: 'emp-004',
    email: 'director@carepulse.hospital',
    fullName: 'Dr. Sunita Karki',
    role: 'SUPER_ADMIN',
    employeeCode: 'EMP-EXEC-001',
    departmentId: 'dept-exec',
    departmentName: 'Executive Board',
    designation: 'Medical Director',
    councilType: 'NMC',
    councilNumber: 'NMC-04312-MS',
    councilExpiryDate: '2028-01-01',
    phone: '+977 9851000001',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150',
  },
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: MOCK_USERS.STAFF, // Default initialized with staff for immediate preview
  accessToken: 'mock-access-token-jwt',
  refreshToken: 'mock-refresh-token-jwt',
  isAuthenticated: true,
  isLoading: false,
  isBiometricEnrolled: true,
  isDevBypassActive: true,

  async login(email: string) {
    set({ isLoading: true });
    try {
      // Find matching mock user or fallback to staff
      const user =
        Object.values(MOCK_USERS).find(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        ) || MOCK_USERS.STAFF;

      const accessToken = `mock-token-${user.id}-${Date.now()}`;
      const refreshToken = `mock-refresh-${user.id}-${Date.now()}`;

      await secureStorage.setItem('access_token', accessToken);
      await secureStorage.setItem('refresh_token', refreshToken);
      await secureStorage.setItem('active_role', user.role);

      set({
        user,
        accessToken,
        refreshToken,
        isAuthenticated: true,
        isLoading: false,
      });
      return true;
    } catch {
      set({ isLoading: false });
      return false;
    }
  },

  async loginWithBiometrics() {
    set({ isLoading: true });
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (hasHardware && isEnrolled) {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Authenticate with FaceID / Biometrics',
          cancelLabel: 'Use PIN',
          fallbackLabel: 'Enter Password',
        });

        if (!result.success) {
          set({ isLoading: false });
          return false;
        }
      }

      // If dev bypass is active or biometric succeeded
      const currentRole = get().user?.role || 'STAFF';
      const user = MOCK_USERS[currentRole];
      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      return true;
    } catch {
      // Dev bypass fallback
      if (get().isDevBypassActive) {
        const currentRole = get().user?.role || 'STAFF';
        set({
          user: MOCK_USERS[currentRole],
          isAuthenticated: true,
          isLoading: false,
        });
        return true;
      }
      set({ isLoading: false });
      return false;
    }
  },

  async logout() {
    await secureStorage.removeItem('access_token');
    await secureStorage.removeItem('refresh_token');
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  },

  switchDevRole(role: UserRole) {
    const newUser = MOCK_USERS[role];
    set({ user: newUser });
  },

  async setBiometricEnrolled(enabled: boolean) {
    await secureStorage.setItem('biometric_enrolled', enabled ? 'true' : 'false');
    set({ isBiometricEnrolled: enabled });
  },

  async checkSession() {
    set({ isLoading: true });
    try {
      const token = await secureStorage.getItem('access_token');
      const savedRole = (await secureStorage.getItem('active_role')) as UserRole | null;
      if (token) {
        const role: UserRole = savedRole && savedRole in MOCK_USERS ? savedRole : 'STAFF';
        set({
          user: MOCK_USERS[role],
          accessToken: token,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {

        set({ isLoading: false });
      }
    } catch {
      set({ isLoading: false });
    }
  },
}));
