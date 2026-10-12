import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CouncilType, Role, VerificationStatus } from '@prisma/client';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { CouncilsService } from './councils.service.js';

@Controller('api/v1/councils')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CouncilsController {
  constructor(private readonly councilsService: CouncilsService) {}

  @Get('licenses')
  async getAllLicenses(@Query('type') type?: CouncilType) {
    return this.councilsService.getAllLicenses(type);
  }

  @Get('expiring-soon')
  async getExpiringSoon(@Query('days') days?: string) {
    const parsedDays = days ? parseInt(days, 10) : 30;
    return this.councilsService.getExpiringSoonLicenses(parsedDays);
  }

  @Patch('verify/:id')
  @Roles(Role.ROLE_HR_ADMIN, Role.ROLE_SUPER_ADMIN)
  async verifyLicense(
    @Param('id') id: string,
    @Body('status') status: VerificationStatus,
  ) {
    return this.councilsService.verifyLicense(id, status);
  }
}
