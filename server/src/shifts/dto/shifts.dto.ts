import { SwapStatus } from '@prisma/client';
import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RequestSwapDto {
  @IsString()
  @IsNotEmpty()
  peerStaffId!: string;

  @IsString()
  @IsNotEmpty()
  requesterShiftId!: string;

  @IsString()
  @IsNotEmpty()
  peerShiftId!: string;

  @IsDateString()
  requesterShiftDate!: string;

  @IsDateString()
  peerShiftDate!: string;

  @IsString()
  @IsNotEmpty()
  reason!: string;
}

export class RespondSwapDto {
  @IsBoolean()
  accept!: boolean;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class ReviewSwapDto {
  @IsEnum(SwapStatus)
  status!: SwapStatus;

  @IsString()
  @IsOptional()
  supervisorNotes?: string;
}
