import { Test, TestingModule } from '@nestjs/testing';
import { JoinService } from './user.service';

describe('UserService', () => {
  let service: JoinService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JoinService],
    }).compile();

    service = module.get<JoinService>(JoinService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
