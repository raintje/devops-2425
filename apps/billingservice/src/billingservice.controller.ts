import { Controller, Get } from '@nestjs/common';
import { BillingserviceService } from './billingservice.service';

@Controller()
export class BillingserviceController {
  constructor(private readonly billingserviceService: BillingserviceService) {}

  @Get()
  getHello(): string {
    return this.billingserviceService.getHello();
  }
}
