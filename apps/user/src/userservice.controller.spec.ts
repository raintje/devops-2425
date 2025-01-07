import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './db/user.repository';

describe('UserserviceController', () => {
  let userController: UserController;
  let userRepo: UserRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, UserRepository],
    }).compile();

    userController = app.get<UserController>(UserController);
    userRepo = app.get<UserRepository>(UserRepository);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(userController).not.toBe(undefined);
    });
  });
});
