import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum PunchAction {
  PUNCH_IN = 'PUNCH_IN',
  PUNCH_OUT = 'PUNCH_OUT',
}

export class RecordPunchDto {
  @IsEnum(PunchAction)
  action!: PunchAction;

  @IsNumber()
  latitude!: number;

  @IsNumber()
  longitude!: number;

  @IsBoolean()
  @IsOptional()
  biometricVerified?: boolean;

  @IsString()
  @IsOptional()
  notes?: string;
}
