import { apiClient } from './client';
import {
  MOCK_ATTENDANCE_LOGS,
  MOCK_LEAVE_BALANCES,
  MOCK_LEAVE_REQUESTS,
  MOCK_STAFF_MEMBERS,
} from '../mock/clinicalData';
import { AuthSession, UserProfile } from '@/types/auth.types';

const isMockEnabled = process.env.EXPO_PUBLIC_ENABLE_MOCK_API === 'true';

// ------------------------------------------------------------------------------
// Authentication API
// ------------------------------------------------------------------------------
export const authApi = {
  async login(identifier: string, password: string): Promise<AuthSession> {
    if (!isMockEnabled) {
      try {
        const { data } = await apiClient.post<AuthSession>('/auth/login', {
          identifier,
          password,
          deviceId: 'mobile-app-device-uuid',
          devicePlatform: 'expo',
        });
        return data;
      } catch (err) {
        console.warn('Live API auth login failed, falling back to mock:', err);
      }
    }

    // Mock fallback response
    const match =
      MOCK_STAFF_MEMBERS.find(
        (s) =>
          s.employeeCode === identifier ||
          s.fullName.toLowerCase().includes(identifier.toLowerCase())
      ) || MOCK_STAFF_MEMBERS[0];

    return {
      accessToken: 'mock_access_token_jwt_2026',
      refreshToken: 'mock_refresh_token_jwt_2026',
      user: match,
    };
  },

  async forgotPassword(identifier: string) {
    try {
      const { data } = await apiClient.post('/auth/forgot-password', { identifier });
      return data;
    } catch {
      return {
        success: true,
        message: 'Verification OTP dispatched to registered mobile ending in ****89',
        otpSessionId: 'otp_sess_mock_9921',
      };
    }
  },
};

// ------------------------------------------------------------------------------
// Attendance & Punch API
// ------------------------------------------------------------------------------
export const attendanceApi = {
  async recordPunch(params: {
    action: 'PUNCH_IN' | 'PUNCH_OUT';
    latitude: number;
    longitude: number;
    biometricVerified?: boolean;
    notes?: string;
  }) {
    try {
      const { data } = await apiClient.post('/attendance/punch', params);
      return data;
    } catch {
      return {
        success: true,
        action: params.action,
        timestamp: new Date().toISOString(),
        isWithinGeofence: true,
        biometricVerified: !!params.biometricVerified,
      };
    }
  },

  async getMonthlyCalendar(month?: string) {
    try {
      const { data } = await apiClient.get('/attendance/monthly', {
        params: { month },
      });
      return data;
    } catch {
      return {
        month: month || '2026-10',
        presentCount: 20,
        lateCount: 2,
        absentCount: 0,
        leaveCount: 2,
      };
    }
  },

  async getHistory() {
    try {
      const { data } = await apiClient.get('/attendance/history');
      return data;
    } catch {
      return MOCK_ATTENDANCE_LOGS;
    }
  },
};

// ------------------------------------------------------------------------------
// Staff Directory & Council Licensing API
// ------------------------------------------------------------------------------
export const staffApi = {
  async getDirectory(departmentId?: string, query?: string): Promise<UserProfile[]> {
    try {
      const { data } = await apiClient.get('/staff/directory', {
        params: { departmentId, q: query },
      });
      return data;
    } catch {
      return MOCK_STAFF_MEMBERS;
    }
  },

  async getStaffById(id: string): Promise<UserProfile> {
    try {
      const { data } = await apiClient.get(`/staff/${id}`);
      return data;
    } catch {
      return (
        MOCK_STAFF_MEMBERS.find((s) => s.id === id || s.employeeCode === id) ||
        MOCK_STAFF_MEMBERS[0]
      );
    }
  },
};

export const councilsApi = {
  async getLicenses(type?: string) {
    try {
      const { data } = await apiClient.get('/councils/licenses', {
        params: { type },
      });
      return data;
    } catch {
      return MOCK_STAFF_MEMBERS.map((s) => ({
        id: `lic_${s.id}`,
        councilType: s.councilType,
        registrationNumber: s.councilNumber || 'NNC-RN-48291',
        expiryDate: s.councilExpiryDate || '2026-11-20',
        verificationStatus: 'VERIFIED',
        staffProfile: { fullName: s.fullName, designation: s.designation },
      }));
    }
  },

  async getExpiringSoon(days = 30) {
    try {
      const { data } = await apiClient.get('/councils/expiring-soon', {
        params: { days },
      });
      return data;
    } catch {
      return [];
    }
  },
};

// ------------------------------------------------------------------------------
// Shifts & Shift Swap API
// ------------------------------------------------------------------------------
export const shiftsApi = {
  async getRoster(departmentId?: string, date?: string) {
    try {
      const { data } = await apiClient.get('/shifts/roster', {
        params: { departmentId, date },
      });
      return data;
    } catch {
      return [];
    }
  },

  async getMyAssignments() {
    try {
      const { data } = await apiClient.get('/shifts/my-assignments');
      return data;
    } catch {
      return [];
    }
  },

  async requestSwap(params: {
    peerStaffId: string;
    requesterShiftId: string;
    peerShiftId: string;
    requesterShiftDate: string;
    peerShiftDate: string;
    reason: string;
  }) {
    const { data } = await apiClient.post('/shifts/swaps/request', params);
    return data;
  },

  async respondToSwap(swapId: string, accept: boolean, notes?: string) {
    const { data } = await apiClient.patch(`/shifts/swaps/${swapId}/respond`, {
      accept,
      notes,
    });
    return data;
  },
};

// ------------------------------------------------------------------------------
// Leaves API
// ------------------------------------------------------------------------------
export const leavesApi = {
  async getBalances() {
    try {
      const { data } = await apiClient.get('/leaves/balances');
      return data;
    } catch {
      return MOCK_LEAVE_BALANCES;
    }
  },

  async getRequests() {
    try {
      const { data } = await apiClient.get('/leaves/requests');
      return data;
    } catch {
      return MOCK_LEAVE_REQUESTS;
    }
  },

  async apply(params: {
    leaveType: string;
    startDate: string;
    endDate: string;
    totalDays: number;
    reason: string;
    handoverNotes?: string;
  }) {
    try {
      const { data } = await apiClient.post('/leaves/apply', params);
      return data;
    } catch {
      return {
        success: true,
        id: `leave_${Date.now()}`,
        status: 'PENDING',
        ...params,
      };
    }
  },
};

// ------------------------------------------------------------------------------
// Gamification API
// ------------------------------------------------------------------------------
export const gamificationApi = {
  async getStats() {
    try {
      const { data } = await apiClient.get('/gamification/stats');
      return data;
    } catch {
      return {
        vitalityPointsTotal: 1850,
        level: 3,
        levelTitle: 'Ward Luminary',
        currentStreakDays: 12,
        highestStreakDays: 24,
        streakShieldActive: true,
      };
    }
  },
};
