import { ConflictException } from "@nestjs/common";
import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { CreatedUserEvent } from "src/users/events/impl/created-user.event";
import { UserRepository } from "../../../users/database/repositories/user.repository";
import { CreateUserCommand } from "../impl/create-user.command";
import * as bcrypt from 'bcrypt'

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand>{
    constructor(
        private readonly userRepository: UserRepository,
        private readonly eventBus: EventBus
    ) { }
    async execute(command: CreateUserCommand): Promise<string> {

        const { username, email, password } = command
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        command.password = hashedPassword

        try {
            const getUserByUsername = await this.userRepository.getByUsername(username)
            const getUserByEmail = await this.userRepository.getByEmail(email)

            if (getUserByUsername || getUserByEmail) {
                console.log('here')
                throw new ConflictException('Username or email already in use!')

            }

            const newUser = await this.userRepository.create(command)
            if (newUser) {

                this.eventBus.publish(new CreatedUserEvent(username, email))
                return 'User created sucessfully!'
            }

        } catch (e) {
            throw new ConflictException(e.message)
        }



    }
}