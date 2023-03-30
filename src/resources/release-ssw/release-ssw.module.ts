import { Module } from '@nestjs/common';
import { ReleaseSswService } from './release-ssw.service';
import { ReleaseSswController } from './release-ssw.controller';

@Module({
  controllers: [ReleaseSswController],
  providers: [ReleaseSswService]
})
export class ReleaseSswModule {}
