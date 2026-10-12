import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import type { JwtPayload } from '../auth/auth.types.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { AwardPointsDto } from './dto/gamification.dto.js';
import { GamificationService } from './gamification.service.js';

@Controller('api/v1/gamification')
@UseGuards(JwtAuthGuard)
export class GamificationController {
  constructor(private readonly gamificationService: GamificationService) {}

  @Get('stats')
  async getStats(@CurrentUser() user: JwtPayload) {
    return this.gamificationService.getProfile(user.sub);
  }

  @Post('award')
  async awardPoints(
    @CurrentUser() user: JwtPayload,
    @Body() dto: AwardPointsDto,
  ) {
    return this.gamificationService.awardPoints(user.sub, dto);
  }
}
