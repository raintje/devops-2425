import { Injectable } from '@nestjs/common';

@Injectable()
export class BillingserviceService {
  getHello(): string {
    return 'Hello World!';
  }
}
