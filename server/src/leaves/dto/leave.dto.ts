import { LeaveStatus, LeaveType } from '@prisma/client';
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ApplyLeaveDto {
  @IsEnum(LeaveType)
  leaveType!: LeaveType;

  @IsDateString()
  startDate!: string;

  @IsDateString()
  endDate!: string;

  @IsNumber()
  totalDays!: number;

  @IsString()
  @IsNotEmpty()
  reason!: string;

  @IsString()
  @IsOptional()
  handoverNotes?: string;
}

export class ReviewLeaveDto {
  @IsEnum(LeaveStatus)
  status!: LeaveStatus;

  @IsString()
  @IsOptional()
  reviewerNotes?: string;
}
