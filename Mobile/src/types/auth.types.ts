export type UserRole = 'STAFF' | 'DEPT_HEAD' | 'HR_ADMIN' | 'SUPER_ADMIN';

export type MedicalCouncilType = 'NMC' | 'NNC' | 'NPC' | 'NONE';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  employeeCode: string;
  departmentId: string;
  departmentName: string;
  designation: string;
  councilType: MedicalCouncilType;
  councilNumber?: string;
  councilExpiryDate?: string;
  avatarUrl?: string;
  phone?: string;
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  user: UserProfile;
}

export interface AuthState {
  user: UserProfile | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isBiometricEnrolled: boolean;
  isDevBypassActive: boolean;

  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  loginWithBiometrics: () => Promise<boolean>;
  logout: () => Promise<void>;
  switchDevRole: (role: UserRole) => void;
  setBiometricEnrolled: (enabled: boolean) => Promise<void>;
  checkSession: () => Promise<void>;
}
