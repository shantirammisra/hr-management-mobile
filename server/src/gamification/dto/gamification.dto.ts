import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AwardPointsDto {
  @IsNumber()
  points!: number;

  @IsString()
  @IsNotEmpty()
  reason!: string;

  @IsBoolean()
  @IsOptional()
  isNightShift?: boolean;
}
