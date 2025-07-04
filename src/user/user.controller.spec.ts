import { Test, TestingModule } from '@nestjs/testing';
import { JoinController } from './user.controller';

describe('UserController', () => {
  let controller: JoinController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JoinController],
    }).compile();

    controller = module.get<JoinController>(JoinController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
