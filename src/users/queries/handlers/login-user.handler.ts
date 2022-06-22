import { EventBus, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { UserInterface } from "../../../users/database/entities/user.entity";
import { UserRepository } from "../../../users/database/repositories/user.repository";
import { LoginUserQuery } from "../impl/login-user.query";
import * as bcrypt from 'bcrypt'
import { ConflictException, NotFoundException } from "@nestjs/common";
import { JwtPayloadInterface } from "../../../users/interfaces/jwtPayload.interface";
import { JwtService } from "@nestjs/jwt";
import { UserLoggedInEvent } from "src/users/events/impl/user-logged-in.event";

@QueryHandler(LoginUserQuery)
export class LogInUserHandler implements IQueryHandler<LoginUserQuery>{
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
        private readonly eventBus: EventBus
    ) { }
    async execute(query: LoginUserQuery): Promise<{ accessToken: string }> {
        const { usernameOrEmail, password } = query

        if (!usernameOrEmail) {
            throw new ConflictException('Username or email must be provided')
        }

        //check if found by username:
        const userFound = await this.userRepository.getByUsername(usernameOrEmail)
        if (userFound && await bcrypt.compare(password, userFound.password)) {
            const payload: JwtPayloadInterface = { usernameOrEmail }
            const accessToken: string = await this.jwtService.sign(payload)
            this.eventBus.publish(new UserLoggedInEvent(usernameOrEmail))
            return { accessToken }
        } else {
            //check if found by email:
            const userFound = await this.userRepository.getByEmail(usernameOrEmail)
            if (userFound) {
                const payload: JwtPayloadInterface = { usernameOrEmail }
                const accessToken: string = await this.jwtService.sign(payload)
                this.eventBus.publish(new UserLoggedInEvent(usernameOrEmail))
                return { accessToken }
            } else {
                throw new NotFoundException('Check your credentials!')
            }
        }

    }
}