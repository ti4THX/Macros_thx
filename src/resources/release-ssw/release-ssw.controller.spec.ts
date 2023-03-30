import { Test, TestingModule } from '@nestjs/testing';
import { ReleaseSswController } from './release-ssw.controller';
import { ReleaseSswService } from './release-ssw.service';

describe('ReleaseSswController', () => {
  let controller: ReleaseSswController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReleaseSswController],
      providers: [ReleaseSswService],
    }).compile();

    controller = module.get<ReleaseSswController>(ReleaseSswController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
