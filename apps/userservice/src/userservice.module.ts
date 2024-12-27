import { Module } from '@nestjs/common';
import { UserserviceController } from './userservice.controller';
import { UserserviceService } from './userservice.service';

@Module({
  imports: [],
  controllers: [UserserviceController],
  providers: [UserserviceService],
})
export class UserserviceModule {}
