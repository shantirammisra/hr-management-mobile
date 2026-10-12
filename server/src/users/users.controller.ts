import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { UsersService } from './users.service.js';

@Controller('api/v1/staff')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('directory')
  async getDirectory(
    @Query('departmentId') departmentId?: string,
    @Query('q') query?: string,
  ) {
    return this.usersService.getDirectory(departmentId, query);
  }

  @Get(':id')
  async getStaffById(@Param('id') id: string) {
    return this.usersService.getStaffById(id);
  }
}
