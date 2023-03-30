import { Controller } from '@nestjs/common';
import { ReleaseSswService } from './release-ssw.service';
import { CreateReleaseSswDto } from './dto/create-release-ssw.dto';
import { Cron } from '@nestjs/schedule';
import { Body, Post } from '@nestjs/common/decorators';

@Controller()
export class ReleaseSswController {
  constructor(private readonly releaseSswService: ReleaseSswService) { }

  @Cron('*/10 * * * * *')
  async get() {
   
  }


  @Post('/create-release-ssw')
  async createReleaseSSW(@Body() data: any) {

    const { releases } = data;

    if (!releases || releases.length === 0) return { error: true, message: "Cannot find releases to create in SSW." };

    return await this.releaseSswService.createRelease(data)
  }

}
