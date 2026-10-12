import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import type { JwtPayload } from '../auth/auth.types.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { ApplyLeaveDto, ReviewLeaveDto } from './dto/leave.dto.js';
import { LeavesService } from './leaves.service.js';

@Controller('api/v1/leaves')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LeavesController {
  constructor(private readonly leavesService: LeavesService) {}

  @Get('balances')
  async getBalances(@CurrentUser() user: JwtPayload) {
    return this.leavesService.getBalances(user.sub);
  }

  @Get('requests')
  async getRequests(@CurrentUser() user: JwtPayload) {
    return this.leavesService.getRequests(user.sub, user.role);
  }

  @Post('apply')
  @HttpCode(HttpStatus.CREATED)
  async apply(@CurrentUser() user: JwtPayload, @Body() dto: ApplyLeaveDto) {
    return this.leavesService.apply(user.sub, dto);
  }

  @Patch(':id/status')
  @Roles(Role.ROLE_DEPT_HEAD, Role.ROLE_HR_ADMIN, Role.ROLE_SUPER_ADMIN)
  async review(
    @Param('id') id: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: ReviewLeaveDto,
  ) {
    return this.leavesService.review(id, user.sub, dto);
  }
}
