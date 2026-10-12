import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import type { JwtPayload } from '../auth/auth.types.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { RequestSwapDto, RespondSwapDto, ReviewSwapDto } from './dto/shifts.dto.js';
import { ShiftsService } from './shifts.service.js';

@Controller('api/v1/shifts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ShiftsController {
  constructor(private readonly shiftsService: ShiftsService) {}

  @Get('roster')
  async getRoster(
    @Query('departmentId') departmentId?: string,
    @Query('date') date?: string,
  ) {
    return this.shiftsService.getRoster(departmentId, date);
  }

  @Get('my-assignments')
  async getMyAssignments(@CurrentUser() user: JwtPayload) {
    return this.shiftsService.getMyAssignments(user.sub);
  }

  @Post('swaps/request')
  @HttpCode(HttpStatus.CREATED)
  async requestSwap(
    @CurrentUser() user: JwtPayload,
    @Body() dto: RequestSwapDto,
  ) {
    return this.shiftsService.requestSwap(user.sub, dto);
  }

  @Patch('swaps/:id/respond')
  async respondToSwap(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
    @Body() dto: RespondSwapDto,
  ) {
    return this.shiftsService.respondToSwap(user.sub, id, dto);
  }

  @Patch('swaps/:id/review')
  @Roles(Role.ROLE_DEPT_HEAD, Role.ROLE_HR_ADMIN, Role.ROLE_SUPER_ADMIN)
  async reviewSwap(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
    @Body() dto: ReviewSwapDto,
  ) {
    return this.shiftsService.reviewSwap(user.sub, id, dto);
  }
}
