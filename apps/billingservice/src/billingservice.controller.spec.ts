import { Test, TestingModule } from '@nestjs/testing';
import { BillingserviceController } from './billingservice.controller';
import { BillingserviceService } from './billingservice.service';

describe('BillingserviceController', () => {
  let billingserviceController: BillingserviceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BillingserviceController],
      providers: [BillingserviceService],
    }).compile();

    billingserviceController = app.get<BillingserviceController>(BillingserviceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(billingserviceController.getHello()).toBe('Hello World!');
    });
  });
});
