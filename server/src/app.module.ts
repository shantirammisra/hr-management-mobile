import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AttendanceModule } from './attendance/attendance.module.js';
import { AuthModule } from './auth/auth.module.js';
import { CouncilsModule } from './councils/councils.module.js';
import { GamificationModule } from './gamification/gamification.module.js';
import { LeavesModule } from './leaves/leaves.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { ShiftsModule } from './shifts/shifts.module.js';
import { UsersModule } from './users/users.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    CouncilsModule,
    AttendanceModule,
    LeavesModule,
    ShiftsModule,
    GamificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
