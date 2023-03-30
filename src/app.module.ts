import { Module } from '@nestjs/common';
import { ReleaseSswModule } from './resources/release-ssw/release-ssw.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot(), ReleaseSswModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
