import { Module } from '@nestjs/common';
import { BillingserviceController } from './billingservice.controller';
import { BillingserviceService } from './billingservice.service';

@Module({
  imports: [],
  controllers: [BillingserviceController],
  providers: [BillingserviceService],
})
export class BillingserviceModule {}
