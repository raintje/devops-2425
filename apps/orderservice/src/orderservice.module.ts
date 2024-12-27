import { Module } from '@nestjs/common';
import { OrderserviceController } from './orderservice.controller';
import { OrderserviceService } from './orderservice.service';

@Module({
  imports: [],
  controllers: [OrderserviceController],
  providers: [OrderserviceService],
})
export class OrderserviceModule {}
