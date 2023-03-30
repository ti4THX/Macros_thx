import { Test, TestingModule } from '@nestjs/testing';
import { ReleaseSswService } from './release-ssw.service';

describe('ReleaseSswService', () => {
  let service: ReleaseSswService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReleaseSswService],
    }).compile();

    service = module.get<ReleaseSswService>(ReleaseSswService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
