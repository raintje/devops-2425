import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';
import { UserRepository } from './db/user.repository';
import { User, UserRoles } from './db/user.schema';

@Injectable()
export class UserService {
    constructor(private readonly userRepo: UserRepository) {}

    private readonly salt: string = genSalt();

    private async checkIfEmailIsTaken(email: string): Promise<boolean> {
        return (await this.userRepo.exists({ email })) !== null;
    }

    async getUser(email: string, password: string): Promise<User> {
        const u = await this.userRepo.findOne({ email }, true);

        const passwordMatches = await compare(password, u.password);

        if (!passwordMatches) {
            throw new UnauthorizedException(this.getUser.name, `Invalid password for user with email: ${email}`);
        }

        return u;
    }

    async createUser(email: string, password: string): Promise<{ status: HttpStatus; message: string }> {
        if (await this.checkIfEmailIsTaken(email)) {
            return { status: HttpStatus.CONFLICT, message: `User with email ${email} already exists.` };
        } else {
            const u: User = await this.userRepo.create({
                email,
                password: await hash(password, await this.salt),
                roles: [UserRoles.USER],
            });

            return { status: HttpStatus.CREATED, message: `User with email ${u.email} successfully created.` };
        }
    }
}
