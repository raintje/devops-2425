import { RmqService } from '@app/rmq';
import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { CreateUserRequest } from './dto/create-user.request';
import { GetUserRequest } from './dto/get-user.request';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly rmqService: RmqService
    ) {}

    @MessagePattern({ cmd: 'create_user' })
    createUser(@Payload() data: CreateUserRequest, @Ctx() context: RmqContext) {
        const { email, password } = data;
        try {
            const msg = this.userService.createUser(email, password);
            this.rmqService.ack(context);
            return msg;
        } catch (e: unknown) {
            if (e instanceof HttpException) {
                return { status: e.getStatus(), message: e.message };
            } else {
                return { status: HttpStatus.INTERNAL_SERVER_ERROR, message: e };
            }
        }
    }

    @MessagePattern({ cmd: 'get_user' })
    async getUser(@Payload() data: GetUserRequest, @Ctx() context: RmqContext) {
        const { email, password } = data;

        try {
            const user = await this.userService.getUser(email, password).then((u) => u);
            this.rmqService.ack(context);
            return user;
        } catch (e: unknown) {
            if (e instanceof HttpException) {
                return { status: e.getStatus(), message: e.message };
            } else {
                return { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Internal server error' };
            }
        }
    }
}
