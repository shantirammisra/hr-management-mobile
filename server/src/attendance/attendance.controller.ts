import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import type { JwtPayload } from '../auth/auth.types.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { AttendanceService } from './attendance.service.js';
import { RecordPunchDto } from './dto/attendance.dto.js';

@Controller('api/v1/attendance')
@UseGuards(JwtAuthGuard)
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('punch')
  @HttpCode(HttpStatus.OK)
  async recordPunch(
    @CurrentUser() user: JwtPayload,
    @Body() dto: RecordPunchDto,
  ) {
    return this.attendanceService.recordPunch(user.sub, dto);
  }

  @Get('monthly')
  async getMonthlyCalendar(
    @CurrentUser() user: JwtPayload,
    @Query('month') month?: string,
  ) {
    return this.attendanceService.getMonthlyCalendar(user.sub, month);
  }

  @Get('history')
  async getPunchHistory(@CurrentUser() user: JwtPayload) {
    return this.attendanceService.getPunchHistory(user.sub);
  }
}
