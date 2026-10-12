import { Module } from '@nestjs/common';
import { CouncilsController } from './councils.controller.js';
import { CouncilsService } from './councils.service.js';

@Module({
  controllers: [CouncilsController],
  providers: [CouncilsService],
  exports: [CouncilsService],
})
export class CouncilsModule {}
