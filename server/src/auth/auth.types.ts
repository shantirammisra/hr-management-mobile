import { Role } from '@prisma/client';

export interface JwtPayload {
  sub: string;
  employeeCode: string;
  email: string;
  role: Role;
  departmentId?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface UserSummary {
  id: string;
  employeeCode: string;
  fullName: string;
  role: Role;
  departmentId?: string;
  departmentName?: string;
  designation?: string;
  avatarUrl?: string | null;
}

export interface LoginResponse extends AuthTokens {
  user: UserSummary;
}
