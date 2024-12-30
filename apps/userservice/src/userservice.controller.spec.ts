import { Test, TestingModule } from '@nestjs/testing';
import { UserserviceController } from './user.controller';
import { UserserviceService } from './user.service';

describe('UserserviceController', () => {
  let userserviceController: UserserviceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserserviceController],
      providers: [UserserviceService],
    }).compile();

    userserviceController = app.get<UserserviceController>(UserserviceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(userserviceController.getHello()).toBe('Hello World!');
    });
  });
});
